<script lang="ts">
  import { page } from '$app/state';
  import { resolve } from '$app/paths';
  import {
    ArrowLeft,
    ArrowUpRight,
    MapPin,
    Briefcase,
    Globe,
    MessageCircle,
    Plus,
  } from '@lucide/svelte';
  import Seo from '#lib/components/Seo.svelte';
  import { breadcrumbJsonLd, companyPageTitle, jsonLdScript } from '#lib/seo.js';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const origin = $derived(page.url.origin);
  const canonical = $derived(`${origin}/companies/${data.slug}`);
  const title = $derived(companyPageTitle(data.fund.name, data.jobs.length));

  const breadcrumbItems = $derived([
    { name: 'Home', url: `${origin}/` },
    { name: 'VC Funds', url: `${origin}/companies` },
    { name: data.fund.name, url: canonical },
  ]);

  const jsonLd = $derived(jsonLdScript([breadcrumbJsonLd(breadcrumbItems)]));

  function formatWorkMode(mode?: string): string {
    if (mode === 'remote') return 'Remote';
    if (mode === 'hybrid') return 'Hybrid';
    return 'On-site';
  }

  function formatTrackBadge(cat?: string): string {
    if (cat === 'finance') return 'Investment Team';
    if (cat === 'operations') return 'Platform & Ops';
    if (cat === 'product') return 'Portfolio & EIR';
    if (cat === 'marketing') return 'Marketing & Brand';
    if (cat === 'recruiting') return 'Talent & People';
    return 'Venture Role';
  }
</script>

<Seo
  {title}
  description="{data.fund.tagline} Browse open roles at {data.fund.name} on VC Jobs."
  {canonical}
/>

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- non-executable JSON-LD built by jsonLdScript -->
  {@html jsonLd}
</svelte:head>

