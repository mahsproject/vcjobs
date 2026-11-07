import { API_INTERNAL_URL, OTEL_EXPORTER_OTLP_LOGS_ENDPOINT, OTEL_EXPORTER_OTLP_ENDPOINT } from '$app/env/private';
import { PUBLIC_OTEL_ENVIRONMENT, PUBLIC_OTEL_SERVICE_VERSION, PUBLIC_SENTRY_DSN, PUBLIC_SENTRY_ENVIRONMENT } from '$app/env/public';
import { createErrorTelemetry } from '#lib/errorTelemetry.js';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle, HandleServerError } from '@sveltejs/kit/hooks';
import * as Sentry from '@sentry/sveltekit';
import { hasSessionCookie } from '#lib/authCookie.js';
import { cachePolicy, variesOnCookie } from '#lib/httpCache.js';
import { isTranslatedLocale, LOCALE_COOKIE } from '#lib/locale.js';
import { isTransientNoise } from '#lib/sentryNoise.js';
import { CAPTURE_MAX_AGE_SECONDS, REF_COOKIE, captureRef, capturePromo } from '#lib/referral.js';
import { handleVcJobsApi } from '#lib/server/vcJobsEngine.js';

const otelEndpoint = OTEL_EXPORTER_OTLP_LOGS_ENDPOINT || (OTEL_EXPORTER_OTLP_ENDPOINT ? `${OTEL_EXPORTER_OTLP_ENDPOINT.replace(/\/$/, '')}/v1/logs` : undefined);
const telemetry = createErrorTelemetry({ endpoint: otelEndpoint, service: 'vcjobs-web-ssr', environment: PUBLIC_OTEL_ENVIRONMENT, version: PUBLIC_OTEL_SERVICE_VERSION, logToConsole: true });
if (telemetry) process.once('sveltekit:shutdown', () => { void telemetry.shutdown(); });

const vcApiFallback: Handle = async ({ event, resolve }) => {
  const path = event.url.pathname;
  if (path.startsWith('/api/v1/') || path.startsWith('/api/v2/') || path === '/health') {
    if (API_INTERNAL_URL) {
      try {
        const upstream = await fetch(`${API_INTERNAL_URL}${path}${event.url.search}`, {
          method: event.request.method,
          headers: event.request.headers,
          body: event.request.method !== 'GET' && event.request.method !== 'HEAD'
            ? await event.request.arrayBuffer()
            : undefined,
          signal: AbortSignal.timeout(4000),
        });
        if (upstream.ok || upstream.status < 500) {
          return upstream;
        }
      } catch {
        // Fall back to the built-in VC Jobs engine (Google Sheets + live VC ATS boards)
      }
    }
    const handled = await handleVcJobsApi(event.url, event.request.method, event.request);
    if (handled) return handled;
  }
  return resolve(event);
};

const locale: Handle = async ({ event, resolve }) => {
  const onAccountSection = event.url.pathname === '/my' || event.url.pathname.startsWith('/my/');
  const cookieLocale = event.cookies.get(LOCALE_COOKIE);
  event.locals.locale =
    onAccountSection && isTranslatedLocale(cookieLocale) ? cookieLocale : 'en';
  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', event.locals.locale),
  });
};

if (!otelEndpoint && PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: PUBLIC_SENTRY_DSN,
    environment: PUBLIC_SENTRY_ENVIRONMENT || 'development',
    tracesSampleRate: 0,
    dataCollection: {
      userInfo: false,
      cookies: false,
      httpHeaders: false,
      urlQueryParams: false,
      stackFrameVariables: false,
    },
    beforeSend: (event, hint) => (isTransientNoise(hint?.originalException) ? null : event),
  });
}

const cacheControl: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);
  if (event.request.method !== 'GET' && event.request.method !== 'HEAD') return response;
  if (response.headers.has('cache-control')) return response;
  if (!response.headers.get('content-type')?.includes('text/html')) return response;

  const authenticated = hasSessionCookie(event.request.headers.get('cookie'));
  response.headers.set(
    'cache-control',
    cachePolicy({
      pathname: event.url.pathname,
      authenticated,
      status: response.status,
    }),
  );
  if (variesOnCookie(authenticated)) response.headers.append('vary', 'Cookie');
  return response;
};

const preloadPolicy: Handle = async ({ event, resolve }) =>
  resolve(event, {
    preload: ({ type, path }) => type === 'css' || path.includes('immutable/entry/'),
  });

const attribution: Handle = async ({ event, resolve }) => {
  const captures = [
    captureRef(event.url.searchParams.get('ref'), event.cookies.get(REF_COOKIE)),
    capturePromo(event.url.searchParams.get('promo')),
  ].filter((capture) => capture !== null);

  const response = await resolve(event);
  if (captures.length === 0) return response;

  for (const capture of captures) {
    response.headers.append(
      'set-cookie',
      event.cookies.serialize(capture.name, capture.value, {
        path: '/',
        maxAge: CAPTURE_MAX_AGE_SECONDS,
        sameSite: 'lax',
        httpOnly: capture.name === REF_COOKIE,
        secure: event.url.protocol === 'https:',
      }),
    );
  }
  response.headers.set('cache-control', 'no-store');
  return response;
};

const PERMISSIONS_POLICY = 'camera=(), microphone=(), geolocation=(), payment=(), usb=()';

const securityHeaders: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);
  response.headers.set('x-content-type-options', 'nosniff');
  response.headers.set('x-frame-options', 'DENY');
  response.headers.set('referrer-policy', 'strict-origin-when-cross-origin');
  response.headers.set('cross-origin-opener-policy', 'same-origin-allow-popups');
  if (response.headers.get('content-type')?.includes('text/html')) {
    response.headers.set('permissions-policy', PERMISSIONS_POLICY);
  }
  return response;
};

export const handle = sequence(
  vcApiFallback,
  ...(otelEndpoint ? [] : [Sentry.sentryHandle()]),
  securityHeaders,
  preloadPolicy,
  locale,
  cacheControl,
  attribution,
);

const reportError: HandleServerError = (input) => {
  if (input.kind !== 'unknown' && input.error.status >= 400 && input.error.status < 500) return;
  if (otelEndpoint) { telemetry?.capture(input.error); return; }
  console.error((input.error as Error | undefined)?.stack ?? input.error);
};
export const handleError: HandleServerError = otelEndpoint ? reportError : Sentry.handleErrorWithSentry<HandleServerError>(reportError);
