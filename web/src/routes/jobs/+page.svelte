<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import {
    Search,
    MapPin,
    Building2,
    Briefcase,
    ArrowUpRight,
    SlidersHorizontal,
    X,
    MessageCircle,
    Plus,
    RefreshCw,
    LayoutList,
    LayoutGrid,
    CheckCircle2,
  } from '@lucide/svelte';
  import type { PageData } from './$types';
  import type { Job } from '#lib/types.js';

  let { data }: { data: PageData } = $props();

  let searchInput = $state(page.url.searchParams.get('q') ?? '');
  let selectedCategory = $state(page.url.searchParams.get('category') ?? '');
  let selectedCountry = $state(page.url.searchParams.get('countries') ?? '');
  let selectedRegion = $state(page.url.searchParams.get('regions') ?? '');
  let selectedWorkMode = $state(page.url.searchParams.get('work_mode') ?? '');
  let selectedCompany = $state(page.url.searchParams.get('company_slug') ?? '');
  let selectedSource = $state(page.url.searchParams.get('source') ?? '');
  let selectedCollection = $state(page.url.searchParams.get('collections') ?? '');
  let viewMode = $state<'ledger' | 'cards'>('ledger');

  let whatsappUrl = $state('https://chat.whatsapp.com/E7r0xi9u1qOE9v0YjbHcpM?s=cl&p=i&mlu=4');
  let postJobEmail = $state('Ozadhanvi99@gmail.com');
  let liveFetchedJobs = $state<Job[] | null>(null);
  let syncing = $state(false);
  let lastSyncedLabel = $state('Live auto-sync (5m)');

  async function refreshJobsFromApi(force = false) {
    syncing = true;
    try {
      if (force) {
        await fetch('/api/v1/vc-sync?force=1', { method: 'POST' });
      }
      const [settingsRes, jobsRes] = await Promise.all([
        fetch('/api/v1/vc-settings'),
        fetch('/api/v1/jobs?limit=500'),
      ]);
      if (settingsRes.ok) {
        const s = await settingsRes.json();
        if (s.whatsapp_url) whatsappUrl = s.whatsapp_url;
        if (s.post_job_email) postJobEmail = s.post_job_email;
      }
      if (jobsRes.ok) {
        const j = await jobsRes.json();
        if (Array.isArray(j.data)) {
          liveFetchedJobs = j.data;
          lastSyncedLabel = force ? 'Synced just now' : 'Live auto-sync (5m)';
        }
      }
    } catch {
      // Retain SSR jobs
    } finally {
      syncing = false;
    }
  }

  onMount(() => {
    void refreshJobsFromApi(false);
  });

  $effect(() => {
    searchInput = page.url.searchParams.get('q') ?? '';
    selectedCategory = page.url.searchParams.get('category') ?? '';
    selectedCountry = page.url.searchParams.get('countries') ?? '';
    selectedRegion = page.url.searchParams.get('regions') ?? '';
    selectedWorkMode = page.url.searchParams.get('work_mode') ?? '';
    selectedCompany = page.url.searchParams.get('company_slug') ?? '';
    selectedSource = page.url.searchParams.get('source') ?? '';
    selectedCollection = page.url.searchParams.get('collections') ?? '';
  });

  const allJobs = $derived<Job[]>(
    liveFetchedJobs && liveFetchedJobs.length > 0 ? liveFetchedJobs : (data.jobs ?? []),
  );

  const uniqueFundsInJobs = $derived.by(() => {
    const map = new Map<string, { slug: string; name: string; count: number }>();
    for (const j of allJobs) {
      const slug = j.company_slug || j.company.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const existing = map.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(slug, { slug, name: j.company, count: 1 });
      }
    }
    return Array.from(map.values()).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  });

  const filteredJobs = $derived.by(() => {
    const q = searchInput.trim().toLowerCase();
    const cat = selectedCategory.trim().toLowerCase();
    const country = selectedCountry.trim().toLowerCase();
    const region = selectedRegion.trim().toLowerCase();
    const mode = selectedWorkMode.trim().toLowerCase();
    const comp = selectedCompany.trim().toLowerCase();
    const src = selectedSource.trim().toLowerCase();
    const col = selectedCollection.trim().toLowerCase();

    return allJobs.filter((job) => {
      if (q) {
        const hay = `${job.title} ${job.company} ${job.location} ${job.enrichment?.category ?? ''} ${(job.skills ?? []).join(' ')} ${job.description ?? ''}`.toLowerCase();
        const terms = q.split(/\s+/).filter(Boolean);
        if (!terms.every((t) => hay.includes(t))) return false;
      }
      if (cat && (job.enrichment?.category ?? '').toLowerCase() !== cat) {
        return false;
      }
      if (country && !(job.countries ?? []).some((c) => c.toLowerCase() === country)) {
        return false;
      }
      if (region && !(job.regions ?? []).some((r) => r.toLowerCase() === region)) {
        return false;
      }
      if (mode && (job.work_mode ?? '').toLowerCase() !== mode) {
        return false;
      }
      if (comp && (job.company_slug ?? '').toLowerCase() !== comp) {
        return false;
      }
      if (src && (job.source ?? '').toLowerCase() !== src) {
        return false;
      }
      if (col && !(job.collections ?? []).some((c) => c.toLowerCase() === col)) {
        return false;
      }
      return true;
    });
  });

  const hasFilters = $derived(
    Boolean(
      searchInput.trim() ||
        selectedCategory ||
        selectedCountry ||
        selectedRegion ||
        selectedWorkMode ||
        selectedCompany ||
        selectedSource ||
        selectedCollection,
    ),
  );

  function syncUrl() {
    const next = new URLSearchParams();
    if (searchInput.trim()) next.set('q', searchInput.trim());
    if (selectedCategory) next.set('category', selectedCategory);
    if (selectedCountry) next.set('countries', selectedCountry);
    if (selectedRegion) next.set('regions', selectedRegion);
    if (selectedWorkMode) next.set('work_mode', selectedWorkMode);
    if (selectedCompany) next.set('company_slug', selectedCompany);
    if (selectedSource) next.set('source', selectedSource);
    if (selectedCollection) next.set('collections', selectedCollection);
    const qs = next.toString();
    // eslint-disable-next-line svelte/no-navigation-without-resolve -- query string update on /jobs
    void goto(qs ? `${resolve('/jobs')}?${qs}` : resolve('/jobs'), {
      replaceState: true,
    });
  }

  function clearFilters() {
    searchInput = '';
    selectedCategory = '';
    selectedCountry = '';
    selectedRegion = '';
    selectedWorkMode = '';
    selectedCompany = '';
    selectedSource = '';
    selectedCollection = '';
    // eslint-disable-next-line svelte/no-navigation-without-resolve -- resolved above
    void goto(resolve('/jobs'), { replaceState: true });
  }

  const categories = [
    { id: '', label: 'All Tracks' },
    { id: 'finance', label: 'Investment Team' },
    { id: 'operations', label: 'Platform & Ops' },
    { id: 'product', label: 'Portfolio & EIR' },
    { id: 'marketing', label: 'Marketing & IR' },
    { id: 'recruiting', label: 'Talent & HR' },
  ];

  const workModes = [
    { id: '', label: 'All Modes' },
    { id: 'onsite', label: 'On-site' },
    { id: 'hybrid', label: 'Hybrid' },
    { id: 'remote', label: 'Remote' },
  ];

  function formatTrackLabel(category?: string | null): string {
    switch ((category ?? '').toLowerCase()) {
      case 'finance':
        return 'Investment Team';
      case 'operations':
        return 'Platform & Ops';
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

  function formatSourceLabel(source?: string | null): string {
    switch ((source ?? '').toLowerCase()) {
      case 'google_sheets':
        return 'Sheet Sync';
      case 'getro':
        return 'Getro';
      case 'consider':
        return 'Consider';
      case 'greenhouse':
        return 'Greenhouse';
      case 'lever':
        return 'Lever';
      case 'ashby':
        return 'Ashby';
      case 'workable':
        return 'Workable';
      case 'smartrecruiters':
        return 'SmartRecruiters';
      case 'zoho_recruit':
        return 'Zoho Recruit';
      default:
        return 'Verified ATS';
    }
  }

  function formatDateShort(iso?: string | null): string {
    if (!iso) return 'Recent';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return 'Recent';
    }
  }
</script>

<svelte:head>
  <title>Open Venture Capital Roles ({filteredJobs.length}) — VC Jobs</title>
  <meta
    name="description"
    content="Browse verified open roles across India and global venture capital firms: Analyst, Associate, Principal, Platform, Operations, and Founders' Office."
  />
</svelte:head>

<div class="flex flex-col">
  <!-- PAGE HEADER -->
  <section class="vc-caret-light border-b border-border bg-card">
    <div class="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <div class="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <span class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9966CB]">
              Open Roles Directory
            </span>
            <span class="inline-flex items-center gap-1 text-xs text-[#888888]">
              · <CheckCircle2 class="size-3.5 text-emerald-500" /> {lastSyncedLabel}
            </span>
          </div>
          <h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Venture Capital Mandates
          </h1>
          <p class="max-w-2xl text-sm text-[#888888]">
            Showing <strong class="font-bold text-foreground">{filteredJobs.length}</strong> matching roles across
            <strong class="font-bold text-foreground">{allJobs.length}</strong> live openings from
            <strong class="font-bold text-foreground">{uniqueFundsInJobs.length}</strong> actively hiring venture capital funds.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onclick={() => refreshJobsFromApi(true)}
            disabled={syncing}
            class="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 text-xs font-bold text-foreground transition-colors hover:border-[#9966CB] hover:text-[#9966CB] disabled:opacity-50"
          >
            <RefreshCw class={['size-3.5 text-[#9966CB]', syncing && 'animate-spin']} />
            <span>{syncing ? 'Syncing...' : 'Sync Sheet & ATS'}</span>
          </button>

          <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- mailto link -->
          <a
            href="mailto:{postJobEmail}?subject=Post%20a%20VC%20job"
            class="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 text-xs font-bold text-foreground transition-colors hover:border-[#9966CB] hover:text-[#9966CB]"
          >
            <Plus class="size-3.5" />
            <span>Post a job</span>
          </a>

          <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external WhatsApp link -->
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#9966CB] px-4 text-xs font-bold text-white transition-colors hover:bg-[#8652B8]"
          >
            <MessageCircle class="size-3.5" />
            <span>Get job updates</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- WORKSPACE BODY -->
  <div class="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10">
    <!-- UNIFIED FILTER & SEARCH WORKBENCH -->
    <section
      aria-label="Role filters"
      class="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:p-5"
    >
      <!-- Row 1: Search + Structured Selects -->
      <div class="grid grid-cols-1 gap-2.5 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div class="relative">
          <Search class="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#888888]" />
          <input
            type="search"
            bind:value={searchInput}
            oninput={syncUrl}
            placeholder="Search role title, VC fund, skill, or city..."
            aria-label="Filter VC jobs by keyword"
            class="h-10 w-full rounded-lg border border-border bg-background pr-4 pl-10 text-sm text-foreground placeholder:text-[#888888] focus:border-[#9966CB] focus:outline-none focus:ring-2 focus:ring-[#9966CB]/20"
          />
        </div>

        <select
          aria-label="Filter by Geography"
          value={selectedCountry || (selectedRegion ? `region:${selectedRegion}` : '')}
          onchange={(e) => {
            const val = (e.currentTarget as HTMLSelectElement).value;
            if (val.startsWith('region:')) {
              selectedCountry = '';
              selectedRegion = val.replace('region:', '');
            } else {
              selectedRegion = '';
              selectedCountry = val;
            }
            syncUrl();
          }}
          class="h-10 rounded-lg border border-border bg-background px-3 text-xs font-bold text-foreground focus:border-[#9966CB] focus:outline-none"
        >
          <option value="">All Geographies</option>
          <option value="in">India (Bengaluru / Mumbai / NCR)</option>
          <option value="us">United States (SF / NYC / Boston)</option>
          <option value="gb">United Kingdom (London)</option>
          <option value="sg">Singapore</option>
          <option value="region:eu">Europe</option>
          <option value="region:apac">APAC</option>
        </select>

        <select
          aria-label="Filter by Venture Fund"
          bind:value={selectedCompany}
          onchange={syncUrl}
          class="h-10 rounded-lg border border-border bg-background px-3 text-xs font-bold text-foreground focus:border-[#9966CB] focus:outline-none"
        >
          <option value="">All Hiring Funds ({uniqueFundsInJobs.length})</option>
          {#each uniqueFundsInJobs as fund (fund.slug)}
            <option value={fund.slug}>{fund.name} ({fund.count})</option>
          {/each}
        </select>

        <select
          aria-label="Filter by Sync Source"
          bind:value={selectedSource}
          onchange={syncUrl}
          class="h-10 rounded-lg border border-border bg-background px-3 text-xs font-bold text-foreground focus:border-[#9966CB] focus:outline-none"
        >
          <option value="">All Sync Sources</option>
          <option value="google_sheets">Curated Google Sheet</option>
          <option value="greenhouse">Greenhouse ATS</option>
          <option value="getro">Getro VC Portals</option>
          <option value="consider">Consider VC Portals</option>
          <option value="lever">Lever ATS</option>
          <option value="ashby">Ashby ATS</option>
          <option value="workable">Workable ATS</option>
        </select>
      </div>

      <!-- Row 2: Track Tabs, Work Mode Pills & View Toggle -->
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3.5">
        <div class="flex flex-wrap items-center gap-1.5">
          {#each categories as cat (cat.id)}
            <button
              type="button"
              onclick={() => {
                selectedCategory = cat.id;
                syncUrl();
              }}
              class={[
                'rounded-md px-3 py-1.5 text-xs font-bold transition-colors',
                selectedCategory === cat.id
                  ? 'bg-[#9966CB] text-white'
                  : 'border border-border bg-background text-[#888888] hover:border-[#9966CB]/50 hover:text-foreground',
              ]}
            >
              {cat.label}
            </button>
          {/each}
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <!-- Work Mode Segmented Group -->
          <div class="inline-flex items-center gap-0.5 rounded-lg border border-border bg-background p-0.5">
            {#each workModes as mode (mode.id)}
              <button
                type="button"
                onclick={() => {
                  selectedWorkMode = mode.id;
                  syncUrl();
                }}
                class={[
                  'rounded-md px-2.5 py-1 text-xs font-bold transition-colors',
                  selectedWorkMode === mode.id
                    ? 'bg-[#1E1E1E] text-white dark:bg-white dark:text-[#1E1E1E]'
                    : 'text-[#888888] hover:text-foreground',
                ]}
              >
                {mode.label}
              </button>
            {/each}
          </div>

          <!-- View Mode Toggle -->
          <div class="hidden items-center gap-0.5 rounded-lg border border-border bg-background p-0.5 sm:inline-flex">
            <button
              type="button"
              onclick={() => (viewMode = 'ledger')}
              aria-label="Ledger table view"
              title="Ledger view"
              class={[
                'inline-flex size-7 items-center justify-center rounded-md transition-colors',
                viewMode === 'ledger'
                  ? 'bg-[#9966CB] text-white'
                  : 'text-[#888888] hover:text-foreground',
              ]}
            >
              <LayoutList class="size-3.5" />
            </button>
            <button
              type="button"
              onclick={() => (viewMode = 'cards')}
              aria-label="Detailed card view"
              title="Detailed view"
              class={[
                'inline-flex size-7 items-center justify-center rounded-md transition-colors',
                viewMode === 'cards'
                  ? 'bg-[#9966CB] text-white'
                  : 'text-[#888888] hover:text-foreground',
              ]}
            >
              <LayoutGrid class="size-3.5" />
            </button>
          </div>

          {#if hasFilters}
            <button
              type="button"
              onclick={clearFilters}
              class="inline-flex h-8 items-center gap-1 rounded-lg border border-[#9966CB]/40 bg-[#9966CB]/10 px-3 text-xs font-bold text-[#9966CB] transition-colors hover:bg-[#9966CB]/20"
            >
              <X class="size-3.5" />
              <span>Reset</span>
            </button>
          {/if}
        </div>
      </div>
    </section>

    <!-- RESULTS LEDGER / GRID -->
    {#if filteredJobs.length > 0}
      {#if viewMode === 'ledger'}
        <div class="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
          <!-- Table Header -->
          <div class="hidden border-b border-border bg-secondary/50 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground lg:grid lg:grid-cols-[minmax(0,2.3fr)_minmax(0,1.35fr)_minmax(0,1.25fr)_minmax(0,1.1fr)_160px] lg:items-center lg:gap-4">
            <span>Role &amp; Focus</span>
            <span>Venture Fund</span>
            <span>Location &amp; Work Mode</span>
            <span>Track &amp; Source</span>
            <span class="text-right">Actions</span>
          </div>

          <div class="divide-y divide-border/60">
            {#each filteredJobs as job (job.public_slug)}
              <article class="group px-4 py-3.5 transition-colors hover:bg-secondary/40 sm:px-5 lg:grid lg:grid-cols-[minmax(0,2.3fr)_minmax(0,1.35fr)_minmax(0,1.25fr)_minmax(0,1.1fr)_160px] lg:items-center lg:gap-4">
                <!-- Col 1: Title & Skills -->
                <div class="flex min-w-0 flex-col gap-1 pr-2">
                  <a
                    href={resolve('/jobs/[slug]', { slug: job.public_slug })}
                    class="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-[#9966CB]"
                  >
                    {job.title}
                  </a>
                  <div class="flex items-center gap-1.5 overflow-hidden">
                    {#if job.skills && job.skills.length > 0}
                      {#each job.skills.slice(0, 3) as skill (skill)}
                        <span class="inline-flex shrink-0 items-center rounded border border-border/60 bg-secondary/80 px-1.5 py-0.5 text-[10px] font-medium text-foreground/75">
                          {skill}
                        </span>
                      {/each}
                    {:else}
                      <span class="text-[11px] text-muted-foreground">General VC Mandate</span>
                    {/if}
                    <span class="truncate text-[11px] text-muted-foreground lg:hidden">
                      · {job.company} · {job.location || 'India / Global'}
                    </span>
                  </div>
                </div>

                <!-- Col 2: Fund -->
                <div class="mt-2 flex min-w-0 items-center gap-2.5 lg:mt-0">
                  <div class="flex size-7 shrink-0 items-center justify-center rounded-md border border-[#9966CB]/25 bg-[#9966CB]/10 text-xs font-bold text-[#9966CB]">
                    {job.company.charAt(0)}
                  </div>
                  {#if job.company_slug}
                    <a
                      href={resolve('/companies/[slug]', { slug: job.company_slug })}
                      class="truncate text-xs font-semibold text-foreground transition-colors hover:text-[#9966CB]"
                    >
                      {job.company}
                    </a>
                  {:else}
                    <span class="truncate text-xs font-semibold text-foreground">
                      {job.company}
                    </span>
                  {/if}
                </div>

                <!-- Col 3: Location & Work Mode (Structured 2-Line Stack) -->
                <div class="mt-2 flex min-w-0 flex-col gap-1 lg:mt-0">
                  <div class="flex items-center gap-1 text-xs font-medium text-foreground/85">
                    <MapPin class="size-3.5 shrink-0 text-[#9966CB]" />
                    <span class="truncate">{job.location || 'India / Global'}</span>
                  </div>
                  <div>
                    <span class="inline-flex items-center rounded border border-border/80 bg-secondary/70 px-2 py-0.5 text-[10px] font-semibold text-foreground/90">
                      {formatWorkMode(job.work_mode)}
                    </span>
                  </div>
                </div>

                <!-- Col 4: Track & Source (Structured 2-Line Stack) -->
                <div class="mt-2 flex min-w-0 flex-col gap-1 lg:mt-0">
                  <div>
                    <span class="inline-flex items-center rounded-md border border-[#9966CB]/25 bg-[#9966CB]/10 px-2 py-0.5 text-[11px] font-semibold text-[#8652B8] dark:text-[#B68CE0]">
                      {formatTrackLabel(job.enrichment?.category)}
                    </span>
                  </div>
                  <div class="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <span class="truncate font-medium text-foreground/70">{formatSourceLabel(job.source)}</span>
                    {#if job.posted_at}
                      <span class="shrink-0">· {formatDateShort(job.posted_at)}</span>
                    {/if}
                  </div>
                </div>

                <!-- Col 5: Actions (Deterministic 160px container, aligned with header) -->
                <div class="mt-3 flex w-full items-center justify-end gap-2 lg:mt-0 lg:w-[160px]">
                  <a
                    href={resolve('/jobs/[slug]', { slug: job.public_slug })}
                    class="inline-flex h-8 items-center rounded-lg border border-border bg-background px-3 text-xs font-semibold text-foreground transition-all hover:border-[#9966CB] hover:bg-secondary/40 hover:text-[#9966CB]"
                  >
                    Details
                  </a>
                  {#if job.url}
                    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external ATS link -->
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex h-8 items-center gap-1 rounded-lg bg-[#9966CB] px-3 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#8652B8]"
                    >
                      <span>Apply</span>
                      <ArrowUpRight class="size-3.5" />
                    </a>
                  {:else}
                    <a
                      href={resolve('/jobs/[slug]', { slug: job.public_slug })}
                      class="inline-flex h-8 items-center gap-1 rounded-lg bg-[#9966CB] px-3 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#8652B8]"
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
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          {#each filteredJobs as job (job.public_slug)}
            <article class="group flex flex-col justify-between gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-[#9966CB]">
              <div class="flex flex-col gap-3">
                <div class="flex items-start justify-between gap-3">
                  <div class="flex items-center gap-3">
                    <div class="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary/60 text-sm font-bold text-[#9966CB]">
                      {job.company.charAt(0)}
                    </div>
                    <div>
                      <a
                        href={resolve('/jobs/[slug]', { slug: job.public_slug })}
                        class="text-base font-bold text-foreground transition-colors group-hover:text-[#9966CB]"
                      >
                        {job.title}
                      </a>
                      <div class="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-[#888888]">
                        {#if job.company_slug}
                          <a
                            href={resolve('/companies/[slug]', { slug: job.company_slug })}
                            class="font-bold text-foreground hover:text-[#9966CB]"
                          >
                            {job.company}
                          </a>
                        {:else}
                          <span class="font-bold text-foreground">{job.company}</span>
                        {/if}
                        <span>·</span>
                        <span class="inline-flex items-center gap-1">
                          <MapPin class="size-3 text-[#9966CB]" />
                          {job.location || 'India / Global'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span class="shrink-0 rounded-md bg-[#9966CB]/10 px-2 py-0.5 text-[11px] font-bold text-[#9966CB]">
                    {formatTrackLabel(job.enrichment?.category)}
                  </span>
                </div>

                {#if job.skills && job.skills.length > 0}
                  <div class="flex flex-wrap gap-1.5">
                    {#each job.skills.slice(0, 5) as skill (skill)}
                      <span class="rounded bg-secondary px-2 py-0.5 text-[11px] text-[#888888]">
                        {skill}
                      </span>
                    {/each}
                  </div>
                {/if}
              </div>

              <div class="flex items-center justify-between border-t border-border pt-3">
                <span class="text-[11px] text-[#888888]">
                  {formatWorkMode(job.work_mode)} · {formatSourceLabel(job.source)} · {formatDateShort(job.posted_at)}
                </span>
                <div class="flex items-center gap-2">
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
              </div>
            </article>
          {/each}
        </div>
      {/if}
    {:else}
      <!-- Empty Filter State -->
      <div class="flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-12 text-center">
        <div class="flex size-11 items-center justify-center rounded-lg border border-border bg-secondary/50 text-[#9966CB]">
          <SlidersHorizontal class="size-5" />
        </div>
        <div class="flex flex-col gap-1">
          <h2 class="text-lg font-bold text-foreground">No VC mandates match your current filters</h2>
          <p class="max-w-md text-xs text-[#888888]">
            Try clearing one or more filters or broadening your search query to view all {allJobs.length} live venture capital roles.
          </p>
        </div>
        <button
          type="button"
          onclick={clearFilters}
          class="inline-flex h-9 items-center gap-2 rounded-lg bg-[#9966CB] px-4 text-xs font-bold text-white hover:bg-[#8652B8]"
        >
          Reset all filters
        </button>
      </div>
    {/if}
  </div>
</div>
