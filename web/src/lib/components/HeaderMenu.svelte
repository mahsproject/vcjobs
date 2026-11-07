<script lang="ts">
  import { page } from '$app/state';
  import { afterNavigate } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { toPath } from '#lib/pathname.js';
  import { Menu, X, Sun, Moon, SquarePlus, ShieldCheck, LogOut, LogIn } from '@lucide/svelte';
  import { isAuthenticated, currentUser, logout as doLogout } from '#lib/auth.svelte.js';
  import { promptSignIn } from '#lib/signin.js';
  import { themeStore } from '#lib/theme.svelte.js';
  import { lockScroll, unlockScroll } from '#lib/ui/index.js';
  import { openedOverlay, closedOverlay } from '#lib/headerOverlay.js';
  import { cn } from '#lib/ui/index.js';
  import { menuNav } from '#lib/actions/menuNav.js';
  import GithubStars from './GithubStars.svelte';
  import NotificationBell from './NotificationBell.svelte';
  import HeaderProfileMenu from './HeaderProfileMenu.svelte';
  import WorkspaceSwitcher from './WorkspaceSwitcher.svelte';
  import { ensureAccountSetupLoaded, setupOutstanding } from '#lib/accountSetup.svelte.js';
  import { NAV } from '#lib/siteNav.js';

  let open = $state(false);
  let root = $state<HTMLElement | null>(null);

  const path = $derived(page.url.pathname);
  const isActive = (href: string) => path === href || path.startsWith(`${href}/`);

  const rowBase =
    'flex items-center gap-2 rounded-md px-4 min-h-11 text-base transition-colors hover:bg-accent hover:text-accent-foreground sm:min-h-0 sm:rounded-none sm:px-3 sm:py-2 sm:text-sm';
  const linkClass = (href: string) =>
    cn(rowBase, isActive(href) ? 'font-medium text-foreground' : 'text-muted-foreground');
  const iconButton =
    'size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

  const isDark = $derived(themeStore.isDark);
  const isModerator = $derived(currentUser()?.role === 'moderator');

  const primaryLinks = [NAV.jobs, NAV.companies];

  const AboutIcon = NAV.about.icon;
  const OpenIcon = NAV.open.icon;

  const navLinks = [
    NAV.collections,
    NAV.howItWorks,
    NAV.analytics,
    NAV.trends,
  ];

  $effect(() => {
    ensureAccountSetupLoaded();
  });

  $effect(() => {
    if (!open) return;
    if (window.matchMedia('(min-width: 640px)').matches) return;
    lockScroll();
    return () => unlockScroll();
  });

  function closeSelf() {
    open = false;
  }

  $effect(() => {
    if (!open) return;
    openedOverlay(closeSelf);
    return () => closedOverlay(closeSelf);
  });

  afterNavigate(({ shallow }) => {
    if (!shallow) open = false;
  });

  function onWindowClick(e: MouseEvent) {
    if (open && root && !root.contains(e.target as Node)) open = false;
  }

  function signIn() {
    open = false;
    promptSignIn();
  }

  function logout() {
    open = false;
    void doLogout();
  }
</script>

<svelte:window
  onclick={onWindowClick}
  onkeydown={(e) => e.key === 'Escape' && (open = false)}
/>

