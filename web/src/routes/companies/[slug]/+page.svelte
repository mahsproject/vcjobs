<script lang="ts">
  import { resolve } from '$app/paths';
  import {
    ArrowLeft,
    ArrowUpRight,
    Building2,
    Globe,
    MapPin,
    Briefcase,
    Users,
    Calendar,
    MessageCircle,
  } from '@lucide/svelte';
  import type { PageData } from './$types';
  import type { Job } from '#lib/types.js';

  let { data }: { data: PageData } = $props();

  const company = $derived(
    (data as unknown as {
      fund?: {
        slug: string;
        name: string;
        tagline?: string | null;
        hq_country?: string | null;
        website?: string | null;
        careersUrl?: string | null;
        linkedin_url?: string | null;
        industries?: string[];
        year_founded?: number | null;
        employee_count?: number | null;
      };
      company?: {
        slug: string;
        name: string;
        tagline?: string | null;
        hq_country?: string | null;
        website?: string | null;
        careersUrl?: string | null;
        linkedin_url?: string | null;
        industries?: string[];
        year_founded?: number | null;
        employee_count?: number | null;
      };
    }).fund ??
      (data as unknown as { company: { slug: string; name: string; tagline?: string | null; hq_country?: string | null; website?: string | null; careersUrl?: string | null; linkedin_url?: string | null; industries?: string[]; year_founded?: number | null; employee_count?: number | null } }).company,
  );
  const jobs = $derived<Job[]>(data.jobs ?? []);

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
        return 'Talent & HR';
      default:
        return 'Venture Role';
    }
  }

  function formatWorkMode(mode?: string | null): string {
    if (!mode) return 'On-site';
    if (mode === 'onsite') return 'On-site';
    return mode.charAt(0).toUpperCase() + mode.slice(1);
  }
</script>

<svelte:head>
  <title>{company.name} — Venture Capital Fund Profile &amp; Open Roles — VC Jobs</title>
  <meta
    name="description"
    content="{company.tagline || `Explore open venture capital roles and fund profile for ${company.name} on VC Jobs.`}"
  />
</svelte:head>

