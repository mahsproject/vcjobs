<script lang="ts">
  import { resolve } from '$app/paths';
  import { reopen } from '#lib/consent.svelte.js';
  import { MessageCircle, Plus, ArrowUpRight } from '@lucide/svelte';

  const groups = [
    {
      title: 'Venture Tracks',
      links: [
        { label: 'Investment Team Roles', href: `${resolve('/jobs')}?category=finance` },
        { label: 'Platform & Value Creation', href: `${resolve('/jobs')}?category=operations` },
        { label: 'Portfolio & Founders\u2019 Office', href: `${resolve('/jobs')}?category=product` },
        { label: 'Marketing & Communications', href: `${resolve('/jobs')}?category=marketing` },
        { label: 'Talent & Executive Search', href: `${resolve('/jobs')}?category=recruiting` },
      ],
    },
    {
      title: 'Global VC Hubs',
      links: [
        { label: 'India (Bengaluru · Mumbai · NCR)', href: `${resolve('/jobs')}?countries=in` },
        { label: 'United States (SF · NYC · Boston)', href: `${resolve('/jobs')}?countries=us` },
        { label: 'United Kingdom & Europe', href: `${resolve('/jobs')}?regions=eu` },
        { label: 'Singapore & APAC', href: `${resolve('/jobs')}?regions=apac` },
        { label: 'Remote VC Roles', href: `${resolve('/jobs')}?work_mode=remote` },
      ],
    },
    {
      title: 'Directory & Platform',
      links: [
        { label: 'All Open Roles', href: resolve('/jobs') },
        { label: 'Venture Capital Funds', href: resolve('/companies') },
        { label: 'Curated Collections', href: resolve('/collections') },
        { label: 'Market Insights', href: resolve('/insights') },
        { label: 'Submit a VC Role', href: resolve('/submit') },
        { label: 'About VC Jobs', href: resolve('/about') },
      ],
    },
  ];

  const year = new Date().getFullYear();
  let { compact = false }: { compact?: boolean } = $props();
</script>

<footer class="border-t border-border bg-[#1E1E1E] text-white">
  {#if !compact}
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div class="grid gap-10 lg:grid-cols-[1.25fr_2fr] lg:gap-16">
        <!-- Brand Column -->
        <div class="flex flex-col justify-between gap-6">
          <div class="flex flex-col gap-4">
            <a
              href={resolve('/')}
              onclick={() => {
                window.dispatchEvent(new CustomEvent('vcjobs:reset-home'));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="VC Jobs — Go to main page"
              class="inline-flex items-center self-start py-1"
            >
              <img
                src="/logo-on-dark.png"
                alt="VC Jobs"
                class="h-8 w-auto object-contain"
              />
            </a>
            <p class="max-w-sm text-sm leading-relaxed text-[#CCCCCC]">
              Good work deserves to be found. The institutional directory for investment,
              platform, operations, and portfolio opportunities across verified venture capital funds.
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-2.5">
            <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external WhatsApp invite -->
            <a
              href="https://chat.whatsapp.com/E7r0xi9u1qOE9v0YjbHcpM?s=cl&p=i&mlu=4"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-9 items-center gap-2 rounded-lg bg-[#9966CB] px-4 text-xs font-bold text-white transition-colors hover:bg-[#8652B8]"
            >
              <MessageCircle class="size-3.5" />
              Get job updates
              <ArrowUpRight class="size-3.5" />
            </a>
            <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- mailto link -->
            <a
              href="mailto:Ozadhanvi99@gmail.com?subject=Post%20a%20VC%20job"
              class="inline-flex h-9 items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 text-xs font-bold text-white transition-colors hover:border-[#9966CB] hover:bg-[#9966CB]/15"
            >
              <Plus class="size-3.5" />
              Post a job
            </a>
          </div>
        </div>

        <!-- Links Columns -->
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {#each groups as group (group.title)}
            <nav class="flex flex-col gap-3" aria-label={group.title}>
              <p class="text-xs font-bold uppercase tracking-[0.14em] text-[#9966CB]">
                {group.title}
              </p>
              <ul class="flex flex-col gap-2">
                {#each group.links as link (link.href)}
                  <li>
                    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- internal route resolved above -->
                    <a
                      href={link.href}
                      class="text-sm text-[#CCCCCC] transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                {/each}
              </ul>
            </nav>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <div class="border-t border-white/10">
    <div
      class="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-[#888888] sm:flex-row sm:items-center sm:justify-between sm:px-6"
    >
      <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p class="font-bold text-white">© {year} VC Jobs</p>
        <span aria-hidden="true">·</span>
        <p>Opportunities in Venture Capital</p>
        <span aria-hidden="true">·</span>
        <a href={resolve('/privacy')} class="text-[#888888] transition-colors hover:text-white">
          Privacy Policy
        </a>
        <span aria-hidden="true">·</span>
        <a href={resolve('/terms')} class="text-[#888888] transition-colors hover:text-white">
          Terms of Service
        </a>
        <span aria-hidden="true">·</span>
        <a href={resolve('/status')} class="text-[#888888] transition-colors hover:text-white">
          System Status
        </a>
        <span aria-hidden="true">·</span>
        <button
          type="button"
          onclick={reopen}
          class="text-[#888888] transition-colors hover:text-white"
        >
          Cookie Preferences
        </button>
      </div>
      <div class="flex items-center gap-2 text-[#888888]">
        <span class="size-1.5 rounded-full bg-emerald-400" aria-hidden="true"></span>
        <span>Live ATS &amp; Curated Sheet Sync</span>
      </div>
    </div>
  </div>
</footer>
