<script lang="ts">
  import { page } from '$app/state';
  import { resolve } from '$app/paths';
  import {
    Search,
    MapPin,
    Briefcase,
    Building2,
    ArrowUpRight,
    RefreshCw,
    MessageCircle,
    Plus,
    X,
    FileSpreadsheet,
    Globe,
  } from '@lucide/svelte';
  import Seo from '#lib/components/Seo.svelte';
  import { jsonLdScript, siteOrganizationJsonLd } from '#lib/seo.js';
  import type { Job } from '#lib/types.js';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let liveJobs = $state<Job[] | null>(null);
  let syncing = $state(false);
  let lastSyncedText = $state('');

  const jobs = $derived(liveJobs ?? data.jobs ?? []);
  const companies = $derived(data.companies ?? []);

  // Initialize filter state from URL query params
  let searchQuery = $state('');
  let selectedTrack = $state('all');
  let selectedGeo = $state('all');
  let selectedWorkMode = $state('all');
  let selectedFund = $state('all');
  let selectedSource = $state('all');
  let selectedCollection = $state('all');

  $effect(() => {
    const sp = page.url.searchParams;
    searchQuery = sp.get('q') ?? '';

    const trackParam = sp.get('track') ?? '';
    const catParam = sp.get('category') ?? '';
    if (trackParam) {
      selectedTrack = trackParam;
    } else if (catParam === 'finance') {
      selectedTrack = 'investment';
    } else if (catParam === 'operations') {
      selectedTrack = 'platform';
    } else if (catParam === 'product') {
      selectedTrack = 'portfolio';
    } else if (catParam === 'marketing' || catParam === 'recruiting') {
      selectedTrack = 'talent';
    } else {
      selectedTrack = 'all';
    }

    const countryParam = sp.get('countries') ?? '';
    const regionParam = sp.get('regions') ?? '';
    if (countryParam === 'in') {
      selectedGeo = 'india';
    } else if (countryParam || regionParam) {
      selectedGeo = 'global';
    } else {
      selectedGeo = 'all';
    }

    selectedWorkMode = sp.get('work_mode') || 'all';
    selectedFund = sp.get('company_slug') || 'all';
    selectedSource = sp.get('source') || 'all';
    selectedCollection = sp.get('collections') || 'all';
  });

  const filteredJobs = $derived.by(() => {
    const q = searchQuery.trim().toLowerCase();
    return jobs.filter((job) => {
      if (q) {
        const hay = `${job.title} ${job.company} ${job.location} ${job.skills.join(' ')} ${job.description}`.toLowerCase();
        const terms = q.split(/\s+/).filter(Boolean);
        if (!terms.every((t) => hay.includes(t))) return false;
      }

      if (selectedTrack !== 'all') {
        const cat = job.enrichment?.category ?? '';
        if (selectedTrack === 'investment' && cat !== 'finance') return false;
        if (selectedTrack === 'platform' && cat !== 'operations') return false;
        if (
          selectedTrack === 'portfolio' &&
          !['product', 'software_engineering', 'data_science'].includes(cat)
        )
          return false;
        if (
          selectedTrack === 'talent' &&
          !['recruiting', 'marketing', 'legal'].includes(cat)
        )
          return false;
      }

      if (selectedGeo === 'india' && !job.countries.includes('in')) return false;
      if (selectedGeo === 'global' && job.countries.includes('in') && job.countries.length === 1)
        return false;

      if (selectedWorkMode !== 'all' && job.work_mode !== selectedWorkMode) return false;
      if (selectedFund !== 'all' && job.company_slug !== selectedFund) return false;
      if (selectedSource !== 'all' && job.source !== selectedSource) return false;
      if (selectedCollection !== 'all' && !job.collections.includes(selectedCollection))
        return false;

      return true;
    });
  });

  const activeFiltersCount = $derived(
    (searchQuery.trim() ? 1 : 0) +
      (selectedTrack !== 'all' ? 1 : 0) +
      (selectedGeo !== 'all' ? 1 : 0) +
      (selectedWorkMode !== 'all' ? 1 : 0) +
      (selectedFund !== 'all' ? 1 : 0) +
      (selectedSource !== 'all' ? 1 : 0) +
      (selectedCollection !== 'all' ? 1 : 0),
  );

  function resetAllFilters() {
    searchQuery = '';
    selectedTrack = 'all';
    selectedGeo = 'all';
    selectedWorkMode = 'all';
    selectedFund = 'all';
    selectedSource = 'all';
    selectedCollection = 'all';
  }

  async function triggerLiveSync() {
    if (syncing) return;
    syncing = true;
    try {
      await fetch('/api/v1/vc-sync?force=1', { method: 'POST' });
      const res = await fetch('/api/v1/jobs?limit=500');
      if (res.ok) {
        const payload = await res.json();
        if (Array.isArray(payload.data)) {
          liveJobs = payload.data;
          lastSyncedText = 'Synced just now';
        }
      }
    } finally {
      syncing = false;
    }
  }

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

  const origin = $derived(page.url.origin);
  const canonical = $derived(`${origin}/jobs`);
  const jsonLd = $derived(jsonLdScript([siteOrganizationJsonLd(origin)]));