<div class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
  <!-- Breadcrumb & Back Link -->
  <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
    <a
      href={resolve('/companies')}
      class="inline-flex items-center gap-1.5 text-xs font-bold text-[#888888] transition-colors hover:text-[#9966CB]"
    >
      <ArrowLeft class="size-3.5" />
      <span>Back to All VC Funds</span>
    </a>

    <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-xs font-normal text-[#888888]">
      <a href={resolve('/')} class="hover:text-foreground">Home</a>
      <span>/</span>
      <a href={resolve('/companies')} class="hover:text-foreground">VC Funds</a>
      <span>/</span>
      <span class="font-bold text-foreground">{data.fund.name}</span>
    </nav>
  </div>

  <!-- Fund Header Card -->
  <header
    class="dot-grid relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8"
  >
    <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
      <div class="flex items-start gap-4">
        <div
          class="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#9966CB]/12 text-lg font-bold text-[#9966CB]"
        >
          {data.fund.name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <div class="flex flex-wrap items-center gap-2">
            <span
              class="rounded-full bg-[#9966CB]/12 px-3 py-0.5 text-xs font-bold text-[#9966CB]"
            >
              {data.fund.hq_country === 'in' ? 'India Venture Fund' : 'Global Venture Fund'}
            </span>
            {#each data.fund.industries as ind (ind)}
              <span
                class="rounded-full border border-border px-2.5 py-0.5 text-xs font-normal text-[#888888]"
              >
                {ind}
              </span>
            {/each}
          </div>

          <h1 class="mt-2.5 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
            {data.fund.name}
          </h1>
          <p class="mt-2 max-w-2xl text-sm font-normal leading-relaxed text-[#888888] sm:text-base">
            {data.fund.tagline}
          </p>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-2.5">
        {#if data.fund.careersUrl}
          <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external careers URL -->
          <a
            href={data.fund.careersUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#9966CB] px-4 text-xs font-bold text-white transition-opacity hover:opacity-90"
          >
            <span>Official Career Portal</span>
            <ArrowUpRight class="size-3.5" />
          </a>
        {/if}

        {#if data.fund.website}
          <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external website -->
          <a
            href={data.fund.website}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-10 items-center gap-1.5 rounded-xl border border-border bg-background px-4 text-xs font-bold text-foreground transition-colors hover:border-[#9966CB] hover:text-[#9966CB]"
          >
            <Globe class="size-3.5" />
            <span>Website</span>
          </a>
        {/if}
      </div>
    </div>
  </header>

  <!-- Open Roles at this VC Fund -->
  <section class="mt-8">
    <div class="flex items-center justify-between gap-4">
      <h2 class="text-xl font-bold text-foreground">
        Open Roles at {data.fund.name} ({data.jobs.length})
      </h2>
      <a
        href={resolve('/jobs')}
        class="text-xs font-bold text-[#9966CB] hover:underline"
      >
        Browse all VC roles →
      </a>
    </div>

    {#if data.jobs.length === 0}
      <div class="mt-4 rounded-2xl border border-border bg-card p-10 text-center">
        <p class="text-base font-bold text-foreground">
          No open roles currently indexed in the live feed for {data.fund.name}
        </p>
        <p class="mx-auto mt-1.5 max-w-lg text-xs font-normal leading-relaxed text-[#888888]">
          Many venture capital funds hire opportunistically or post roles directly on their portal or via
          our community sheet. Check their official career page or join WhatsApp alerts below.
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          {#if data.fund.careersUrl}
            <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external careers URL -->
            <a
              href={data.fund.careersUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-10 items-center gap-2 rounded-xl bg-[#9966CB] px-5 text-xs font-bold text-white"
            >
              <span>Check {data.fund.name} Career Page</span>
              <ArrowUpRight class="size-3.5" />
            </a>
          {/if}
          <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external WhatsApp link -->
          <a
            href={data.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-background px-5 text-xs font-bold text-foreground hover:border-[#9966CB]"
          >
            <MessageCircle class="size-3.5 text-[#9966CB]" />
            <span>Get job updates</span>
          </a>
          <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- mailto link -->
          <a
            href="mailto:{data.postJobEmail}?subject=Post%20a%20VC%20job%20at%20{encodeURIComponent(data.fund.name)}"
            class="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-background px-5 text-xs font-bold text-foreground hover:border-[#9966CB]"
          >
            <Plus class="size-3.5" />
            <span>Post a role for this fund</span>
          </a>
        </div>
      </div>
    {:else}
      <div class="mt-4 grid gap-4">
        {#each data.jobs as job (job.public_slug)}
          <article
            class="group flex flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-[#9966CB] sm:flex-row sm:items-center"
          >
            <div>
              <span
                class="rounded-full bg-[#9966CB]/12 px-2.5 py-0.5 text-[11px] font-bold text-[#9966CB]"
              >
                {formatTrackBadge(job.enrichment?.category)}
              </span>
              <h3 class="mt-2 text-base font-bold text-foreground group-hover:text-[#9966CB]">
                <a href={resolve('/jobs/[slug]', { slug: job.public_slug })} class="hover:underline">
                  {job.title}
                </a>
              </h3>
              <div class="mt-1.5 flex flex-wrap items-center gap-4 text-xs font-normal text-[#888888]">
                <span class="inline-flex items-center gap-1">
                  <MapPin class="size-3.5" />
                  {job.location}
                </span>
                <span class="inline-flex items-center gap-1">
                  <Briefcase class="size-3.5" />
                  {formatWorkMode(job.work_mode)}
                </span>
              </div>
            </div>

            <div class="flex shrink-0 items-center gap-2.5">
              <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external ATS link -->
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#9966CB] px-4 text-xs font-bold text-white transition-opacity hover:opacity-90"
              >
                <span>Apply</span>
                <ArrowUpRight class="size-3.5" />
              </a>
              <a
                href={resolve('/jobs/[slug]', { slug: job.public_slug })}
                class="inline-flex h-9 items-center rounded-xl border border-border px-3.5 text-xs font-bold text-foreground hover:border-[#9966CB]"
              >
                Details
              </a>
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </section>
</div>
