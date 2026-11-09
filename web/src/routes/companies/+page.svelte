<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import {
    Building2,
    Search,
    ArrowUpRight,
    Briefcase,
    Globe,
    SlidersHorizontal,
    X,
    LayoutGrid,
    LayoutList,
  } from '@lucide/svelte';
  import type { PageData } from './$types';
  import type { CompanyListItem } from '#lib/types.js';

  let { data }: { data: PageData } = $props();

  let searchInput = $state(page.url.searchParams.get('q') ?? '');
  let countryFilter = $state<'all' | 'in' | 'global'>(
    page.url.searchParams.get('country') === 'in'
      ? 'in'
      : page.url.searchParams.get('country') === 'global'
        ? 'global'
        : 'all',
  );
  let stageFilter = $state(page.url.searchParams.get('stage') ?? '');
  let hiringOnly = $state(page.url.searchParams.get('hiring') === '1');
  let viewMode = $state<'grid' | 'ledger'>('grid');

  type FundRow = CompanyListItem & { active_job_count?: number };

  function openJobCount(c: FundRow): number {
    return c.job_count ?? c.active_job_count ?? 0;
  }

  const allCompanies = $derived<FundRow[]>(
    (data.initial?.items as FundRow[] | undefined) ??
      ((data as unknown as { companies?: FundRow[] }).companies ?? []),
  );

  const indiaCount = $derived(
    allCompanies.filter((c) => (c.hq_country ?? '').toLowerCase() === 'in').length,
  );
  const globalCount = $derived(
    allCompanies.filter((c) => (c.hq_country ?? '').toLowerCase() !== 'in').length,
  );
  const hiringCount = $derived(
    allCompanies.filter((c) => openJobCount(c) > 0).length,
  );

  const stageCategories = [
    { id: '', label: 'All Stages & Sectors' },
    { id: 'seed', label: 'Early Stage & Seed' },
    { id: 'growth', label: 'Multi-Stage & Growth' },
    { id: 'deeptech', label: 'DeepTech & AI' },
    { id: 'climate', label: 'Climate & Impact' },
    { id: 'fintech', label: 'Consumer & FinTech' },
  ];

  const filteredCompanies = $derived.by(() => {
    const q = searchInput.trim().toLowerCase();
    return allCompanies.filter((c) => {
      if (countryFilter === 'in' && (c.hq_country ?? '').toLowerCase() !== 'in') return false;
      if (countryFilter === 'global' && (c.hq_country ?? '').toLowerCase() === 'in') return false;
      if (hiringOnly && openJobCount(c) === 0) return false;

      if (stageFilter) {
        const hay = `${c.tagline ?? ''} ${(c.industries ?? []).join(' ')}`.toLowerCase();
        if (stageFilter === 'seed' && !hay.includes('seed') && !hay.includes('early') && !hay.includes('pre-seed') && !hay.includes('micro')) return false;
        if (stageFilter === 'growth' && !hay.includes('growth') && !hay.includes('multi-stage') && !hay.includes('late')) return false;
        if (stageFilter === 'deeptech' && !hay.includes('deeptech') && !hay.includes('deep tech') && !hay.includes('ai') && !hay.includes('science') && !hay.includes('saas')) return false;
        if (stageFilter === 'climate' && !hay.includes('climate') && !hay.includes('impact') && !hay.includes('clean') && !hay.includes('sustainability') && !hay.includes('energy')) return false;
        if (stageFilter === 'fintech' && !hay.includes('fintech') && !hay.includes('consumer') && !hay.includes('commerce') && !hay.includes('financial')) return false;
      }

      if (q) {
        const hay = `${c.name} ${c.tagline ?? ''} ${c.hq_country ?? ''} ${(c.industries ?? []).join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  });

  const hasFilters = $derived(
    Boolean(searchInput.trim() || countryFilter !== 'all' || stageFilter || hiringOnly),
  );

  function syncUrl() {
    const next = new URLSearchParams();
    if (searchInput.trim()) next.set('q', searchInput.trim());
    if (countryFilter !== 'all') next.set('country', countryFilter);
    if (stageFilter) next.set('stage', stageFilter);
    if (hiringOnly) next.set('hiring', '1');
    const qs = next.toString();
    // eslint-disable-next-line svelte/no-navigation-without-resolve -- query string update on /companies
    void goto(qs ? `${resolve('/companies')}?${qs}` : resolve('/companies'), {
      replaceState: true,
    });
  }

  function clearFilters() {
    searchInput = '';
    countryFilter = 'all';
    stageFilter = '';
    hiringOnly = false;
    // eslint-disable-next-line svelte/no-navigation-without-resolve -- resolved above
    void goto(resolve('/companies'), { replaceState: true });
  }

  function countryLabel(code?: string | null): string {
    switch ((code ?? '').toLowerCase()) {
      case 'in':
        return 'India';
      case 'us':
        return 'United States';
      case 'gb':
        return 'United Kingdom';
      case 'sg':
        return 'Singapore';
      case 'de':
        return 'Germany';
      case 'fr':
        return 'France';
      case 'se':
        return 'Sweden';
      case 'ch':
        return 'Switzerland';
      case 'nl':
        return 'Netherlands';
      case 'il':
        return 'Israel';
      case 'ae':
        return 'UAE';
      case 'jp':
        return 'Japan';
      case 'au':
        return 'Australia';
      case 'ca':
        return 'Canada';
      case 'CN':
      case 'cn':
        return 'China';
      default:
        return code ? code.toUpperCase() : 'Global';
    }
  }
</script>

<svelte:head>
  <title>Venture Capital Funds Directory ({allCompanies.length} VCs) — VC Jobs</title>
  <meta
    name="description"
    content="Explore {allCompanies.length}+ venture capital firms across India ({indiaCount}+ VCs) and global markets ({globalCount}+ VCs), their investment theses, and open career roles."
  />
</svelte:head>

<div class="flex flex-col">
  <!-- ARCHITECTURAL PAGE HEADER -->
  <section class="vc-caret-light border-b border-border bg-card">
    <div class="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div class="flex flex-col gap-2">
          <span class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9966CB]">
            Institutional Directory
          </span>
          <h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Venture Capital Funds ({allCompanies.length})
          </h1>
          <p class="max-w-2xl text-sm text-[#888888]">
            Comprehensive directory of <strong class="font-bold text-foreground">{indiaCount}</strong> Indian venture capital firms and
            <strong class="font-bold text-foreground">{globalCount}</strong> global multi-stage, seed, and sector-specialist funds monitored for active career openings.
          </p>
        </div>

        <!-- Inline Telemetry Strip -->
        <div class="grid grid-cols-2 divide-x divide-y divide-border overflow-hidden rounded-xl border border-border bg-background sm:grid-cols-4 sm:divide-y-0">
          <div class="px-4 py-2.5">
            <p class="text-[11px] text-[#888888]">Total VCs</p>
            <p class="text-lg font-bold tabular-nums text-foreground">{allCompanies.length}</p>
          </div>
          <div class="px-4 py-2.5">
            <p class="text-[11px] text-[#888888]">India VCs</p>
            <p class="text-lg font-bold tabular-nums text-[#9966CB]">{indiaCount}</p>
          </div>
          <div class="px-4 py-2.5">
            <p class="text-[11px] text-[#888888]">Global VCs</p>
            <p class="text-lg font-bold tabular-nums text-foreground">{globalCount}</p>
          </div>
          <div class="px-4 py-2.5">
            <p class="text-[11px] text-[#888888]">Actively Hiring</p>
            <p class="text-lg font-bold tabular-nums text-[#9966CB]">{hiringCount}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- WORKSPACE CONTAINER -->
  <div class="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10">
    <!-- UNIFIED FILTER WORKBENCH -->
    <section
      aria-label="Filter venture capital funds"
      class="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:p-5"
    >
      <div class="flex flex-col gap-3 lg:flex-row lg:items-center">
        <!-- Search Input -->
        <div class="relative flex-1">
          <Search class="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#888888]" />
          <input
            type="search"
            bind:value={searchInput}
            oninput={syncUrl}
            placeholder="Search by VC fund name (Peak XV, Accel, Blume, Chiratae, Bessemer) or thesis..."
            aria-label="Search VC funds"
            class="h-10 w-full rounded-lg border border-border bg-background pr-4 pl-10 text-sm text-foreground placeholder:text-[#888888] focus:border-[#9966CB] focus:outline-none focus:ring-2 focus:ring-[#9966CB]/20"
          />
        </div>

        <!-- Region Segmented Filter + Actively Hiring Toggle -->
        <div class="flex flex-wrap items-center gap-2">
          <div class="inline-flex items-center gap-0.5 rounded-lg border border-border bg-background p-0.5">
            <button
              type="button"
              onclick={() => {
                countryFilter = 'all';
                syncUrl();
              }}
              class={[
                'rounded-md px-3 py-1.5 text-xs font-bold transition-colors',
                countryFilter === 'all'
                  ? 'bg-[#9966CB] text-white'
                  : 'text-[#888888] hover:text-foreground',
              ]}
            >
              All ({allCompanies.length})
            </button>
            <button
              type="button"
              onclick={() => {
                countryFilter = 'in';
                syncUrl();
              }}
              class={[
                'rounded-md px-3 py-1.5 text-xs font-bold transition-colors',
                countryFilter === 'in'
                  ? 'bg-[#9966CB] text-white'
                  : 'text-[#888888] hover:text-foreground',
              ]}
            >
              India VCs ({indiaCount})
            </button>
            <button
              type="button"
              onclick={() => {
                countryFilter = 'global';
                syncUrl();
              }}
              class={[
                'rounded-md px-3 py-1.5 text-xs font-bold transition-colors',
                countryFilter === 'global'
                  ? 'bg-[#9966CB] text-white'
                  : 'text-[#888888] hover:text-foreground',
              ]}
            >
              Global VCs ({globalCount})
            </button>
          </div>

          <button
            type="button"
            onclick={() => {
              hiringOnly = !hiringOnly;
              syncUrl();
            }}
            class={[
              'h-9 rounded-lg border px-3.5 text-xs font-bold transition-colors',
              hiringOnly
                ? 'border-[#1E1E1E] bg-[#1E1E1E] text-white dark:border-white dark:bg-white dark:text-[#1E1E1E]'
                : 'border-border bg-background text-foreground hover:border-[#9966CB]',
            ]}
          >
            Actively Hiring ({hiringCount})
          </button>

          <!-- View Toggle -->
          <div class="hidden items-center gap-0.5 rounded-lg border border-border bg-background p-0.5 sm:inline-flex">
            <button
              type="button"
              onclick={() => (viewMode = 'grid')}
              aria-label="Directory grid view"
              title="Grid view"
              class={[
                'inline-flex size-7 items-center justify-center rounded-md transition-colors',
                viewMode === 'grid'
                  ? 'bg-[#9966CB] text-white'
                  : 'text-[#888888] hover:text-foreground',
              ]}
            >
              <LayoutGrid class="size-3.5" />
            </button>
            <button
              type="button"
              onclick={() => (viewMode = 'ledger')}
              aria-label="Ledger table view"
              title="Table view"
              class={[
                'inline-flex size-7 items-center justify-center rounded-md transition-colors',
                viewMode === 'ledger'
                  ? 'bg-[#9966CB] text-white'
                  : 'text-[#888888] hover:text-foreground',
              ]}
            >
              <LayoutList class="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Stage / Sector Filter Bar -->
      <div class="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3.5">
        <div class="flex flex-wrap items-center gap-1.5">
          {#each stageCategories as st (st.id)}
            <button
              type="button"
              onclick={() => {
                stageFilter = st.id;
                syncUrl();
              }}
              class={[
                'rounded-md px-2.5 py-1 text-xs font-bold transition-colors',
                stageFilter === st.id
                  ? 'bg-[#1E1E1E] text-white dark:bg-white dark:text-[#1E1E1E]'
                  : 'border border-border bg-background text-[#888888] hover:border-[#9966CB]/50 hover:text-foreground',
              ]}
            >
              {st.label}
            </button>
          {/each}
        </div>

        <div class="flex items-center gap-3">
          <span class="text-xs text-[#888888]">
            Showing <strong class="font-bold text-foreground">{filteredCompanies.length}</strong> of {allCompanies.length} funds
          </span>
          {#if hasFilters}
            <button
              type="button"
              onclick={clearFilters}
              class="inline-flex h-7 items-center gap-1 rounded-md border border-[#9966CB]/40 bg-[#9966CB]/10 px-2.5 text-xs font-bold text-[#9966CB] transition-colors hover:bg-[#9966CB]/20"
            >
              <X class="size-3" />
              <span>Reset</span>
            </button>
          {/if}
        </div>
      </div>
    </section>

    <!-- FUNDS DIRECTORY DISPLAY -->
    {#if filteredCompanies.length > 0}
      {#if viewMode === 'grid'}
        <div class="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card md:grid-cols-2 md:divide-x lg:grid-cols-3">
          {#each filteredCompanies as company (company.slug)}
            <a
              href={resolve('/companies/[slug]', { slug: company.slug })}
              class="group flex flex-col justify-between gap-4 border-b border-border p-5 transition-colors hover:bg-secondary/35"
            >
              <div class="flex flex-col gap-3">
                <div class="flex items-start justify-between gap-3">
                  <div class="flex min-w-0 items-center gap-3">
                    <div class="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary/60 text-sm font-bold text-[#9966CB]">
                      {company.name.charAt(0)}
                    </div>
                    <div class="min-w-0">
                      <h2 class="truncate text-sm font-bold text-foreground transition-colors group-hover:text-[#9966CB]">
                        {company.name}
                      </h2>
                      <div class="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px] text-[#888888]">
                        <span class="font-bold text-foreground/80">
                          {countryLabel(company.hq_country)}
                        </span>
                        {#if company.industries && company.industries.length > 0}
                          <span>·</span>
                          <span class="truncate">{company.industries[1] ?? company.industries[0]}</span>
                        {/if}
                      </div>
                    </div>
                  </div>

                  {#if openJobCount(company) > 0}
                    <span class="shrink-0 rounded-md bg-[#9966CB]/12 px-2 py-0.5 text-[11px] font-bold tabular-nums text-[#9966CB]">
                      {openJobCount(company)} {openJobCount(company) === 1 ? 'role' : 'roles'}
                    </span>
                  {:else}
                    <span class="shrink-0 rounded-md border border-border px-2 py-0.5 text-[11px] text-[#888888]">
                      Monitored
                    </span>
                  {/if}
                </div>

                {#if company.tagline}
                  <p class="line-clamp-2 text-xs leading-relaxed text-[#888888]">
                    {company.tagline}
                  </p>
                {/if}
              </div>

              <div class="flex items-center justify-between border-t border-border/60 pt-3 text-[11px] font-bold text-[#888888] transition-colors group-hover:text-[#9966CB]">
                <span>View fund profile &amp; roles</span>
                <ArrowUpRight class="size-3.5" />
              </div>
            </a>
          {/each}
        </div>
      {:else}
        <div class="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
          <div class="hidden border-b border-border bg-secondary/50 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground lg:grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.9fr)_minmax(0,2fr)_minmax(0,0.8fr)_80px] lg:items-center lg:gap-4">
            <span>Venture Capital Firm</span>
            <span>Geography</span>
            <span>Investment Thesis</span>
            <span>Open Mandates</span>
            <span class="text-right">Dossier</span>
          </div>

          <div class="divide-y divide-border/60">
            {#each filteredCompanies as company (company.slug)}
              <a
                href={resolve('/companies/[slug]', { slug: company.slug })}
                class="group flex flex-col gap-2 px-5 py-3.5 transition-colors hover:bg-secondary/40 lg:grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.9fr)_minmax(0,2fr)_minmax(0,0.8fr)_80px] lg:items-center lg:gap-4"
              >
                <div class="flex min-w-0 items-center gap-3">
                  <div class="flex size-8 shrink-0 items-center justify-center rounded-md border border-[#9966CB]/25 bg-[#9966CB]/10 text-xs font-bold text-[#9966CB]">
                    {company.name.charAt(0)}
                  </div>
                  <span class="truncate text-sm font-semibold text-foreground group-hover:text-[#9966CB] transition-colors">
                    {company.name}
                  </span>
                </div>

                <span class="text-xs font-medium text-foreground/80">
                  {countryLabel(company.hq_country)}
                </span>

                <p class="truncate text-xs text-muted-foreground">
                  {company.tagline ?? 'Institutional venture capital investment firm.'}
                </p>

                <div>
                  {#if openJobCount(company) > 0}
                    <span class="rounded-md bg-[#9966CB]/12 border border-[#9966CB]/20 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-[#8652B8] dark:text-[#B68CE0]">
                      {openJobCount(company)} open
                    </span>
                  {:else}
                    <span class="text-[11px] text-muted-foreground">Monitored</span>
                  {/if}
                </div>

                <div class="flex justify-end">
                  <span class="inline-flex size-7 items-center justify-center rounded-md border border-border/60 bg-background text-muted-foreground group-hover:border-[#9966CB] group-hover:text-[#9966CB] transition-colors">
                    <ArrowUpRight class="size-3.5" />
                  </span>
                </div>
              </a>
            {/each}
          </div>
        </div>
      {/if}
    {:else}
      <div class="flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-12 text-center">
        <div class="flex size-11 items-center justify-center rounded-lg border border-border bg-secondary/50 text-[#9966CB]">
          <SlidersHorizontal class="size-5" />
        </div>
        <h2 class="text-lg font-bold text-foreground">No VC funds match your search</h2>
        <p class="max-w-md text-xs text-[#888888]">
          Try clearing your search or switching between India VCs and Global VCs to browse all {allCompanies.length} venture capital firms.
        </p>
        <button
          type="button"
          onclick={clearFilters}
          class="inline-flex h-9 items-center gap-2 rounded-lg bg-[#9966CB] px-4 text-xs font-bold text-white hover:bg-[#8652B8]"
        >
          Show all {allCompanies.length} VC funds
        </button>
      </div>
    {/if}
  </div>
</div>
