import nodeAdapter from '@sveltejs/adapter-node';
import vercelAdapter from '@sveltejs/adapter-vercel';
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { sentrySvelteKit } from '@sentry/sveltekit/vite';
import tailwindcss from '@tailwindcss/vite';
import { svelteOptions } from './svelte.options.ts';

const selectedAdapter = process.env.VERCEL ? vercelAdapter({ split: false }) : nodeAdapter();

export default defineConfig({
  define: {
    __SENTRY_DEBUG__: false,
    __SENTRY_TRACING__: false,
  },
  build: {
    sourcemap: process.env.VERCEL ? false : 'hidden',
    assetsInlineLimit: (filePath) => (filePath.includes('flag-icons/flags/') ? false : undefined),
  },
  plugins: [
    ...(process.env.SENTRY_AUTH_TOKEN
      ? [
          sentrySvelteKit({
            sourcemaps: { filesToDeleteAfterUpload: [] },
            org: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            authToken: process.env.SENTRY_AUTH_TOKEN,
          }),
        ]
      : []),
    tailwindcss(),
    sveltekit({
      ...svelteOptions,
      adapter: selectedAdapter,
      version: { pollInterval: 300_000 },
      paths: { relative: false, origin: process.env.ORIGIN || undefined },
      csrf: {
        trustedOrigins: ['http://localhost:8090', 'http://localhost:8000', 'http://127.0.0.1:8090'],
      },
      csp: {
        mode: 'auto',
        directives: {
          'script-src': [
            'self',
            'sha256-U29gkK6BsLUWwrd3ascTYuVkif/7eGypC6sqOZIQY/o=',
            'sha256-ysgedogjfCgJ5Jxx8bF36PqmHT75RoNd5XFleV2cqiY=',
            'https://www.googletagmanager.com',
          ],
          'base-uri': ['self'],
          'object-src': ['none'],
          'frame-ancestors': ['self'],
          'img-src': [
            'self',
            'data:',
            'https://logo.freehire.me',
            'https://api.producthunt.com',
            'https://avatars.githubusercontent.com',
            'https://www.googletagmanager.com',
          ],
        },
      },
    }),
  ],
  server: {
    port: 8000,
    strictPort: false,
    host: true,
    proxy: process.env.VITE_API_URL
      ? {
          '/api': {
            target: process.env.VITE_API_URL,
            changeOrigin: true,
            ws: true,
          },
          '/health': {
            target: process.env.VITE_API_URL,
            changeOrigin: true,
          },
        }
      : undefined,
  },
});