</script>

<Seo
  title="Open Venture Capital Roles ({jobs.length}) · VC Jobs"
  description="Browse live investment, platform, operations, and portfolio roles across 221 Indian and global venture capital funds, synced with Google Sheets and live ATS portals."
  {canonical}
/>

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- non-executable JSON-LD built by jsonLdScript -->
  {@html jsonLd}
</svelte:head>

<div class="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
  <!-- ===================================================================== -->
  <!-- PAGE HEADER WITH GOOGLE SHEET SYNC, POST A JOB & WHATSAPP UPDATES     -->
  <!-- ===================================================================== -->
  <header
    class="dot-grid relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8"
  >
    <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
      <div>
        <div class="inline-flex items-center gap-2 rounded-full bg-[#9966CB]/12 px-3 py-1">
          <span class="text-xs font-bold leading-none text-[#9966CB]">^</span>
          <span class="text-xs font-bold tracking-[0.12em] uppercase text-[#9966CB]">
            Open Roles Directory
          </span>
        </div>
        <h1 class="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
          Venture Capital Role Board
        </h1>
        <p class="mt-2 max-w-2xl text-sm font-normal leading-relaxed text-[#888888] sm:text-base">
          Showing <strong class="font-bold text-foreground">{filteredJobs.length}</strong> of
          <strong class="font-bold text-foreground">{jobs.length}</strong> live roles synced automatically
          from VC career portals (Greenhouse, Lever, Ashby, Workable, SmartRecruiters) and our live Google
          Sheet.
        </p>
      </div>

      <!-- Original Core Actions: Sync Google Sheet & ATS + Post a Job + WhatsApp Updates -->
      <div class="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onclick={triggerLiveSync}
          disabled={syncing}
          class="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-border bg-background px-4 text-xs font-bold text-foreground transition-colors hover:border-[#9966CB] hover:text-[#9966CB] disabled:opacity-60"
        >
          <RefreshCw class={['size-3.5 text-[#9966CB]', syncing && 'animate-spin']} />
          <span>{syncing ? 'Syncing Sheet & ATS...' : lastSyncedText || 'Sync Sheet & ATS'}</span>
        </button>

        <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- mailto link -->
        <a
          href="mailto:{data.postJobEmail}?subject=Post%20a%20VC%20job"
          class="inline-flex h-10 items-center gap-1.5 rounded-xl border border-border bg-background px-4 text-xs font-bold text-foreground transition-colors hover:border-[#9966CB] hover:text-[#9966CB]"
        >
          <Plus class="size-3.5" />
          <span>Post a job</span>
        </a>

        <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external WhatsApp link -->
        <a
          href={data.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#9966CB] px-4 text-xs font-bold text-white transition-opacity hover:opacity-90"
        >
          <MessageCircle class="size-3.5" />
          <span>Get job updates</span>
        </a>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- FILTER WORKBENCH                                                    -->
    <!-- =================================================================== -->
    <div class="mt-6 border-t border-border pt-6">
      <div class="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <!-- Search Input -->
        <div class="relative">
          <Search
            class="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#888888]"
          />
          <input
            type="search"
            bind:value={searchQuery}
            placeholder="Search role, skill, city, or VC fund..."
            aria-label="Search open roles"
            class="h-10 w-full rounded-xl border border-border bg-background pr-3 pl-10 text-sm font-normal text-foreground focus:border-[#9966CB] focus:outline-none"
          />
        </div>

        <!-- Geography Selector -->
        <select
          bind:value={selectedGeo}
          aria-label="Filter by geography"
          class="h-10 rounded-xl border border-border bg-background px-3 text-xs font-bold text-foreground focus:border-[#9966CB] focus:outline-none"
        >
          <option value="all">All Geographies ({jobs.length})</option>
          <option value="india">
            India VCs ({jobs.filter((j) => j.countries.includes('in')).length})
          </option>
          <option value="global">
            Global VCs ({jobs.filter((j) => !j.countries.includes('in') || j.countries.length > 1).length})
          </option>
        </select>

        <!-- VC Fund Selector -->
        <select
          bind:value={selectedFund}
          aria-label="Filter by VC fund"
          class="h-10 rounded-xl border border-border bg-background px-3 text-xs font-bold text-foreground focus:border-[#9966CB] focus:outline-none"
        >
          <option value="all">All Venture Funds ({companies.length})</option>
          {#each companies as c (c.slug)}
            <option value={c.slug}>
              {c.name} {c.job_count > 0 ? `(${c.job_count})` : ''}
            </option>
          {/each}
        </select>

        <!-- Source / Sync Channel Selector (Includes Google Sheet!) -->
        <select
          bind:value={selectedSource}
          aria-label="Filter by sync source"
          class="h-10 rounded-xl border border-border bg-background px-3 text-xs font-bold text-foreground focus:border-[#9966CB] focus:outline-none"
        >
          <option value="all">All Sync Sources</option>
          <option value="google_sheets">
            Google Sheet ({jobs.filter((j) => j.source === 'google_sheets').length})
          </option>
          <option value="consider">
            Peak XV / Lightspeed / BVP Live ({jobs.filter((j) => j.source === 'consider').length})
          </option>
          <option value="getro">
            3one4 / Accel / Antler Live ({jobs.filter((j) => j.source === 'getro').length})
          </option>
          <option value="zoho_recruit">
            Chiratae Zoho Live ({jobs.filter((j) => j.source === 'zoho_recruit').length})
          </option>
          <option value="greenhouse">
            Greenhouse Live ({jobs.filter((j) => j.source === 'greenhouse').length})
          </option>
          <option value="ashby">
            Ashby Live ({jobs.filter((j) => j.source === 'ashby').length})
          </option>
          <option value="lever">
            Lever Live ({jobs.filter((j) => j.source === 'lever').length})
          </option>
          <option value="smartrecruiters">
            SmartRecruiters Live ({jobs.filter((j) => j.source === 'smartrecruiters').length})
          </option>
          <option value="workable">
            Workable Live ({jobs.filter((j) => j.source === 'workable').length})
          </option>
        </select>
      </div>

      <!-- Track Pills & Work Mode Pills -->
      <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div class="flex flex-wrap items-center gap-1.5">
          {#each [
            { id: 'all', label: 'All Tracks' },
            { id: 'investment', label: 'Investment Team' },
            { id: 'platform', label: 'Platform & Ops' },
            { id: 'portfolio', label: 'Portfolio & EIR' },
            { id: 'talent', label: 'Talent & Brand' },
          ] as tab (tab.id)}
            <button
              type="button"
              onclick={() => (selectedTrack = tab.id)}
              class={[
                'cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors',
                selectedTrack === tab.id
                  ? 'bg-[#9966CB] text-white'
                  : 'border border-border bg-background text-[#888888] hover:border-[#9966CB] hover:text-foreground',
              ]}
            >
              {tab.label}
            </button>
          {/each}
        </div>

        <div class="flex flex-wrap items-center gap-1.5">
          {#each [
            { id: 'all', label: 'All Modes' },
            { id: 'onsite', label: 'On-site' },
            { id: 'hybrid', label: 'Hybrid' },
            { id: 'remote', label: 'Remote' },
          ] as mode (mode.id)}
            <button
              type="button"
              onclick={() => (selectedWorkMode = mode.id)}
              class={[
                'cursor-pointer rounded-full px-3 py-1 text-xs font-bold transition-colors',
                selectedWorkMode === mode.id
                  ? 'bg-[#1E1E1E] text-white dark:bg-white dark:text-[#1E1E1E]'
                  : 'border border-border bg-background text-[#888888] hover:border-[#9966CB] hover:text-foreground',
              ]}
            >
              {mode.label}
            </button>
          {/each}

          {#if activeFiltersCount > 0}
            <button
              type="button"
              onclick={resetAllFilters}
              class="inline-flex cursor-pointer items-center gap-1 rounded-full border border-[#9966CB]/40 bg-[#9966CB]/10 px-3 py-1 text-xs font-bold text-[#9966CB] hover:bg-[#9966CB]/20"
            >
              <X class="size-3" />
              <span>Clear filters ({activeFiltersCount})</span>
            </button>
          {/if}
        </div>
      </div>
    </div>
  </header>

  <!-- ===================================================================== -->
  <!-- ROLE LISTINGS                                                         -->
  <!-- ===================================================================== -->
  {#if filteredJobs.length === 0}
    <div class="mt-8 rounded-2xl border border-border bg-card p-12 text-center">
      <p class="text-lg font-bold text-foreground">No matching VC roles found</p>
      <p class="mx-auto mt-2 max-w-md text-sm font-normal text-[#888888]">
        Try clearing your active filters, or add a new role to the live Google Sheet or via email.
      </p>
      <div class="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onclick={resetAllFilters}
          class="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[#9966CB] px-5 text-xs font-bold text-white"
        >
          Reset all filters
        </button>
        <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- mailto link -->
        <a
          href="mailto:{data.postJobEmail}?subject=Post%20a%20VC%20job"
          class="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-background px-5 text-xs font-bold text-foreground hover:border-[#9966CB]"
        >
          <Plus class="size-3.5" />
          Post a job
        </a>
      </div>
    </div>
  {:else}
    <div class="mt-6 grid gap-4">
      {#each filteredJobs as job (job.public_slug)}
        <article
          class="group flex flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-[#9966CB] sm:flex-row sm:items-center sm:p-6"
        >
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <span
                class="rounded-full bg-[#9966CB]/12 px-2.5 py-0.5 text-[11px] font-bold text-[#9966CB]"
              >
                {formatTrackBadge(job.enrichment?.category)}
              </span>

              <span
                class="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-[11px] font-normal text-[#888888]"
              >
                {#if job.source === 'google_sheets'}
                  <FileSpreadsheet class="size-3 text-[#9966CB]" />
                {:else}
                  <Globe class="size-3 text-[#9966CB]" />
                {/if}
                {formatSourceLabel(job.source)}
              </span>

              {#if job.posted_at}
                <span class="text-[11px] font-normal text-[#888888]">
                  Posted {job.posted_at.slice(0, 10)}
                </span>
              {/if}
            </div>

            <h2 class="mt-2.5 text-lg font-bold text-foreground group-hover:text-[#9966CB]">
              <a href={resolve('/jobs/[slug]', { slug: job.public_slug })} class="hover:underline">
                {job.title}
              </a>
            </h2>

            <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-normal text-[#888888]">
              <a
                href={resolve('/companies/[slug]', { slug: job.company_slug })}
                class="inline-flex items-center gap-1.5 font-bold text-foreground hover:text-[#9966CB]"
              >
                <Building2 class="size-3.5 text-[#9966CB]" />
                {job.company}
              </a>
              <span class="inline-flex items-center gap-1">
                <MapPin class="size-3.5" />
                {job.location}
              </span>
              <span class="inline-flex items-center gap-1">
                <Briefcase class="size-3.5" />
                {formatWorkMode(job.work_mode)}
              </span>
            </div>

            {#if job.enrichment?.summary}
              <p class="mt-2.5 line-clamp-2 max-w-3xl text-xs font-normal leading-relaxed text-[#888888]">
                {job.enrichment.summary}
              </p>
            {/if}

            {#if job.skills?.length > 0}
              <div class="mt-3 flex flex-wrap gap-1.5">
                {#each job.skills.slice(0, 5) as skill (skill)}
                  <span
                    class="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-normal text-[#888888]"
                  >
                    {skill}
                  </span>
                {/each}
              </div>
            {/if}
          </div>

          <div class="flex shrink-0 items-center gap-2.5 sm:flex-col sm:items-end">
            <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external ATS apply link -->
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#9966CB] px-4 text-xs font-bold text-white transition-opacity hover:opacity-90"
            >
              <span>Apply Now</span>
              <ArrowUpRight class="size-3.5" />
            </a>
            <a
              href={resolve('/jobs/[slug]', { slug: job.public_slug })}
              class="inline-flex h-9 items-center justify-center rounded-xl border border-border px-3.5 text-xs font-bold text-foreground transition-colors hover:border-[#9966CB] hover:text-[#9966CB]"
            >
              Role details
            </a>
          </div>
        </article>
      {/each}
    </div>
  {/if}
</div>