<div class="flex flex-col">
  <!-- FUND DOSSIER HEADER -->
  <section class="vc-caret-light border-b border-border bg-card">
    <div class="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div class="mb-5">
        <a
          href={resolve('/companies')}
          class="inline-flex items-center gap-1.5 text-xs font-bold text-[#888888] transition-colors hover:text-[#9966CB]"
        >
          <ArrowLeft class="size-3.5" />
          <span>Back to VC Funds Directory</span>
        </a>
      </div>

      <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div class="flex items-start gap-4">
          <div class="flex size-14 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary/60 text-xl font-bold text-[#9966CB]">
            {company.name.charAt(0)}
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex flex-wrap items-center gap-2">
              <span class="rounded-md bg-[#9966CB]/12 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#9966CB]">
                Venture Capital Fund
              </span>
              {#if company.hq_country}
                <span class="rounded-md border border-border bg-background px-2 py-0.5 text-[11px] font-bold uppercase text-foreground">
                  {company.hq_country}
                </span>
              {/if}
              {#if company.industries && company.industries.length > 0}
                {#each company.industries as ind (ind)}
                  <span class="rounded-md bg-secondary px-2 py-0.5 text-[11px] text-[#888888]">
                    {ind}
                  </span>
                {/each}
              {/if}
            </div>

            <h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {company.name}
            </h1>

            {#if company.tagline}
              <p class="max-w-2xl text-sm leading-relaxed text-[#888888]">
                {company.tagline}
              </p>
            {/if}

            <div class="mt-1 flex flex-wrap items-center gap-4 text-xs text-[#888888]">
              {#if company.year_founded}
                <span class="inline-flex items-center gap-1.5">
                  <Calendar class="size-3.5 text-[#9966CB]" />
                  <span>Founded {company.year_founded}</span>
                </span>
              {/if}
              {#if company.employee_count}
                <span class="inline-flex items-center gap-1.5">
                  <Users class="size-3.5 text-[#9966CB]" />
                  <span>~{company.employee_count} team members</span>
                </span>
              {/if}
              <span class="inline-flex items-center gap-1.5 font-bold text-[#9966CB]">
                <Briefcase class="size-3.5" />
                <span>{jobs.length} {jobs.length === 1 ? 'active mandate' : 'active mandates'}</span>
              </span>
            </div>
          </div>
        </div>

        <div class="flex shrink-0 flex-wrap items-center gap-2.5">
          {#if company.website}
            <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external website -->
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-4 text-xs font-bold text-foreground transition-colors hover:border-[#9966CB] hover:text-[#9966CB]"
            >
              <Globe class="size-3.5" />
              <span>Official Website</span>
              <ArrowUpRight class="size-3.5" />
            </a>
          {/if}

          {#if company.linkedin_url}
            <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external LinkedIn -->
            <a
              href={company.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#9966CB] px-4 text-xs font-bold text-white transition-colors hover:bg-[#8652B8]"
            >
              <span>LinkedIn</span>
              <ArrowUpRight class="size-3.5" />
            </a>
          {/if}
        </div>
      </div>
    </div>
  </section>

  <!-- OPEN ROLES LEDGER -->
  <div class="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10">
    <div class="flex items-center justify-between">
      <div>
        <span class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9966CB]">
          Career Feed
        </span>
        <h2 class="text-xl font-bold text-foreground">
          Open Roles at {company.name} ({jobs.length})
        </h2>
      </div>
      <a
        href={resolve('/jobs')}
        class="text-xs font-bold text-[#9966CB] hover:underline"
      >
        Browse all VC roles →
      </a>
    </div>

    {#if jobs.length > 0}
      <div class="overflow-hidden rounded-xl border border-border bg-card">
        <div class="hidden border-b border-border bg-secondary/40 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#888888] lg:grid lg:grid-cols-[2.2fr_1.2fr_1fr_auto] lg:items-center lg:gap-4">
          <span>Role Title &amp; Focus</span>
          <span>Location &amp; Mode</span>
          <span>Venture Track</span>
          <span class="text-right">Action</span>
        </div>

        <div class="divide-y divide-border">
          {#each jobs as job (job.public_slug)}
            <article class="group flex flex-col justify-between gap-3 px-5 py-4 transition-colors hover:bg-secondary/30 lg:grid lg:grid-cols-[2.2fr_1.2fr_1fr_auto] lg:items-center lg:gap-4">
              <div class="flex min-w-0 flex-col gap-1">
                <a
                  href={resolve('/jobs/[slug]', { slug: job.public_slug })}
                  class="truncate text-sm font-bold text-foreground group-hover:text-[#9966CB]"
                >
                  {job.title}
                </a>
                {#if job.skills && job.skills.length > 0}
                  <div class="flex flex-wrap gap-1.5">
                    {#each job.skills.slice(0, 4) as skill (skill)}
                      <span class="rounded bg-secondary px-1.5 py-0.5 text-[11px] text-[#888888]">
                        {skill}
                      </span>
                    {/each}
                  </div>
                {/if}
              </div>

              <div class="flex min-w-0 items-center gap-2 text-xs text-[#888888]">
                <MapPin class="size-3.5 shrink-0 text-[#9966CB]" />
                <span class="truncate">{job.location || 'India / Global'}</span>
                <span class="shrink-0">·</span>
                <span class="shrink-0 whitespace-nowrap font-bold text-foreground">{formatWorkMode(job.work_mode)}</span>
              </div>

              <div>
                <span class="rounded-md bg-[#9966CB]/10 px-2 py-0.5 text-[11px] font-bold text-[#9966CB]">
                  {formatCategory(job.enrichment?.category)}
                </span>
              </div>

              <div class="flex items-center justify-end gap-2">
                <a
                  href={resolve('/jobs/[slug]', { slug: job.public_slug })}
                  class="inline-flex h-8 items-center rounded-lg border border-border bg-background px-3 text-xs font-bold text-foreground hover:border-[#9966CB] hover:text-[#9966CB]"
                >
                  Details
                </a>
                {#if job.url}
                  <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external ATS link -->
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex h-8 items-center gap-1 rounded-lg bg-[#9966CB] px-3 text-xs font-bold text-white hover:bg-[#8652B8]"
                  >
                    <span>Apply</span>
                    <ArrowUpRight class="size-3.5" />
                  </a>
                {/if}
              </div>
            </article>
          {/each}
        </div>
      </div>
    {:else}
      <div class="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-10 text-center">
        <Building2 class="size-7 text-[#9966CB]" />
        <p class="text-sm font-bold text-foreground">
          No active public job postings at {company.name} right now
        </p>
        <p class="max-w-md text-xs text-[#888888]">
          Many venture capital firms hire opportunistically through warm networks. Join our WhatsApp community to get alerted the moment {company.name} posts a new mandate.
        </p>
        <div class="mt-2 flex flex-wrap justify-center gap-2.5">
          <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external WhatsApp link -->
          <a
            href="https://chat.whatsapp.com/E7r0xi9u1qOE9v0YjbHcpM?s=cl&p=i&mlu=4"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#9966CB] px-4 text-xs font-bold text-white hover:bg-[#8652B8]"
          >
            <MessageCircle class="size-3.5" />
            <span>Get job updates</span>
          </a>
          <a
            href={resolve('/jobs')}
            class="inline-flex h-9 items-center rounded-lg border border-border bg-background px-4 text-xs font-bold text-foreground hover:border-[#9966CB]"
          >
            Browse other VC roles
          </a>
        </div>
      </div>
    {/if}
  </div>
</div>
