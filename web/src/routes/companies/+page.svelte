<script lang="ts">
  import { page } from '$app/state';
  import { resolve } from '$app/paths';
  import { ArrowRight, Building2, Globe, Search, Sparkles, X } from '@lucide/svelte';
  import Seo from '#lib/components/Seo.svelte';
  import {
    breadcrumbJsonLd,
    collectionPageJsonLd,
    companiesPageTitle,
    companyListItems,
    jsonLdScript,
    listingRobots,
  } from '#lib/seo.js';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const origin = $derived(page.url.origin);
  const canonical = $derived(
    data.pageNumber > 1 ? `${origin}/companies?page=${data.pageNumber}` : `${origin}/companies`,
  );
  const description =
    'Explore 220+ Venture Capital firms across India, the United States, UK, Europe, Singapore, MENA, and APAC — monitored automatically by VC Jobs.';
  const robots = $derived(listingRobots(data.initial.total));
  const title = $derived(
    data.pageNumber > 1
      ? `Venture Capital Funds — page ${data.pageNumber} · VC Jobs`
      : companiesPageTitle(data.initial.total),
  );
  const jsonLd = $derived(
    jsonLdScript([
      collectionPageJsonLd(
        'Venture capital funds directory',
        description,
        canonical,
        companyListItems(data.initial.items, origin),
      ),
      breadcrumbJsonLd([
        { name: 'VC Jobs', url: `${origin}/` },
        { name: 'VC Funds', url: canonical },
      ]),
    ]),
  );

  let searchQuery = $state('');
  let selectedRegion = $state<'all' | 'india' | 'us' | 'eu' | 'apac' | 'mena'>('all');
  let selectedStage = $state<'all' | 'tier-1-vc' | 'seed-vc' | 'growth' | 'deeptech' | 'climate' | 'consumer'>('all');
  let hiringOnly = $state(false);

  const allCompanies = $derived(data.initial.items ?? []);
  const indiaCount = $derived(allCompanies.filter((c) => c.hq_country === 'in').length);
  const usCount = $derived(allCompanies.filter((c) => c.hq_country === 'us').length);
  const euCount = $derived(
    allCompanies.filter((c) => ['gb', 'de', 'fr', 'se', 'ch', 'nl', 'at'].includes(c.hq_country ?? '')).length,
  );
  const apacCount = $derived(
    allCompanies.filter((c) => ['sg', 'jp', 'au', 'hk'].includes(c.hq_country ?? '')).length,
  );
  const menaCount = $derived(
    allCompanies.filter((c) => ['ae', 'sa', 'il'].includes(c.hq_country ?? '')).length,
  );
  const hiringCount = $derived(allCompanies.filter((c) => c.job_count > 0).length);

  const filteredCompanies = $derived.by(() => {
    const q = searchQuery.trim().toLowerCase();
    return allCompanies.filter((c) => {
      if (hiringOnly && c.job_count === 0) return false;

      if (selectedRegion === 'india' && c.hq_country !== 'in') return false;
      if (selectedRegion === 'us' && c.hq_country !== 'us') return false;
      if (
        selectedRegion === 'eu' &&
        !['gb', 'de', 'fr', 'se', 'ch', 'nl', 'at'].includes(c.hq_country ?? '')
      )
        return false;
      if (selectedRegion === 'apac' && !['sg', 'jp', 'au', 'hk'].includes(c.hq_country ?? '')) return false;
      if (selectedRegion === 'mena' && !['ae', 'sa', 'il'].includes(c.hq_country ?? '')) return false;

      if (selectedStage !== 'all') {
        const hay = `${(c.collections ?? []).join(' ')} ${(c.industries ?? []).join(' ')} ${c.tagline ?? ''}`.toLowerCase();
        if (selectedStage === 'tier-1-vc' && !(c.collections ?? []).includes('tier-1-vc') && !/multi-stage|seed to growth/i.test(hay))
          return false;
        if (selectedStage === 'seed-vc' && !(c.collections ?? []).includes('seed-vc') && !/seed|pre-seed|micro-vc|day-zero/i.test(hay))
          return false;
        if (selectedStage === 'growth' && !/growth|venture debt|late|crossover|series b/i.test(hay))
          return false;
        if (selectedStage === 'deeptech' && !/ai|deeptech|deep tech|frontier|quantum|spacetech|cyber|ml/i.test(hay))
          return false;
        if (selectedStage === 'climate' && !/climate|sustainability|energy|agritech|impact/i.test(hay))
          return false;
        if (selectedStage === 'consumer' && !/consumer|d2c|health|bio|gaming|brand/i.test(hay))
          return false;
      }

      if (q) {
        const hay = `${c.name} ${c.tagline ?? ''} ${(c.industries ?? []).join(' ')} ${c.hq_country ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  });

  function resetDirectoryFilters() {
    searchQuery = '';
    selectedRegion = 'all';
    selectedStage = 'all';
    hiringOnly = false;
  }

  function formatCountryBadge(code: string | null | undefined): string {
    switch (code) {
      case 'in':
        return 'India';
      case 'us':
        return 'United States';
      case 'gb':
        return 'United Kingdom';
      case 'de':
        return 'Germany / Europe';
      case 'fr':
        return 'France / Europe';
      case 'se':
        return 'Nordics / Europe';
      case 'sg':
        return 'Singapore / APAC';
      case 'ae':
        return 'UAE / MENA';
      default:
        return code ? code.toUpperCase() : 'Global';
    }
  }
</script>

<Seo {title} {description} {canonical} {robots} />

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- non-executable JSON-LD built by jsonLdScript -->
  {@html jsonLd}
</svelte:head>

<div class="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
  <!-- Header Banner -->
  <div class="rounded-3xl border border-border bg-card p-6 sm:p-10">
    <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
      <div>
        <div class="inline-flex items-center gap-2 rounded-full border border-[#9966CB]/35 bg-[#9966CB]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#9966CB]">
          <span>^</span>
          Global &amp; India VC Index
        </div>
        <h1 class="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Venture Capital Firms Directory ({allCompanies.length} VCs)
        </h1>
        <p class="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Complete directory of <strong class="text-foreground">{indiaCount} Indian VC funds</strong> and
          <strong class="text-foreground">{allCompanies.length - indiaCount} Global VC firms</strong> across Silicon Valley, New York, London, Berlin, Paris, Stockholm, Singapore, Dubai, Riyadh, and APAC — monitored automatically for investment, platform, and operations roles.
        </p>
      </div>

      <!-- Summary Stat Pills -->
      <div class="grid grid-cols-3 gap-3 sm:flex sm:items-center">
        <div class="rounded-2xl border border-border bg-background px-4 py-3 text-center">
          <p class="text-xl font-bold text-foreground sm:text-2xl">{allCompanies.length}</p>
          <p class="text-[11px] font-bold uppercase tracking-wider text-[#9966CB]">Total VCs</p>
        </div>
        <div class="rounded-2xl border border-border bg-background px-4 py-3 text-center">
          <p class="text-xl font-bold text-foreground sm:text-2xl">{indiaCount}</p>
          <p class="text-[11px] font-bold uppercase tracking-wider text-[#9966CB]">India VCs</p>
        </div>
        <div class="rounded-2xl border border-border bg-background px-4 py-3 text-center">
          <p class="text-xl font-bold text-foreground sm:text-2xl">{allCompanies.length - indiaCount}</p>
          <p class="text-[11px] font-bold uppercase tracking-wider text-[#9966CB]">Global VCs</p>
        </div>
      </div>
    </div>

    <!-- Search + Filter Controls -->
    <div class="mt-8 flex flex-col gap-4 border-t border-border pt-6">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div class="relative flex-1">
          <Search class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            bind:value={searchQuery}
            placeholder="Search all {allCompanies.length} VC firms by name (e.g. Peak XV, Sequoia, Accel, a16z, Blume, Lightspeed), thesis, or stage..."
            aria-label="Search VC funds"
            class="h-11 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#9966CB] focus:outline-none focus:ring-2 focus:ring-[#9966CB]/20"
          />
        </div>

        <button
          type="button"
          onclick={() => (hiringOnly = !hiringOnly)}
          class={[
            'inline-flex h-11 shrink-0 items-center gap-2 rounded-xl border px-4 text-xs font-bold transition-colors',
            hiringOnly
              ? 'border-[#9966CB] bg-[#9966CB] text-white'
              : 'border-border bg-background text-muted-foreground hover:border-[#9966CB] hover:text-foreground',
          ]}
        >
          <Sparkles class="size-3.5" />
          Actively Hiring ({hiringCount})
        </button>

        {#if searchQuery || selectedRegion !== 'all' || selectedStage !== 'all' || hiringOnly}
          <button
            type="button"
            onclick={resetDirectoryFilters}
            class="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl border border-border bg-background px-4 text-xs font-bold text-muted-foreground hover:border-[#9966CB] hover:text-foreground"
          >
            <X class="size-3.5" />
            Reset
          </button>
        {/if}
      </div>

      <!-- Region Filter Pills -->
      <div class="flex flex-wrap items-center gap-2">
        <span class="mr-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Region:</span>
        <button
          type="button"
          onclick={() => (selectedRegion = 'all')}
          class={[
            'rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors',
            selectedRegion === 'all'
              ? 'bg-[#9966CB] text-white'
              : 'border border-border bg-background text-muted-foreground hover:text-foreground',
          ]}
        >
          All World ({allCompanies.length})
        </button>
        <button
          type="button"
          onclick={() => (selectedRegion = 'india')}
          class={[
            'rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors',
            selectedRegion === 'india'
              ? 'bg-[#9966CB] text-white'
              : 'border border-border bg-background text-muted-foreground hover:text-foreground',
          ]}
        >
          India ({indiaCount})
        </button>
        <button
          type="button"
          onclick={() => (selectedRegion = 'us')}
          class={[
            'rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors',
            selectedRegion === 'us'
              ? 'bg-[#9966CB] text-white'
              : 'border border-border bg-background text-muted-foreground hover:text-foreground',
          ]}
        >
          USA &amp; Americas ({usCount})
        </button>
        <button
          type="button"
          onclick={() => (selectedRegion = 'eu')}
          class={[
            'rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors',
            selectedRegion === 'eu'
              ? 'bg-[#9966CB] text-white'
              : 'border border-border bg-background text-muted-foreground hover:text-foreground',
          ]}
        >
          UK &amp; Europe ({euCount})
        </button>
        <button
          type="button"
          onclick={() => (selectedRegion = 'apac')}
          class={[
            'rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors',
            selectedRegion === 'apac'
              ? 'bg-[#9966CB] text-white'
              : 'border border-border bg-background text-muted-foreground hover:text-foreground',
          ]}
        >
          Singapore &amp; APAC ({apacCount})
        </button>
        <button
          type="button"
          onclick={() => (selectedRegion = 'mena')}
          class={[
            'rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors',
            selectedRegion === 'mena'
              ? 'bg-[#9966CB] text-white'
              : 'border border-border bg-background text-muted-foreground hover:text-foreground',
          ]}
        >
          MENA &amp; Dubai ({menaCount})
        </button>
      </div>

      <!-- Stage / Focus Pills -->
      <div class="flex flex-wrap items-center gap-2">
        <span class="mr-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Focus:</span>
        {#each [
          { id: 'all', label: 'All Stages & Sectors' },
          { id: 'tier-1-vc', label: 'Tier-1 & Multi-Stage' },
          { id: 'seed-vc', label: 'Pre-Seed & Seed' },
          { id: 'growth', label: 'Growth & Venture Debt' },
          { id: 'deeptech', label: 'AI & DeepTech' },
          { id: 'climate', label: 'Climate & Impact' },
          { id: 'consumer', label: 'Consumer & Health' },
        ] as st (st.id)}
          <button
            type="button"
            onclick={() => (selectedStage = st.id as typeof selectedStage)}
            class={[
              'rounded-lg border px-3 py-1 text-xs font-bold transition-colors',
              selectedStage === st.id
                ? 'border-foreground bg-foreground text-background'
                : 'border-border bg-background text-muted-foreground hover:border-[#9966CB] hover:text-foreground',
            ]}
          >
            {st.label}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <!-- Results Count Bar -->
  <div class="mt-6 flex items-center justify-between text-xs font-bold text-muted-foreground">
    <span>Showing {filteredCompanies.length} of {allCompanies.length} Venture Capital Firms</span>
    <span>Auto-monitored via Greenhouse, Lever, Ashby, Workable &amp; Google Sheets</span>
  </div>

  <!-- VC Companies Grid -->
  {#if filteredCompanies.length === 0}
    <div class="mt-6 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card py-16 text-center">
      <Building2 class="size-8 text-[#9966CB]" />
      <p class="text-base font-bold text-foreground">No VC firms match your current filter.</p>
      <button
        type="button"
        onclick={resetDirectoryFilters}
        class="mt-1 inline-flex h-9 items-center rounded-lg bg-[#9966CB] px-5 text-xs font-bold text-white"
      >
        Show all {allCompanies.length} VC firms
      </button>
    </div>
  {:else}
    <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {#each filteredCompanies as company (company.slug)}
        <a
          href={resolve('/companies/[slug]', { slug: company.slug })}
          class="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-all hover:border-[#9966CB] hover:shadow-md"
        >
          <div>
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-3">
                <div class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#1E1E1E] text-base font-bold text-white dark:bg-[#9966CB]">
                  {company.name.charAt(0)}
                </div>
                <div>
                  <h2 class="text-base font-bold tracking-tight text-foreground group-hover:text-[#9966CB]">
                    {company.name}
                  </h2>
                  <p class="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Globe class="size-3 text-[#9966CB]" />
                    {formatCountryBadge(company.hq_country)}
                  </p>
                </div>
              </div>

              {#if company.job_count > 0}
                <span class="shrink-0 rounded-full border border-[#9966CB]/35 bg-[#9966CB]/12 px-2.5 py-0.5 text-xs font-bold text-[#9966CB]">
                  {company.job_count} {company.job_count === 1 ? 'role' : 'roles'}
                </span>
              {/if}
            </div>

            {#if company.tagline}
              <p class="mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {company.tagline}
              </p>
            {/if}

            {#if company.industries && company.industries.length > 0}
              <div class="mt-3.5 flex flex-wrap gap-1.5">
                {#each company.industries as ind (ind)}
                  <span class="rounded-md border border-border bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {ind}
                  </span>
                {/each}
              </div>
            {/if}
          </div>

          <div class="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs font-bold">
            <span class="text-[#9966CB] group-hover:underline">
              {company.job_count > 0 ? `View ${company.job_count} open roles` : 'View fund profile'}
            </span>
            <ArrowRight class="size-3.5 text-[#9966CB] transition-transform group-hover:translate-x-0.5" />
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>
