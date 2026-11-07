<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { ArrowRight, MessageCircle, X } from '@lucide/svelte';
  import { dismissCliBanner, loadCliBannerDismissed, cliBannerDismissed } from '#lib/cliBanner.svelte.js';
  import { isAccountArea } from '#lib/shellLayout.js';
  import { buttonVariants, cn } from '#lib/ui/index.js';

  let whatsappUrl = $state('https://chat.whatsapp.com/E7r0xi9u1qOE9v0YjbHcpM?s=cl&p=i&mlu=4');

  onMount(async () => {
    loadCliBannerDismissed();
    try {
      const res = await fetch('/api/v1/vc-settings');
      if (res.ok) {
        const data = await res.json();
        if (data.whatsapp_url) whatsappUrl = data.whatsapp_url;
      }
    } catch {
      // Keep default WhatsApp link
    }
  });

  const inAccountArea = $derived(isAccountArea(page.url.pathname));
</script>

{#if !inAccountArea && !cliBannerDismissed()}
  <div data-cli-banner class="border-b border-border bg-brand/10">
    <div class="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-2 text-sm">
      <div class="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-0.5 leading-snug text-muted-foreground">
        <span class="inline-flex items-center gap-1.5 font-bold text-foreground">
          <MessageCircle class="size-4 text-brand" />
          Join the VC Jobs WhatsApp Community
        </span>
        <span class="hidden md:inline">Get instant alerts when top venture capital funds post new Analyst, Associate, and Platform roles.</span>
      </div>

      <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external WhatsApp invite -->
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        class={cn(buttonVariants({ variant: 'cta', size: 'sm' }), 'h-7 shrink-0 gap-1 rounded-full px-3 text-xs font-bold')}
      >
        Join WhatsApp
        <ArrowRight class="size-3.5" aria-hidden="true" />
      </a>

      <button
        type="button"
        onclick={dismissCliBanner}
        aria-label="Dismiss"
        class="relative flex shrink-0 items-center justify-center text-muted-foreground transition-colors after:absolute after:-inset-1 hover:text-foreground"
      >
        <X class="size-4" aria-hidden="true" />
      </button>
    </div>
  </div>
{/if}
