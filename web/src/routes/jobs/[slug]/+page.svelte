<script lang="ts">
  import { resolve } from '$app/paths';
  import {
    ArrowLeft,
    ArrowUpRight,
    Building2,
    MapPin,
    Briefcase,
    Globe,
    Calendar,
    MessageCircle,
    Plus,
    CheckCircle2,
  } from '@lucide/svelte';
  import type { PageData } from './$types';
  import type { Job } from '#lib/types.js';

  let { data }: { data: PageData } = $props();

  const job = $derived<Job>(data.job);
  const company = $derived(
    (data as unknown as { fund?: { name?: string; tagline?: string; website?: string } | null }).fund ??
      (data as unknown as { company?: { name?: string; tagline?: string; website?: string } | null }).company ??
      null,
  );
  const similar = $derived<Job[]>(data.similar ?? []);

  function formatCategory(cat?: string | null): string {
    switch ((cat ?? '').toLowerCase()) {
      case 'finance':
        return 'Investment Team';
      case 'operations':
        return 'Platform & Value Creation';
      case 'product':
        return 'Portfolio & EIR';
      case 'marketing':
        return 'Marketing & IR';
      case 'recruiting':
        return 'Talent & Executive Search';
      default:
        return 'Venture Capital';
    }
  }

  function formatWorkMode(mode?: string | null): string {
    if (!mode) return 'On-site';
    if (mode === 'onsite') return 'On-site';
    return mode.charAt(0).toUpperCase() + mode.slice(1);
  }

  function formatDate(iso?: string | null): string {
    if (!iso) return 'Recently verified';
    try {
      return new Date(iso).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Recently verified';
    }
  }
</script>

<svelte:head>
  <title>{job.title} at {job.company} — VC Jobs</title>
  <meta
    name="description"
    content="{job.title} at {job.company} ({job.location || 'Venture Capital'}). Apply directly via VC Jobs."
  />
</svelte:head>

