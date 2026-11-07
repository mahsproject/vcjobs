<script lang="ts">
  import { page } from '$app/state';
  import { resolve } from '$app/paths';
  import {
    ArrowRight,
    ArrowUpRight,
    RefreshCw,
    FileSpreadsheet,
    Globe,
    ShieldCheck,
    MessageCircle,
    Plus,
  } from '@lucide/svelte';
  import Seo from '#lib/components/Seo.svelte';
  import { jsonLdScript, siteOrganizationJsonLd, websiteJsonLd } from '#lib/seo.js';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const origin = $derived(page.url.origin);
  const canonical = $derived(`${origin}/about`);
  const jsonLd = $derived(jsonLdScript([websiteJsonLd(origin), siteOrganizationJsonLd(origin)]));
</script>

<Seo
  title="About VC Jobs — Opportunities in Venture Capital"
  description="Good work deserves to be found. Learn how VC Jobs automatically indexes opportunities across {data.totalFunds} Indian and global venture capital funds."
  {canonical}
/>

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- non-executable JSON-LD built by jsonLdScript -->
  {@html jsonLd}
</svelte:head>

<div class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
  <!-- Hero Section -->
  <section
    class="dot-grid relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-10"
  >
    <div class="inline-flex items-center gap-2 rounded-full bg-[#9966CB]/12 px-3.5 py-1.5">
      <span class="text-xs font-bold leading-none text-[#9966CB]">^</span>
      <span class="text-xs font-bold tracking-[0.12em] uppercase text-[#9966CB]">
        About VC Jobs
      </span>
    </div>

    <h1 class="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
      Good work deserves <span class="text-[#9966CB]">to be found.</span>
    </h1>

    <p class="mt-4 max-w-3xl text-base font-normal leading-relaxed text-[#888888] sm:text-lg">
      <strong class="font-bold text-foreground">VC Jobs</strong> is a curated career platform focused
      exclusively on roles across venture capital funds — connecting candidates with opportunities in
      investment teams, platform, operations, marketing, talent, and portfolio support across
      <strong class="font-bold text-foreground">{data.totalFunds} Indian and global venture firms</strong>.
    </p>

    <div class="mt-8 grid gap-4 sm:grid-cols-3">
      <div class="rounded-xl border border-border bg-background p-5">
        <p class="text-2xl font-bold text-[#9966CB] sm:text-3xl">{data.totalFunds}</p>
        <p class="mt-1 text-xs font-bold uppercase tracking-wider text-foreground">
          VC Funds Indexed
        </p>
        <p class="mt-1 text-xs font-normal text-[#888888]">
          {data.indiaFunds} Indian VCs · {data.globalFunds} Global VCs
        </p>
      </div>
      <div class="rounded-xl border border-border bg-background p-5">
        <p class="text-2xl font-bold text-[#9966CB] sm:text-3xl">{data.totalJobs}</p>
        <p class="mt-1 text-xs font-bold uppercase tracking-wider text-foreground">
          Live Open Roles
        </p>
        <p class="mt-1 text-xs font-normal text-[#888888]">
          100% live ATS &amp; Google Sheet synced
        </p>
      </div>
      <div class="rounded-xl border border-border bg-background p-5">
        <p class="text-2xl font-bold text-[#9966CB] sm:text-3xl">6</p>
        <p class="mt-1 text-xs font-bold uppercase tracking-wider text-foreground">
          Automated Sync Pipelines
        </p>
        <p class="mt-1 text-xs font-normal text-[#888888]">
          Greenhouse, Lever, Ashby, Workable, SmartRecruiters &amp; Google Sheets
        </p>
      </div>
    </div>
  </section>

  <!-- How Automated Ingestion Works -->
  <section class="mt-12">
    <h2 class="text-2xl font-bold tracking-tight text-foreground">
      How Live Automation &amp; Google Sheet Sync Work
    </h2>
    <p class="mt-2 max-w-2xl text-sm font-normal leading-relaxed text-[#888888]">
      Every listing on VC Jobs comes directly from live automated ATS feeds or our live Google Sheet —
      with zero fake or static placeholder listings.
    </p>

    <div class="mt-6 grid gap-5 md:grid-cols-3">
      <div class="rounded-2xl border border-border bg-card p-6">
        <span
          class="inline-flex size-10 items-center justify-center rounded-xl bg-[#9966CB]/12 text-[#9966CB]"
        >
          <Globe class="size-5" />
        </span>
        <h3 class="mt-4 text-base font-bold text-foreground">1. Direct ATS Career Board Crawlers</h3>
        <p class="mt-2 text-xs font-normal leading-relaxed text-[#888888]">
          Our background engine continuously polls Greenhouse, Lever, Ashby, Workable, and
          SmartRecruiters APIs for monitored Indian and global VC funds.
        </p>
      </div>

      <div class="rounded-2xl border border-border bg-card p-6">
        <span
          class="inline-flex size-10 items-center justify-center rounded-xl bg-[#9966CB]/12 text-[#9966CB]"
        >
          <FileSpreadsheet class="size-5" />
        </span>
        <h3 class="mt-4 text-base font-bold text-foreground">2. Live Google Sheet Integration</h3>
        <p class="mt-2 text-xs font-normal leading-relaxed text-[#888888]">
          Roles added to our verified Google Sheet (along with WhatsApp link settings in the Settings
          tab) are automatically fetched and normalized in real time.
        </p>
      </div>

      <div class="rounded-2xl border border-border bg-card p-6">
        <span
          class="inline-flex size-10 items-center justify-center rounded-xl bg-[#9966CB]/12 text-[#9966CB]"
        >
          <ShieldCheck class="size-5" />
        </span>
        <h3 class="mt-4 text-base font-bold text-foreground">3. Auto-Deduplication &amp; Enrichment</h3>
        <p class="mt-2 text-xs font-normal leading-relaxed text-[#888888]">
          Each posting is automatically classified by venture track (Investment, Platform, Portfolio/EIR,
          Talent), seniority, work mode, and geography.
        </p>
      </div>
    </div>
  </section>

  <!-- CTA Card -->
  <section class="mt-12 rounded-2xl border border-[#1E1E1E] bg-[#1E1E1E] p-8 text-white sm:p-10">
    <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
      <div>
        <h2 class="text-2xl font-bold text-white">Ready to explore or share an opportunity?</h2>
        <p class="mt-2 max-w-xl text-sm font-normal text-[#888888]">
          Browse all live roles on the Open Roles board, join our WhatsApp alerts channel, or send us a
          role to feature.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <a
          href={resolve('/jobs')}
          class="inline-flex h-11 items-center gap-2 rounded-xl bg-[#9966CB] px-5 text-xs font-bold text-white transition-opacity hover:opacity-90"
        >
          <span>Explore Open Roles</span>
          <ArrowRight class="size-4" />
        </a>

        <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external WhatsApp link -->
        <a
          href={data.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 text-xs font-bold text-white transition-colors hover:border-[#9966CB]"
        >
          <MessageCircle class="size-4 text-[#9966CB]" />
          <span>Get job updates</span>
          <ArrowUpRight class="size-3.5" />
        </a>

        <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- mailto link -->
        <a
          href="mailto:{data.postJobEmail}?subject=Post%20a%20VC%20job"
          class="inline-flex h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 text-xs font-bold text-white transition-colors hover:border-[#9966CB]"
        >
          <Plus class="size-4" />
          <span>Post a job</span>
        </a>
      </div>
    </div>
  </section>
</div>
