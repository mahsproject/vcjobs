<script lang="ts">
  import { resolve } from '$app/paths';
  import {
    ArrowLeft,
    ArrowUpRight,
    Briefcase,
    Building2,
    Layers,
    MapPin,
  } from '@lucide/svelte';
  import type { PageData } from './$types';
  import type { Job } from '#lib/types.js';

  let { data }: { data: PageData } = $props();

  const collection = $derived(
    data.collection as {
      title?: string;
      name?: string;
      category?: string;
      tagline?: string;
      description?: string;
    },
  );
  const collectionTitle = $derived(collection.title ?? collection.name ?? 'Collection');
  const companies = $derived<Array<{ slug: string; name: string; tagline?: string; hq_country?: string; active_job_count?: number }>>(
    ((data as unknown as { funds?: Array<{ slug: string; name: string; tagline?: string; hq_country?: string; active_job_count?: number }> }).funds ??
      (data as unknown as { companies?: Array<{ slug: string; name: string; tagline?: string; hq_country?: string; active_job_count?: number }> }).companies ??
      []),
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
</script>

<svelte:head>
  <title>{collectionTitle} — Curated VC Collection — VC Jobs</title>
  <meta
    name="description"
    content="{collection.description || collection.tagline || `Explore open venture capital roles and funds in ${collectionTitle}.`}"
  />
</svelte:head>

<div class="flex flex-col">
  <!-- ARCHITECTURAL HEADER -->
  <section class="vc-caret-light border-b border-border bg-card">
    <div class="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <div class="mb-5">
        <a
          href={resolve('/collections')}
          class="inline-flex items-center gap-1.5 text-xs font-bold text-[#888888] transition-colors hover:text-[#9966CB]"
        >
          <ArrowLeft class="size-3.5" />
          <span>Back to Collections</span>
        </a>
      </div>

      <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div class="flex flex-col gap-2">
          <div class="inline-flex items-center gap-2">
            <Layers class="size-3.5 text-[#9966CB]" />
            <span class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9966CB]">
              Curated Collection
            </span>
          </div>
          <h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {collectionTitle}
          </h1>
          {#if collection.description || collection.tagline}
            <p class="max-w-2xl text-sm leading-relaxed text-[#888888]">
              {collection.description || collection.tagline}
            </p>
          {/if}
        </div>

        <div class="flex flex-wrap items-center gap-2.5">
          <span class="inline-flex items-center gap-1.5 rounded-lg bg-[#9966CB]/12 px-3.5 py-2 text-xs font-bold text-[#9966CB]">
            <Briefcase class="size-3.5" />
            <span>{jobs.length} Open {jobs.length === 1 ? 'Role' : 'Roles'}</span>
          </span>
          <span class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-bold text-foreground">
            <Building2 class="size-3.5 text-[#9966CB]" />
            <span>{companies.length} VC {companies.length === 1 ? 'Fund' : 'Funds'}</span>
          </span>
        </div>
      </div>
    </div>
  </section>

  <div class="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-10">
    <!-- OPEN ROLES IN COLLECTION -->
    <section class="flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <div>
          <span class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9966CB]">
            Mandates
          </span>
          <h2 class="text-xl font-bold text-foreground">
            Open Roles in {collectionTitle} ({jobs.length})
          </h2>
        </div>
        <a href={resolve('/jobs')} class="text-xs font-bold text-[#9966CB] hover:underline">
          All open roles →
        </a>
      </div>

      {#if jobs.length > 0}
        <div class="overflow-hidden rounded-xl border border-border bg-card">
          <div class="hidden border-b border-border bg-secondary/40 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#888888] lg:grid lg:grid-cols-[2.2fr_1.3fr_1.2fr_1fr_auto] lg:items-center lg:gap-4">
            <span>Role &amp; Focus</span>
            <span>Venture Fund</span>
            <span>Location</span>
            <span>Track</span>
            <span class="text-right">Action</span>
          </div>

          <div class="divide-y divide-border">
            {#each jobs as job (job.public_slug)}
              <article class="group flex flex-col justify-between gap-3 px-5 py-3.5 transition-colors hover:bg-secondary/30 lg:grid lg:grid-cols-[2.2fr_1.3fr_1.2fr_1fr_auto] lg:items-center lg:gap-4">
                <a
                  href={resolve('/jobs/[slug]', { slug: job.public_slug })}
                  class="truncate text-sm font-bold text-foreground group-hover:text-[#9966CB]"
                >
                  {job.title}
                </a>

                <div class="flex items-center gap-2">
                  <div class="flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-secondary/60 text-xs font-bold text-[#9966CB]">
                    {job.company.charAt(0)}
                  </div>
                  <span class="truncate text-xs font-bold text-foreground">{job.company}</span>
                </div>

                <span class="inline-flex items-center gap-1 text-xs text-[#888888]">
                  <MapPin class="size-3.5 text-[#9966CB]" />
                  {job.location || 'India / Global'}
                </span>

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
        <div class="rounded-xl border border-border bg-card p-8 text-center text-sm text-[#888888]">
          No active roles in this collection right now.
        </div>
      {/if}
    </section>

    <!-- FUNDS IN COLLECTION -->
    {#if companies.length > 0}
      <section class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9966CB]">
              Institutional Directory
            </span>
            <h2 class="text-xl font-bold text-foreground">
              Venture Capital Funds in {collectionTitle} ({companies.length})
            </h2>
          </div>
          <a href={resolve('/companies')} class="text-xs font-bold text-[#9966CB] hover:underline">
            All VC funds →
          </a>
        </div>

        <div class="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card sm:grid-cols-2 sm:divide-x lg:grid-cols-3">
          {#each companies as company (company.slug)}
            <a
              href={resolve('/companies/[slug]', { slug: company.slug })}
              class="group flex flex-col justify-between gap-3 border-b border-border p-5 transition-colors hover:bg-secondary/35"
            >
              <div class="flex items-center justify-between gap-3">
                <div class="flex min-w-0 items-center gap-3">
                  <div class="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary/60 text-sm font-bold text-[#9966CB]">
                    {company.name.charAt(0)}
                  </div>
                  <div class="min-w-0">
                    <h3 class="truncate text-sm font-bold text-foreground group-hover:text-[#9966CB]">
                      {company.name}
                    </h3>
                    {#if company.hq_country}
                      <p class="text-[11px] font-bold uppercase text-[#888888]">{company.hq_country}</p>
                    {/if}
                  </div>
                </div>
                {#if (company.active_job_count ?? 0) > 0}
                  <span class="shrink-0 rounded-md bg-[#9966CB]/12 px-2 py-0.5 text-[11px] font-bold text-[#9966CB]">
                    {company.active_job_count} open
                  </span>
                {/if}
              </div>

              {#if company.tagline}
                <p class="line-clamp-2 text-xs leading-relaxed text-[#888888]">
                  {company.tagline}
                </p>
              {/if}
            </a>
          {/each}
        </div>
      </section>
    {/if}
  </div>
</div>
