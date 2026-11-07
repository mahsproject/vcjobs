<script lang="ts">
  import { page } from '$app/state';
  import { resolve } from '$app/paths';
  import {
    ArrowLeft,
    ArrowUpRight,
    Building2,
    MapPin,
    Briefcase,
    Calendar,
    Globe,
    FileSpreadsheet,
    MessageCircle,
    Plus,
  } from '@lucide/svelte';
  import Seo from '#lib/components/Seo.svelte';
  import {
    breadcrumbJsonLd,
    jobPageTitle,
    jobPostingJsonLd,
    jsonLdScript,
    metaDescription,
  } from '#lib/seo.js';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const origin = $derived(page.url.origin);
  const canonical = $derived(`${origin}/jobs/${data.job.public_slug}`);
  const description = $derived(
    metaDescription(data.job.description) ||
      `${data.job.title} at ${data.job.company} — apply on VC Jobs.`,
  );

  const breadcrumbItems = $derived([
    { name: 'Home', url: `${origin}/` },
    { name: 'Open Roles', url: `${origin}/jobs` },
    { name: data.job.company, url: `${origin}/companies/${data.job.company_slug}` },
    { name: data.job.title, url: canonical },
  ]);

  const jsonLd = $derived(
    jsonLdScript([jobPostingJsonLd(data.job, origin), breadcrumbJsonLd(breadcrumbItems)]),
  );

  function formatWorkMode(mode?: string): string {
    if (mode === 'remote') return 'Remote';
    if (mode === 'hybrid') return 'Hybrid';
    return 'On-site';
  }

  function formatTrackBadge(cat?: string): string {
    if (cat === 'finance') return 'Investment Team';
    if (cat === 'operations') return 'Platform & Operations';
    if (cat === 'product') return 'Portfolio & EIR';
    if (cat === 'marketing') return 'Marketing & Brand';
    if (cat === 'recruiting') return 'Talent & People';
    if (cat === 'legal') return 'Legal & Compliance';
    return 'Venture Role';
  }

  function formatSourceLabel(source?: string): string {
    if (source === 'google_sheets') return 'Google Sheet Sync';
    if (source === 'consider') return 'VC Talent Network Live';
    if (source === 'getro') return 'VC Career Board Live';
    if (source === 'zoho_recruit') return 'Zoho Recruit Live';
    if (source === 'greenhouse') return 'Greenhouse Live';
    if (source === 'lever') return 'Lever Live';
    if (source === 'ashby') return 'Ashby Live';
    if (source === 'workable') return 'Workable Live';
    if (source === 'smartrecruiters') return 'SmartRecruiters Live';
    return 'Live ATS';
  }
</script>

<Seo title={jobPageTitle(data.job)} {description} {canonical} />

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- non-executable JSON-LD built by jsonLdScript -->
  {@html jsonLd}
</svelte:head>