<div class="flex flex-col">
  <!-- ARCHITECTURAL HEADER BAR -->
  <section class="vc-caret-light border-b border-border bg-card">
    <div class="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div class="mb-5 flex items-center justify-between gap-4">
        <a
          href={resolve('/jobs')}
          class="inline-flex items-center gap-1.5 text-xs font-bold text-[#888888] transition-colors hover:text-[#9966CB]"
        >
          <ArrowLeft class="size-3.5" />
          <span>Back to Open Roles</span>
        </a>
        <span class="inline-flex items-center gap-1.5 text-xs text-[#888888]">
          <CheckCircle2 class="size-3.5 text-emerald-500" />
          <span>Verified Active Mandate</span>
        </span>
      </div>

      <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div class="flex flex-col gap-3">
          <div class="flex flex-wrap items-center gap-2">
            <span class="rounded-md bg-[#9966CB]/12 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#9966CB]">
              {formatCategory(job.enrichment?.category)}
            </span>
            {#if job.source}
              <span class="rounded-md border border-border bg-background px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#888888]">
                {job.source.replace(/_/g, ' ')}
              </span>
            {/if}
          </div>

          <h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {job.title}
          </h1>

          <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#888888] sm:text-sm">
            {#if job.company_slug}
              <a
                href={resolve('/companies/[slug]', { slug: job.company_slug })}
                class="inline-flex items-center gap-1.5 font-bold text-foreground transition-colors hover:text-[#9966CB]"
              >
                <Building2 class="size-4 text-[#9966CB]" />
                <span>{job.company}</span>
              </a>
            {:else}
              <span class="inline-flex items-center gap-1.5 font-bold text-foreground">
                <Building2 class="size-4 text-[#9966CB]" />
                <span>{job.company}</span>
              </span>
            {/if}
            <span>·</span>
            <span class="inline-flex items-center gap-1.5">
              <MapPin class="size-4 text-[#9966CB]" />
              <span>{job.location || 'India / Global'}</span>
            </span>
            <span>·</span>
            <span class="inline-flex items-center gap-1.5">
              <Briefcase class="size-4 text-[#9966CB]" />
              <span>{formatWorkMode(job.work_mode)}</span>
            </span>
            <span>·</span>
            <span class="inline-flex items-center gap-1.5">
              <Calendar class="size-4 text-[#9966CB]" />
              <span>{formatDate(job.posted_at)}</span>
            </span>
          </div>
        </div>

        {#if job.url}
          <div class="flex shrink-0 flex-wrap items-center gap-2.5">
            <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external ATS link -->
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-10 items-center gap-2 rounded-lg bg-[#9966CB] px-5 text-xs font-bold text-white transition-colors hover:bg-[#8652B8]"
            >
              <span>Apply directly at {job.company}</span>
              <ArrowUpRight class="size-4" />
            </a>
          </div>
        {/if}
      </div>
    </div>
  </section>

  <!-- MAIN TWO-COLUMN DOSSIER -->
  <div class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
    <div class="grid gap-8 lg:grid-cols-[1fr_340px]">
      <!-- Left Column: Role Specification -->
      <div class="flex flex-col gap-6">
        <section class="rounded-xl border border-border bg-card p-6 sm:p-8">
          <div class="mb-5 flex items-center justify-between border-b border-border pb-4">
            <h2 class="text-base font-bold text-foreground">
              Mandate Overview &amp; Specification
            </h2>
            {#if job.enrichment?.seniority}
              <span class="rounded border border-border bg-secondary/50 px-2.5 py-0.5 text-xs font-bold capitalize text-foreground">
                {job.enrichment.seniority} Level
              </span>
            {/if}
          </div>

          {#if job.skills && job.skills.length > 0}
            <div class="mb-6 flex flex-wrap items-center gap-1.5">
              <span class="mr-1 text-xs font-bold text-[#888888]">Focus areas:</span>
              {#each job.skills as skill (skill)}
                <span class="rounded-md bg-secondary px-2.5 py-1 text-xs text-foreground">
                  {skill}
                </span>
              {/each}
            </div>
          {/if}

          {#if job.description}
            <div class="prose prose-sm sm:prose-base max-w-none text-foreground dark:prose-invert prose-headings:font-bold prose-a:text-[#9966CB]">
              <!-- eslint-disable-next-line svelte/no-at-html-tags -- sanitized server HTML description -->
              {@html job.description}
            </div>
          {:else}
            <p class="text-sm leading-relaxed text-[#888888]">
              This role is hosted directly on {job.company}&rsquo;s official career portal. Select
              <strong class="font-bold text-foreground">Apply directly at {job.company}</strong> to review the complete mandate specification and submit your application.
            </p>
          {/if}

          {#if job.url}
            <div class="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
              <div class="flex flex-col gap-0.5">
                <span class="text-xs font-bold text-foreground">Ready to apply?</span>
                <span class="text-xs text-[#888888]">Applications are routed directly to {job.company}&rsquo;s hiring board.</span>
              </div>
              <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external ATS link -->
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex h-10 items-center gap-2 rounded-lg bg-[#9966CB] px-5 text-xs font-bold text-white transition-colors hover:bg-[#8652B8]"
              >
                <span>Submit Application at {job.company}</span>
                <ArrowUpRight class="size-4" />
              </a>
            </div>
          {/if}
        </section>
      </div>

      <!-- Right Sidebar: Fund Dossier & Alerts -->
      <aside class="flex flex-col gap-5">
        <div class="rounded-xl border border-border bg-card p-5">
          <div class="flex items-center gap-3">
            <div class="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary/60 text-base font-bold text-[#9966CB]">
              {job.company.charAt(0)}
            </div>
            <div class="min-w-0">
              <p class="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9966CB]">
                Venture Capital Fund
              </p>
              <h2 class="truncate text-base font-bold text-foreground">
                {job.company}
              </h2>
            </div>
          </div>

          {#if company?.tagline}
            <p class="mt-3.5 text-xs leading-relaxed text-[#888888]">
              {company.tagline}
            </p>
          {/if}

          <div class="mt-4 flex flex-col gap-2 border-t border-border pt-4">
            {#if job.company_slug}
              <a
                href={resolve('/companies/[slug]', { slug: job.company_slug })}
                class="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-4 text-xs font-bold text-foreground transition-colors hover:border-[#9966CB] hover:text-[#9966CB]"
              >
                <Building2 class="size-3.5" />
                <span>View all {job.company} roles</span>
              </a>
            {/if}

            {#if company?.website}
              <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external website -->
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-4 text-xs font-bold text-[#888888] transition-colors hover:border-[#9966CB] hover:text-foreground"
              >
                <Globe class="size-3.5" />
                <span>Official Fund Website</span>
                <ArrowUpRight class="size-3.5" />
              </a>
            {/if}
          </div>
        </div>

        <div class="rounded-xl border border-border bg-[#1E1E1E] p-5 text-white">
          <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9966CB]">
            VC Jobs Community
          </p>
          <h3 class="mt-1.5 text-base font-bold text-white">
            Get instant VC role alerts
          </h3>
          <p class="mt-1.5 text-xs leading-relaxed text-[#CCCCCC]">
            Receive curated notifications when leading India and global venture capital funds open new investment and platform roles.
          </p>
          <div class="mt-4 flex flex-col gap-2">
            <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external WhatsApp link -->
            <a
              href="https://chat.whatsapp.com/E7r0xi9u1qOE9v0YjbHcpM?s=cl&p=i&mlu=4"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#9966CB] px-4 text-xs font-bold text-white transition-colors hover:bg-[#8652B8]"
            >
              <MessageCircle class="size-3.5" />
              <span>Get job updates</span>
            </a>
            <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- mailto link -->
            <a
              href="mailto:Ozadhanvi99@gmail.com?subject=Post%20a%20VC%20job"
              class="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-4 text-xs font-bold text-white transition-colors hover:border-[#9966CB]"
            >
              <Plus class="size-3.5" />
              <span>Post a job</span>
            </a>
          </div>
        </div>
      </aside>
    </div>

    <!-- SIMILAR ROLES LEDGER -->
    {#if similar.length > 0}
      <section class="mt-12 flex flex-col gap-4 border-t border-border pt-10">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9966CB]">
              Comparable Mandates
            </span>
            <h2 class="text-xl font-bold text-foreground">
              Related Venture Capital Roles
            </h2>
          </div>
          <a
            href={resolve('/jobs')}
            class="text-xs font-bold text-[#9966CB] hover:underline"
          >
            View all roles →
          </a>
        </div>

        <div class="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {#each similar.slice(0, 6) as rel (rel.public_slug)}
            <a
              href={resolve('/jobs/[slug]', { slug: rel.public_slug })}
              class="group flex flex-col justify-between gap-2 px-5 py-3.5 transition-colors hover:bg-secondary/35 sm:flex-row sm:items-center"
            >
              <div class="flex min-w-0 items-center gap-3">
                <div class="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-secondary/60 text-xs font-bold text-[#9966CB]">
                  {rel.company.charAt(0)}
                </div>
                <div class="min-w-0">
                  <h3 class="truncate text-sm font-bold text-foreground group-hover:text-[#9966CB]">
                    {rel.title}
                  </h3>
                  <p class="truncate text-xs text-[#888888]">
                    {rel.company} · {rel.location || 'India / Global'}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-2 self-end sm:self-center">
                <span class="rounded-md bg-[#9966CB]/10 px-2 py-0.5 text-[11px] font-bold text-[#9966CB]">
                  {formatCategory(rel.enrichment?.category)}
                </span>
                <ArrowUpRight class="size-4 text-[#888888] group-hover:text-[#9966CB]" />
              </div>
            </a>
          {/each}
        </div>
      </section>
    {/if}
  </div>
</div>