{#snippet themeButton()}
  <button
    type="button"
    role="menuitem"
    onclick={() => themeStore.toggle()}
    class={cn(rowBase, 'w-full text-left text-muted-foreground')}
  >
    {#if isDark}
      <Moon class="size-4 shrink-0" /> Light theme
    {:else}
      <Sun class="size-4 shrink-0" /> Dark theme
    {/if}
  </button>
{/snippet}

{#snippet authButton()}
  {#if isAuthenticated()}
    <button
      type="button"
      role="menuitem"
      onclick={logout}
      class={cn(rowBase, 'w-full text-left text-muted-foreground')}
    >
      <LogOut class="size-4 shrink-0" /> Log out
    </button>
  {:else}
    <button
      type="button"
      role="menuitem"
      onclick={signIn}
      class={cn(rowBase, 'w-full text-left font-medium text-foreground')}
    >
      <LogIn class="size-4 shrink-0" /> Sign in
    </button>
  {/if}
{/snippet}

<div class="relative flex items-center gap-1" bind:this={root}>
  <GithubStars class="hidden sm:inline-flex" />

  <NotificationBell />

  <HeaderProfileMenu />

  <button
    type="button"
    aria-label={setupOutstanding() > 0 ? 'Menu — account setup unfinished' : 'Menu'}
    aria-haspopup="menu"
    aria-expanded={open}
    onclick={(e) => {
      e.stopPropagation();
      open = !open;
    }}
    class={cn('relative inline-flex', iconButton)}
  >
    {#if open}
      <X class="size-5" />
    {:else}
      <Menu class="size-5" />
    {/if}
    {#if isAuthenticated() && !open && setupOutstanding() > 0}
      <span
        class="absolute right-1.5 top-1.5 size-2 rounded-full bg-brand ring-2 ring-background"
        aria-hidden="true"
      ></span>
    {/if}
  </button>

  {#if open}
    <div
      role="menu"
      aria-label="Menu"
      {@attach menuNav({ onclose: closeSelf })}
      class="z-50 bg-background
             max-sm:fixed max-sm:inset-0 max-sm:flex max-sm:flex-col
             sm:absolute sm:right-0 sm:top-full sm:mt-2 sm:max-h-[80vh] sm:w-64 sm:overflow-y-auto sm:rounded-md sm:border sm:border-border sm:py-1 sm:shadow-lg"
    >
      <div class="flex h-14 shrink-0 items-center justify-between border-b border-border px-4 sm:hidden">
        <span class="flex items-center gap-2 text-sm font-bold tracking-tight">
          <img
            src="/logo-on-light.png"
            alt="VC Jobs"
            class="h-6 w-auto object-contain dark:hidden"
          />
          <img
            src="/logo-on-dark.png"
            alt="VC Jobs"
            class="hidden h-6 w-auto object-contain dark:block"
          />
        </span>
        <button
          type="button"
          role="menuitem"
          aria-label="Close menu"
          onclick={() => (open = false)}
          class="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <X class="size-5" />
        </button>
      </div>

      <div class="max-sm:flex-1 max-sm:overflow-y-auto max-sm:overscroll-contain max-sm:px-2 max-sm:pb-3">
        {#each primaryLinks as link (link.href)}
          {@const Icon = link.icon}
          <a href={resolve(toPath(link.href))} role="menuitem" onclick={() => (open = false)} class={linkClass(link.href)}>
            <Icon class="size-4 shrink-0" />
            {link.label}
          </a>
        {/each}
        <div class="my-1 h-px bg-border"></div>

        <div class="sm:hidden">
          {#if isAuthenticated()}
            <WorkspaceSwitcher rowClass={rowBase} onselect={() => (open = false)} />
            <div class="my-1 h-px bg-border"></div>
            <a href={resolve('/submit')} role="menuitem" onclick={() => (open = false)} class={linkClass('/submit')}>
              <SquarePlus class="size-4 shrink-0" />
              Submit a job
            </a>
            {#if isModerator}
              <a
                href={resolve('/moderation')}
                role="menuitem"
                onclick={() => (open = false)}
                class={linkClass('/moderation')}
              >
                <ShieldCheck class="size-4 shrink-0" />
                Moderation
              </a>
            {/if}
            <div class="my-1 h-px bg-border"></div>
          {/if}
        </div>

        {#each navLinks as link (link.href)}
          {@const Icon = link.icon}
          <a href={resolve(toPath(link.href))} role="menuitem" onclick={() => (open = false)} class={linkClass(link.href)}>
            <Icon class="size-4 shrink-0" />
            {link.label}
          </a>
        {/each}

        <a
          href={resolve(NAV.about.href)}
          role="menuitem"
          onclick={() => (open = false)}
          class={linkClass(NAV.about.href)}
        >
          <AboutIcon class="size-4 shrink-0" />
          About
        </a>
        <a
          href={resolve(NAV.open.href)}
          role="menuitem"
          onclick={() => (open = false)}
          class={linkClass(NAV.open.href)}
        >
          <OpenIcon class="size-4 shrink-0" />
          Open Stats
        </a>

        <div class="hidden sm:block">
          <div class="my-1 h-px bg-border"></div>
          {@render themeButton()}
        </div>
      </div>

      <div class="shrink-0 border-t border-border p-2 sm:hidden">
        <GithubStars variant="row" class={cn(rowBase, 'text-muted-foreground')} />
        {@render themeButton()}
        {@render authButton()}
      </div>
    </div>
  {/if}
</div>
