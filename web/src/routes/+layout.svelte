<script lang="ts">
  import { navigating, page, updated } from '$app/state';
  import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
  import { gotoPath } from '#lib/gotoPath.js';
  import { resolve } from '$app/paths';
  import { onMount, untrack } from 'svelte';
  import { initTheme } from '#lib/theme.svelte.js';
  import { currentUser, isAuthenticated } from '#lib/auth.svelte.js';
  import { confirmTailorDialog, settleConfirmTailorDialog } from '#lib/confirmTailorDialog.svelte.js';
  import { onboardingGate, onboardingUrl } from '#lib/onboardingGate.svelte.js';
  import { isAccountArea, isFullBleedRoute } from '#lib/shellLayout.js';
  import { safeRedirect } from '#lib/safeRedirect.js';
  import { resetUserStores } from '#lib/userResource.svelte.js';
  import { messagingDock } from '#lib/messagingDock.svelte.js';
  import { dockReserveClass } from '#lib/messagingDock.js';
  import { ownsMobileStickyCta } from '#lib/supportToast.js';
  import {
    capturePageview,
    syncReplayForRoute,
    identifyUser,
    resetIdentity,
    trackSignupIfNew,
  } from '#lib/analytics.js';
  import TopBar from '#lib/components/TopBar.svelte';
  import EmailVerificationBanner from '#lib/components/EmailVerificationBanner.svelte';
  import Footer from '#lib/components/Footer.svelte';
  import CookieConsent from '#lib/components/CookieConsent.svelte';
  import CvRefreshDialog from '#lib/components/CvRefreshDialog.svelte';
  import SkipLink from '#lib/components/SkipLink.svelte';
  import Announcer from '#lib/components/Announcer.svelte';
  import '../app.css';
  import 'flag-icons/css/flag-icons.min.css';

  let { children } = $props();

  let confirmTailorModule = $state<Promise<typeof import('#lib/components/ConfirmTailorDialog.svelte')> | null>(
    null,
  );
  $effect(() => {
    if (!confirmTailorDialog.open || confirmTailorModule) return;
    const load = import('#lib/components/ConfirmTailorDialog.svelte');
    confirmTailorModule = load;
    load.catch(() => {
      confirmTailorModule = null;
      settleConfirmTailorDialog(false);
    });
  });

  let messagingDockModule = $state<Promise<typeof import('#lib/components/MessagingDock.svelte')> | null>(null);
  $effect(() => {
    if (isAuthenticated()) void messagingDock.ensureLoaded();
  });
  $effect(() => {
    if (messagingDock.active && !messagingDockModule) messagingDockModule = import('#lib/components/MessagingDock.svelte');
  });
  const dockReserve = $derived(
    isFullBleedRoute(page.url.pathname)
      ? ''
      : dockReserveClass(messagingDock.shownOn(page.url.pathname), ownsMobileStickyCta(page.url.pathname), messagingDock.windows),
  );

  const isAccountRoute = $derived(isAccountArea(page.url.pathname));
  const hideFooter = $derived(
    isFullBleedRoute(page.url.pathname) ||
      page.url.pathname === '/onboarding' ||
      page.url.pathname === '/signin',
  );
  const compactFooter = $derived(isAccountRoute && !hideFooter);

  const needsOnboarding = $derived(currentUser()?.onboarding_completed_at == null);
  $effect(() => {
    const path = page.url.pathname;
    if (isAuthenticated() && needsOnboarding && !onboardingGate.dismissed && path !== '/onboarding' && path !== '/signin') {
      // eslint-disable-next-line svelte/no-navigation-without-resolve -- onboardingUrl() wraps resolve('/onboarding')
      void goto(onboardingUrl(page.url.pathname + page.url.search));
    }
  });

  $effect(() => {
    if (page.url.pathname !== '/onboarding') return;
    untrack(() => {
      if (isAuthenticated() && currentUser()?.onboarding_completed_at != null) {
        void gotoPath(safeRedirect(page.url.searchParams.get('returnTo')) ?? resolve('/'));
      }
    });
  });

  onMount(() => {
    initTheme();
  });

  $effect(() => {
    document.documentElement.lang = page.data.locale;
  });

  $effect(() => {
    if (!isAuthenticated()) {
      resetUserStores();
      onboardingGate.reset();
    }
  });

  beforeNavigate(({ willUnload, to, shallow }) => {
    if (shallow) return;
    if (updated.current && !willUnload && to?.url) location.href = to.url.href;
  });

  beforeNavigate(({ shallow }) => {
    if (shallow) return;
    if (confirmTailorDialog.open) settleConfirmTailorDialog(false);
  });

  afterNavigate(({ shallow }) => {
    if (shallow) return;
    capturePageview();
    syncReplayForRoute(page.url.pathname);
  });

  let lastIdentified: number | null = null;
  $effect(() => {
    const id = page.data.user?.id ?? null;
    if (id === lastIdentified) return;
    lastIdentified = id;
    if (page.data.user) {
      identifyUser(page.data.user);
      trackSignupIfNew(page.data.user);
    } else resetIdentity();
  });
</script>

{#if navigating.to}
  <div
    class="fixed inset-x-0 top-0 z-50 h-0.5 overflow-hidden bg-brand/20"
    role="progressbar"
    aria-label="Loading"
    aria-busy="true"
  >
    <div class="nav-progress-bar h-full w-2/5 bg-brand"></div>
  </div>
{/if}

<SkipLink target="main-content" />

<Announcer />

<div class="flex min-h-svh flex-col {dockReserve}">
  <TopBar />

  <EmailVerificationBanner />

  <main id="main-content" tabindex="-1" class="flex-1 focus:outline-none">
    {@render children()}
  </main>

  {#if !hideFooter}
    <Footer compact={compactFooter} />
  {/if}
</div>

<CookieConsent />

<CvRefreshDialog />

{#if messagingDockModule && messagingDock.active}
  {#await messagingDockModule then { default: MessagingDock }}
    <MessagingDock />
  {:catch}
    <!-- Left out for this page load -->
  {/await}
{/if}

{#if confirmTailorModule}
  {#await confirmTailorModule then { default: ConfirmTailorDialog }}
    <ConfirmTailorDialog />
  {:catch}
    <!-- Handled -->
  {/await}
{/if}

<style>
  .nav-progress-bar {
    animation: nav-progress 1.1s ease-in-out infinite;
  }

  @keyframes nav-progress {
    0% {
      transform: translateX(-110%);
    }
    100% {
      transform: translateX(320%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .nav-progress-bar {
      animation: none;
      width: 100%;
    }
  }
</style>
