<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { resolve } from '$app/paths';
  import { MessageCircle, Plus, Sun, Moon, Menu, X } from '@lucide/svelte';
  import { themeStore } from '#lib/theme.svelte.js';

  let whatsappUrl = $state('https://chat.whatsapp.com/E7r0xi9u1qOE9v0YjbHcpM?s=cl&p=i&mlu=4');
  let postJobEmail = $state('Ozadhanvi99@gmail.com');
  let mobileOpen = $state(false);

  onMount(async () => {
    try {
      const res = await fetch('/api/v1/vc-settings');
      if (res.ok) {
        const data = await res.json();
        if (data.whatsapp_url) whatsappUrl = data.whatsapp_url;
        if (data.post_job_email) postJobEmail = data.post_job_email;
      }
    } catch {
      // Keep default verified settings
    }
  });

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/jobs', label: 'Open Roles' },
    { href: '/companies', label: 'VC Funds' },
    { href: '/collections', label: 'Collections' },
    { href: '/about', label: 'About' },
  ] as const;

  const path = $derived(page.url.pathname);
  const isActive = (href: string) =>
    href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`);
  const isDark = $derived(themeStore.isDark);
</script>

<header class="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
  <div class="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 lg:gap-6">
    <!-- Left: Official VC Jobs Logo (Always navigates to Homepage `/`) -->
    <a
      href={resolve('/')}
      onclick={() => {
        mobileOpen = false;
      }}
      aria-label="VC Jobs — Go to homepage"
      class="inline-flex shrink-0 cursor-pointer items-center py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9966CB]"
    >
      <img
        src="/logo-on-light.png"
        alt="VC Jobs"
        class="h-6 w-auto shrink-0 object-contain sm:h-8 dark:hidden"
      />
      <img
        src="/logo-on-dark.png"
        alt="VC Jobs"
        class="hidden h-6 w-auto shrink-0 object-contain sm:h-8 dark:block"
      />
    </a>

    <!-- Center: Single-Line Navigation Links (Century Gothic Bold) -->
    <nav
      aria-label="Primary navigation"
      class="hidden items-center gap-1 lg:flex lg:gap-2"
    >
      {#each navItems as item (item.href)}
        <a
          href={resolve(item.href)}
          class={[
            'relative whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-bold transition-colors',
            isActive(item.href)
              ? 'text-[#9966CB]'
              : 'text-[#888888] hover:bg-secondary/60 hover:text-foreground',
          ]}
        >
          {item.label}
          {#if isActive(item.href)}
            <span
              class="absolute inset-x-3.5 -bottom-[13px] h-0.5 rounded-full bg-[#9966CB]"
              aria-hidden="true"
            ></span>
          {/if}
        </a>
      {/each}
    </nav>

    <!-- Right: Action Buttons -->
    <div class="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
      <button
        type="button"
        onclick={() => themeStore.toggle()}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Light mode' : 'Dark mode'}
        class="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-[#888888] transition-colors hover:border-[#9966CB] hover:text-foreground"
      >
        {#if isDark}
          <Sun class="size-4 text-[#9966CB]" />
        {:else}
          <Moon class="size-4" />
        {/if}
      </button>

      <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- mailto link -->
      <a
        href="mailto:{postJobEmail}?subject=Post%20a%20VC%20job"
        class="hidden h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-border bg-background px-3.5 text-xs font-bold text-foreground transition-colors hover:border-[#9966CB] hover:text-[#9966CB] lg:inline-flex"
      >
        <Plus class="size-3.5 shrink-0" />
        <span>Post a job</span>
      </a>

      <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external WhatsApp invite -->
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-[#9966CB] px-2.5 text-xs font-bold text-white transition-opacity hover:opacity-90 sm:px-3.5"
      >
        <MessageCircle class="size-3.5 shrink-0" />
        <span>Get job updates</span>
      </a>

      <button
        type="button"
        onclick={() => (mobileOpen = !mobileOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={mobileOpen}
        class="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
      >
        {#if mobileOpen}
          <X class="size-4" />
        {:else}
          <Menu class="size-4" />
        {/if}
      </button>
    </div>
  </div>

  <!-- Mobile Navigation Drawer -->
  {#if mobileOpen}
    <div class="border-t border-border bg-background px-4 py-4 lg:hidden">
      <nav class="flex flex-col gap-1" aria-label="Mobile navigation">
        {#each navItems as item (item.href)}
          <a
            href={resolve(item.href)}
            onclick={() => {
              mobileOpen = false;
            }}
            class={[
              'rounded-lg px-3.5 py-2.5 text-sm font-bold transition-colors',
              isActive(item.href)
                ? 'bg-[#9966CB]/15 text-[#9966CB]'
                : 'text-[#888888] hover:bg-secondary hover:text-foreground',
            ]}
          >
            {item.label}
          </a>
        {/each}
        <div class="mt-2 flex gap-2 border-t border-border pt-3">
          <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- mailto link -->
          <a
            href="mailto:{postJobEmail}?subject=Post%20a%20VC%20job"
            class="inline-flex h-9 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-border px-3 text-xs font-bold text-foreground"
          >
            <Plus class="size-3.5 shrink-0" />
            Post a job
          </a>
          <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external WhatsApp invite -->
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-9 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-[#9966CB] px-3 text-xs font-bold text-white"
          >
            <MessageCircle class="size-3.5 shrink-0" />
            Get job updates
          </a>
        </div>
      </nav>
    </div>
  {/if}
</header>