<div class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
  <!-- Breadcrumb & Back Link -->
  <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
    <a
      href={resolve('/jobs')}
      class="inline-flex items-center gap-1.5 text-xs font-bold text-[#888888] transition-colors hover:text-[#9966CB]"
    >
      <ArrowLeft class="size-3.5" />
      <span>Back to Open Roles</span>
    </a>

    <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-xs font-normal text-[#888888]">
      <a href={resolve('/')} class="hover:text-foreground">Home</a>
      <span>/</span>
      <a href={resolve('/jobs')} class="hover:text-foreground">Open Roles</a>
      <span>/</span>
      <a
        href={resolve('/companies/[slug]', { slug: data.job.company_slug })}
        class="font-bold text-foreground hover:text-[#9966CB]"
      >
        {data.job.company}
      </a>
    </nav>
  </div>

  <div class="grid gap-8 lg:grid-cols-[1.65fr_0.85fr]">
    <!-- Main Role Content Card -->
    <div class="flex flex-col gap-6">
      <header class="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div class="flex flex-wrap items-center gap-2">
          <span
            class="rounded-full bg-[#9966CB]/12 px-3 py-1 text-xs font-bold text-[#9966CB]"
          >
            {formatTrackBadge(data.job.enrichment?.category)}
          </span>
          <span
            class="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-normal text-[#888888]"
          >
            {#if data.job.source === 'google_sheets'}
              <FileSpreadsheet class="size-3.5 text-[#9966CB]" />
            {:else}
              <Globe class="size-3.5 text-[#9966CB]" />
            {/if}
            {formatSourceLabel(data.job.source)}
          </span>
        </div>

        <h1 class="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {data.job.title}
        </h1>

        <div class="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-normal text-[#888888] sm:text-sm">
          <a
            href={resolve('/companies/[slug]', { slug: data.job.company_slug })}
            class="inline-flex items-center gap-1.5 font-bold text-foreground hover:text-[#9966CB]"
          >
            <Building2 class="size-4 text-[#9966CB]" />
            {data.job.company}
          </a>
          <span class="inline-flex items-center gap-1.5">
            <MapPin class="size-4 text-[#9966CB]" />
            {data.job.location}
          </span>
          <span class="inline-flex items-center gap-1.5">
            <Briefcase class="size-4 text-[#9966CB]" />
            {formatWorkMode(data.job.work_mode)}
          </span>
          {#if data.job.posted_at}
            <span class="inline-flex items-center gap-1.5">
              <Calendar class="size-4 text-[#9966CB]" />
              Posted {data.job.posted_at.slice(0, 10)}
            </span>
          {/if}
        </div>

        {#if data.job.skills?.length > 0}
          <div class="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4">
            {#each data.job.skills as skill (skill)}
              <span
                class="rounded-lg bg-secondary px-2.5 py-1 text-xs font-normal text-[#888888]"
              >
                {skill}
              </span>
            {/each}
          </div>
        {/if}

        <div class="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-6">
          <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external ATS apply URL -->
          <a
            href={data.job.url}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-11 items-center gap-2 rounded-xl bg-[#9966CB] px-6 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            <span>Apply on Official Portal</span>
            <ArrowUpRight class="size-4" />
          </a>

          <a
            href={resolve('/companies/[slug]', { slug: data.job.company_slug })}
            class="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-background px-5 text-sm font-bold text-foreground transition-colors hover:border-[#9966CB] hover:text-[#9966CB]"
          >
            <span>View {data.job.company} Profile</span>
          </a>
        </div>
      </header>

      <!-- Sanitized Role Description -->
      <section class="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h2 class="text-lg font-bold text-foreground">Role Overview &amp; Requirements</h2>
        <div
          class="prose prose-sm dark:prose-invert mt-4 max-w-none font-normal leading-relaxed text-foreground prose-headings:font-bold prose-a:text-[#9966CB]"
        >
          <!-- eslint-disable-next-line svelte/no-at-html-tags -- sanitized on server via sanitizeJobHtml() -->
          {@html data.job.description}
        </div>
      </section>
    </div>

    <!-- Right Sidebar: Fund Info + WhatsApp + Post a Job -->
    <aside class="flex flex-col gap-6">
      <div class="rounded-2xl border border-border bg-card p-6">
        <div class="flex items-center gap-3">
          <div
            class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#9966CB]/12 text-sm font-bold text-[#9966CB]"
          >
            {data.job.company.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 class="text-base font-bold text-foreground">{data.job.company}</h2>
            <p class="text-xs font-normal text-[#888888]">
              {data.fund?.hq_country === 'in' ? 'India Venture Capital Fund' : 'Global Venture Capital Fund'}
            </p>
          </div>
        </div>

        {#if data.fund?.tagline}
          <p class="mt-4 text-xs font-normal leading-relaxed text-[#888888]">
            {data.fund.tagline}
          </p>
        {/if}

        {#if data.fund?.industries?.length}
          <div class="mt-4 flex flex-wrap gap-1.5">
            {#each data.fund.industries as ind (ind)}
              <span class="rounded-md bg-secondary px-2.5 py-1 text-[11px] font-bold text-foreground">
                {ind}
              </span>
            {/each}
          </div>
        {/if}

        <div class="mt-5 flex flex-col gap-2.5 border-t border-border pt-4">
          <a
            href={resolve('/companies/[slug]', { slug: data.job.company_slug })}
            class="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-background px-4 text-xs font-bold text-foreground transition-colors hover:border-[#9966CB] hover:text-[#9966CB]"
          >
            All roles at {data.job.company}
          </a>
          {#if data.fund?.website}
            <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external website -->
            <a
              href={data.fund.website}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-border bg-background px-4 text-xs font-bold text-[#888888] transition-colors hover:border-[#9966CB] hover:text-foreground"
            >
              <span>Official Fund Website</span>
              <ArrowUpRight class="size-3.5" />
            </a>
          {/if}
        </div>
      </div>

      <!-- Community & Job Submission Card -->
      <div class="rounded-2xl border border-[#1E1E1E] bg-[#1E1E1E] p-6 text-white">
        <span class="text-xs font-bold tracking-[0.12em] uppercase text-[#9966CB]">
          ^ VC Jobs Alerts
        </span>
        <h3 class="mt-2 text-base font-bold text-white">
          Get instant VC role updates on WhatsApp
        </h3>
        <p class="mt-1.5 text-xs font-normal leading-relaxed text-[#888888]">
          Receive real-time alerts whenever new analyst, associate, principal, or platform roles go live.
        </p>
        <div class="mt-4 flex flex-col gap-2.5">
          <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external WhatsApp link -->
          <a
            href={data.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#9966CB] px-4 text-xs font-bold text-white transition-opacity hover:opacity-90"
          >
            <MessageCircle class="size-3.5" />
            <span>Get job updates</span>
          </a>

          <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- mailto link -->
          <a
            href="mailto:{data.postJobEmail}?subject=Post%20a%20VC%20job"
            class="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 text-xs font-bold text-white transition-colors hover:border-[#9966CB]"
          >
            <Plus class="size-3.5" />
            <span>Post a job</span>
          </a>
        </div>
      </div>
    </aside>
  </div>

  <!-- Related VC Roles -->
  {#if data.similar.length > 0}
    <section class="mt-12 border-t border-border pt-10">
      <h2 class="text-xl font-bold text-foreground">Related Venture Capital Roles</h2>
      <div class="mt-4 grid gap-4 sm:grid-cols-2">
        {#each data.similar as sim (sim.public_slug)}
          <a
            href={resolve('/jobs/[slug]', { slug: sim.public_slug })}
            class="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-[#9966CB]"
          >
            <div class="min-w-0">
              <p class="truncate text-sm font-bold text-foreground group-hover:text-[#9966CB]">
                {sim.title}
              </p>
              <p class="mt-1 truncate text-xs font-normal text-[#888888]">
                {sim.company} · {sim.location}
              </p>
            </div>
            <ArrowUpRight class="size-4 shrink-0 text-[#9966CB]" />
          </a>
        {/each}
      </div>
    </section>
  {/if}
</div>
