<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import {
    Search,
    ArrowUpRight,
    ArrowRight,
    Briefcase,
    Building2,
    Globe,
    MapPin,
    MessageCircle,
    Plus,
    Sparkles,
    Layers,
    Users,
    RefreshCw,
    CheckCircle2,
  } from '@lucide/svelte';
  import type { CatalogScale, CompanyListItem, FacetCounts, Job } from '#lib/types.js';

  type FundSummary = CompanyListItem & { active_job_count?: number };

  let {
    counts,
    scale,
    jobs = [],
    companies = [],
    initialJobs = [],
    initialCompanies = [],
  }: {
    counts: FacetCounts | null;
    scale: CatalogScale | null;
    jobs?: Job[];
    companies?: FundSummary[];
    initialJobs?: Job[];
    initialCompanies?: FundSummary[];
  } = $props();

  let searchQuery = $state('');
  let selectedTrack = $state('');
  let selectedFundRegion = $state<'all' | 'in' | 'global' | 'hiring'>('all');
  let whatsappUrl = $state('https://chat.whatsapp.com/E7r0xi9u1qOE9v0YjbHcpM?s=cl&p=i&mlu=4');
  let postJobEmail = $state('Ozadhanvi99@gmail.com');
  let liveFetchedJobs = $state<Job[] | null>(null);
  let liveFetchedCompanies = $state<FundSummary[] | null>(null);
  let isSyncing = $state(false);

  async function refreshHomeData(force = false) {
    isSyncing = true;
    try {
      if (force) {
        await fetch('/api/v1/vc-sync?force=1', { method: 'POST' });
      }
      const [settingsRes, jobsRes, companiesRes] = await Promise.allSettled([
        fetch('/api/v1/vc-settings'),
        fetch('/api/v1/jobs?limit=150'),
        fetch('/api/v1/companies?limit=500'),
      ]);
      if (settingsRes.status === 'fulfilled' && settingsRes.value.ok) {
        const sData = await settingsRes.value.json();
        if (sData.whatsapp_url) whatsappUrl = sData.whatsapp_url;
        if (sData.post_job_email) postJobEmail = sData.post_job_email;
      }
      if (jobsRes.status === 'fulfilled' && jobsRes.value.ok) {
        const jData = await jobsRes.value.json();
        if (Array.isArray(jData.data) && jData.data.length > 0) {
          liveFetchedJobs = jData.data;
        }
      }
      if (companiesRes.status === 'fulfilled' && companiesRes.value.ok) {
        const cData = await companiesRes.value.json();
        if (Array.isArray(cData.data) && cData.data.length > 0) {
          liveFetchedCompanies = cData.data;
        }
      }
    } catch {
      // Retain SSR data
    } finally {
      isSyncing = false;
    }
  }

  onMount(() => {
    void refreshHomeData(false);
    const resetHandler = () => {
      searchQuery = '';
      selectedTrack = '';
      selectedFundRegion = 'all';
    };
    window.addEventListener('vcjobs:reset-home', resetHandler);
    return () => window.removeEventListener('vcjobs:reset-home', resetHandler);
  });

  const ssrJobs = $derived(jobs.length > 0 ? jobs : initialJobs);
  const ssrCompanies = $derived(companies.length > 0 ? companies : initialCompanies);

  const activeJobs = $derived(
    liveFetchedJobs && liveFetchedJobs.length > 0 ? liveFetchedJobs : ssrJobs,
  );
  const activeCompanies = $derived(
    liveFetchedCompanies && liveFetchedCompanies.length > 0 ? liveFetchedCompanies : ssrCompanies,
  );

  const filteredPreviewJobs = $derived.by(() => {
    const list = selectedTrack
      ? activeJobs.filter((j) => (j.enrichment?.category ?? '') === selectedTrack)
      : activeJobs;
    return list.slice(0, 12);
  });

  function fundOpenJobs(c: FundSummary): number {
    return c.job_count ?? c.active_job_count ?? 0;
  }

  const filteredFunds = $derived.by(() => {
    let list = activeCompanies;
    if (selectedFundRegion === 'in') {
      list = list.filter((c) => (c.hq_country ?? '').toLowerCase() === 'in');
    } else if (selectedFundRegion === 'global') {
      list = list.filter((c) => (c.hq_country ?? '').toLowerCase() !== 'in');
    } else if (selectedFundRegion === 'hiring') {
      list = list.filter((c) => fundOpenJobs(c) > 0);
    }
    return list.slice(0, 12);
  });

  const liveJobCount = $derived(
    Math.max(activeJobs.length, counts?.total ?? 0, scale?.open_jobs ?? 0),
  );
  const totalFundsCount = $derived(
    Math.max(activeCompanies.length, scale?.companies ?? 0),
  );
  const indiaVcCount = $derived(
    activeCompanies.filter((c) => (c.hq_country ?? '').toLowerCase() === 'in').length,
  );
  const globalVcCount = $derived(
    Math.max(0, activeCompanies.length - indiaVcCount),
  );
  const activelyHiringFundsCount = $derived(
    activeCompanies.filter((c) => fundOpenJobs(c) > 0).length,
  );

  function submitSearch(e: SubmitEvent) {
    e.preventDefault();
    const q = searchQuery.trim();
    const target = q ? `${resolve('/jobs')}?q=${encodeURIComponent(q)}` : resolve('/jobs');
    // eslint-disable-next-line svelte/no-navigation-without-resolve -- resolved above
    void goto(target);
  }

  function categoryCount(catKey: string): number {
    return activeJobs.filter((j) => (j.enrichment?.category ?? '') === catKey).length;
  }

  const tracks = [
    {
      title: 'Investment Team',
      subtitle: 'Analyst · Associate · Principal · Partner',
      description: 'Deal sourcing, thesis research, due diligence, financial modeling, and board execution.',
      href: `${resolve('/jobs')}?category=finance`,
      categoryKey: 'finance',
      icon: Briefcase,
    },
    {
      title: 'Platform & Value Creation',
      subtitle: 'Operating Partner · GTM · Ecosystem',
      description: 'Post-investment portfolio acceleration, enterprise customer introductions, and fund operations.',
      href: `${resolve('/jobs')}?category=operations`,
      categoryKey: 'operations',
      icon: Layers,
    },
    {
      title: 'Portfolio & Founders\u2019 Office',
      subtitle: 'EIR · Venture Fellow · Chief of Staff',
      description: 'Incubation tracks, Entrepreneur-in-Residence programs, and strategic leadership across backed startups.',
      href: `${resolve('/jobs')}?category=product`,
      categoryKey: 'product',
      icon: Sparkles,
    },
    {
      title: 'Talent, Brand & IR',
      subtitle: 'Executive Search · Communications · LP Relations',
      description: 'Executive leadership hiring, fund narrative, community building, and institutional LP relations.',
      href: `${resolve('/jobs')}?category=marketing`,
      categoryKey: 'marketing',
      icon: Users,
    },
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
        return 'Brand & IR';
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

  function formatSourceBadge(source?: string | null): string {
    switch ((source ?? '').toLowerCase()) {
      case 'google_sheets':
        return 'Sheet Sync';
      case 'greenhouse':
        return 'Greenhouse';
      case 'lever':
        return 'Lever';
      case 'ashby':
        return 'Ashby';
      case 'getro':
        return 'Getro';
      case 'consider':
        return 'Consider';
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

<div class="flex flex-col">
  <!-- ARCHITECTURAL HERO & TELEMETRY WORKBENCH -->
  <section class="vc-caret-light border-b border-border bg-card">
    <div class="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      <div class="grid items-start gap-8 lg:grid-cols-[1.35fr_0.9fr] lg:gap-12">
        <!-- Left Column: Brand Proposition & Command Search -->
        <div class="flex flex-col gap-6">
          <div class="flex flex-wrap items-center gap-2.5">
            <span class="inline-flex items-center gap-1.5 rounded-md border border-[#9966CB]/30 bg-[#9966CB]/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#9966CB]">
              Opportunities in Venture Capital
            </span>
            <span class="text-xs text-[#888888]">
              India &amp; Global Venture Ecosystem
            </span>
          </div>

          <div class="flex flex-col gap-3">
            <h1 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
              The institutional directory for roles in <span class="text-[#9966CB]">Venture Capital</span>.
            </h1>
            <p class="max-w-2xl text-sm leading-relaxed text-[#888888] sm:text-base">
              Good work deserves to be found. Explore verified openings across
              <strong class="font-bold text-foreground">{totalFundsCount}</strong> venture capital funds —
              continuously synchronized from official partner ATS boards and curated ecosystem sheets.
            </p>
          </div>

          <!-- Command Search Bar -->
          <form onsubmit={submitSearch} class="flex flex-col gap-2 sm:flex-row">
            <div class="relative flex-1">
              <Search class="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#888888]" />
              <input
                type="search"
                bind:value={searchQuery}
                placeholder="Search by role, VC fund (Peak XV, Accel, Blume, Bessemer), or city..."
                aria-label="Search VC jobs"
                class="h-11 w-full rounded-lg border border-border bg-background pr-4 pl-10 text-sm text-foreground placeholder:text-[#888888] focus:border-[#9966CB] focus:outline-none focus:ring-2 focus:ring-[#9966CB]/20"
              />
            </div>
            <button
              type="submit"
              class="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#9966CB] px-6 text-sm font-bold text-white transition-colors hover:bg-[#8652B8]"
            >
              <span>Search Roles</span>
              <ArrowRight class="size-4" />
            </button>
          </form>

          <!-- Structured Quick Filters -->
          <div class="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span class="mr-1 text-xs font-bold text-[#888888]">Filter by track:</span>
            <a
              href="{resolve('/jobs')}?category=finance"
              class="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-bold text-foreground transition-colors hover:border-[#9966CB] hover:text-[#9966CB]"
            >
              Investment Team
            </a>
            <a
              href="{resolve('/jobs')}?category=operations"
              class="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-bold text-foreground transition-colors hover:border-[#9966CB] hover:text-[#9966CB]"
            >
              Platform &amp; Value Creation
            </a>
            <a
              href="{resolve('/jobs')}?category=product"
              class="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-bold text-foreground transition-colors hover:border-[#9966CB] hover:text-[#9966CB]"
            >
              Portfolio &amp; EIR
            </a>
            <a
              href="{resolve('/jobs')}?countries=in"
              class="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-bold text-foreground transition-colors hover:border-[#9966CB] hover:text-[#9966CB]"
            >
              India VCs ({indiaVcCount})
            </a>
            <a
              href="{resolve('/companies')}"
              class="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-bold text-foreground transition-colors hover:border-[#9966CB] hover:text-[#9966CB]"
            >
              All {totalFundsCount} Funds
            </a>
          </div>
        </div>

        <!-- Right Column: Live Market Telemetry Ledger (Black Charcoal #1E1E1E) -->
        <div class="overflow-hidden rounded-xl border border-border bg-[#1E1E1E] text-white">
          <div class="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
            <div class="flex items-center gap-2">
              <span class="size-2 rounded-full bg-emerald-400"></span>
              <span class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#CCCCCC]">
                Live Ecosystem Index
              </span>
            </div>
            <button
              type="button"
              onclick={() => refreshHomeData(true)}
              disabled={isSyncing}
              class="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-bold text-[#CCCCCC] transition-colors hover:border-[#9966CB] hover:text-white disabled:opacity-50"
            >
              <RefreshCw class={['size-3', isSyncing && 'animate-spin']} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Feed'}</span>
            </button>
          </div>

          <!-- 2x2 Structural Metric Grid -->
          <div class="grid grid-cols-2 divide-x divide-y divide-white/10">
            <a
              href={resolve('/jobs')}
              class="group flex flex-col gap-1 p-5 transition-colors hover:bg-white/[0.03]"
            >
              <div class="flex items-center justify-between">
                <span class="text-xs text-[#888888]">Live Open Roles</span>
                <ArrowUpRight class="size-3.5 text-[#888888] transition-colors group-hover:text-[#9966CB]" />
              </div>
              <span class="text-2xl font-bold tabular-nums text-white sm:text-3xl">
                {liveJobCount}
              </span>
              <span class="text-[11px] text-[#9966CB]">
                Verified active mandates
              </span>
            </a>

            <a
              href={resolve('/companies')}
              class="group flex flex-col gap-1 p-5 transition-colors hover:bg-white/[0.03]"
            >
              <div class="flex items-center justify-between">
                <span class="text-xs text-[#888888]">Monitored VC Funds</span>
                <ArrowUpRight class="size-3.5 text-[#888888] transition-colors group-hover:text-[#9966CB]" />
              </div>
              <span class="text-2xl font-bold tabular-nums text-white sm:text-3xl">
                {totalFundsCount}
              </span>
              <span class="text-[11px] text-[#CCCCCC]">
                {activelyHiringFundsCount} funds with live openings
              </span>
            </a>

            <a
              href="{resolve('/companies')}?country=in"
              class="group flex flex-col gap-1 p-5 transition-colors hover:bg-white/[0.03]"
            >
              <div class="flex items-center justify-between">
                <span class="text-xs text-[#888888]">India VC Directory</span>
                <ArrowUpRight class="size-3.5 text-[#888888] transition-colors group-hover:text-[#9966CB]" />
              </div>
              <span class="text-2xl font-bold tabular-nums text-white sm:text-3xl">
                {indiaVcCount}
              </span>
              <span class="text-[11px] text-[#CCCCCC]">
                Bengaluru · Mumbai · Delhi NCR
              </span>
            </a>

            <a
              href="{resolve('/companies')}?country=global"
              class="group flex flex-col gap-1 p-5 transition-colors hover:bg-white/[0.03]"
            >
              <div class="flex items-center justify-between">
                <span class="text-xs text-[#888888]">Global Multi-Stage</span>
                <ArrowUpRight class="size-3.5 text-[#888888] transition-colors group-hover:text-[#9966CB]" />
              </div>
              <span class="text-2xl font-bold tabular-nums text-white sm:text-3xl">
                {globalVcCount}
              </span>
              <span class="text-[11px] text-[#CCCCCC]">
                US · Europe · Singapore · MENA
              </span>
            </a>
          </div>

          <!-- Telemetry Footer Actions -->
          <div class="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-white/[0.02] px-5 py-3.5">
            <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external WhatsApp link -->
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#9966CB] px-3.5 text-xs font-bold text-white transition-colors hover:bg-[#8652B8]"
            >
              <MessageCircle class="size-3.5" />
              <span>Join WhatsApp Alerts</span>
            </a>
            <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- mailto link -->
            <a
              href="mailto:{postJobEmail}?subject=Post%20a%20VC%20job"
              class="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3.5 text-xs font-bold text-white transition-colors hover:border-[#9966CB]"
            >
              <Plus class="size-3.5" />
              <span>Post a job</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- MAIN WORKSPACE CONTAINER -->
  <div class="mx-auto flex w-full max-w-7xl flex-col gap-14 px-4 py-12 sm:px-6 sm:py-16">
    <!-- SECTION 1: VENTURE CAREER TRACKS (UNIFIED ARCHITECTURAL MATRIX) -->
    <section class="flex flex-col gap-5">
      <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div class="flex flex-col gap-1">
          <span class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9966CB]">
            Career Pathways
          </span>
          <h2 class="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Structured by Venture Function
          </h2>
        </div>
        <a
          href={resolve('/jobs')}
          class="inline-flex items-center gap-1.5 text-xs font-bold text-[#9966CB] transition-colors hover:underline"
        >
          <span>Explore full role taxonomy</span>
          <ArrowRight class="size-3.5" />
        </a>
      </div>

      <div class="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {#each tracks as track (track.title)}
          {@const Icon = track.icon}
          {@const count = categoryCount(track.categoryKey)}
          <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- resolved above -->
          <a
            href={track.href}
            class="group flex flex-col justify-between gap-5 p-5 transition-colors hover:bg-secondary/40"
          >
            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between gap-2">
                <div class="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-[#9966CB] transition-colors group-hover:border-[#9966CB] group-hover:bg-[#9966CB] group-hover:text-white">
                  <Icon class="size-4" />
                </div>
                {#if count > 0}
                  <span class="rounded-md bg-[#9966CB]/10 px-2 py-0.5 text-xs font-bold tabular-nums text-[#9966CB]">
                    {count} open
                  </span>
                {/if}
              </div>

              <div class="flex flex-col gap-1">
                <h3 class="text-base font-bold text-foreground transition-colors group-hover:text-[#9966CB]">
                  {track.title}
                </h3>
                <p class="text-xs font-bold text-[#888888]">
                  {track.subtitle}
                </p>
              </div>

              <p class="text-xs leading-relaxed text-[#888888]">
                {track.description}
              </p>
            </div>

            <div class="flex items-center justify-between border-t border-border/70 pt-3 text-xs font-bold text-foreground group-hover:text-[#9966CB]">
              <span>View track openings</span>
              <ArrowRight class="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </a>
        {/each}
      </div>
    </section>

    <!-- SECTION 2: LIVE VENTURE CAPITAL OPPORTUNITIES LEDGER -->
    <section class="flex flex-col gap-5">
      <div class="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <span class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9966CB]">
              Live Mandate Feed
            </span>
            <span class="inline-flex items-center gap-1 text-[11px] text-[#888888]">
              · <CheckCircle2 class="size-3 text-emerald-500" /> Direct ATS &amp; Sheet Verified
            </span>
          </div>
          <h2 class="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Active Venture Capital Roles ({liveJobCount})
          </h2>
        </div>

        <!-- Inline Track Segmented Filter + View All -->
        <div class="flex flex-wrap items-center gap-2">
          <div class="inline-flex flex-wrap items-center gap-1 rounded-lg border border-border bg-card p-1">
            {#each [
              { id: '', label: 'All Tracks' },
              { id: 'finance', label: 'Investment' },
              { id: 'operations', label: 'Platform' },
              { id: 'product', label: 'Portfolio' },
              { id: 'marketing', label: 'Brand & IR' },
            ] as tab (tab.id)}
              <button
                type="button"
                onclick={() => (selectedTrack = tab.id)}
                class={[
                  'rounded-md px-2.5 py-1 text-xs font-bold transition-colors',
                  selectedTrack === tab.id
                    ? 'bg-[#9966CB] text-white'
                    : 'text-[#888888] hover:text-foreground',
                ]}
              >
                {tab.label}
              </button>
            {/each}
          </div>

          <a
            href={resolve('/jobs')}
            class="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-xs font-bold text-foreground transition-colors hover:border-[#9966CB] hover:text-[#9966CB]"
          >
            <span>Full Directory ({liveJobCount})</span>
            <ArrowRight class="size-3.5" />
          </a>
        </div>
      </div>

      {#if filteredPreviewJobs.length > 0}
        <div class="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
          <!-- Desktop Ledger Header -->
          <div class="hidden border-b border-border bg-secondary/50 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground lg:grid lg:grid-cols-[minmax(0,2.3fr)_minmax(0,1.35fr)_minmax(0,1.25fr)_minmax(0,1.1fr)_160px] lg:items-center lg:gap-4">
            <span>Role &amp; Focus</span>
            <span>Venture Fund</span>
            <span>Location &amp; Work Mode</span>
            <span>Track &amp; Source</span>
            <span class="text-right">Actions</span>
          </div>

          <div class="divide-y divide-border/60">
            {#each filteredPreviewJobs as job (job.public_slug)}
              <article class="group px-4 py-3.5 transition-colors hover:bg-secondary/40 sm:px-5 lg:grid lg:grid-cols-[minmax(0,2.3fr)_minmax(0,1.35fr)_minmax(0,1.25fr)_minmax(0,1.1fr)_160px] lg:items-center lg:gap-4">
                <!-- Col 1: Role Title & Skills -->
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

                <!-- Col 2: Venture Fund -->
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
                    <span class="truncate font-medium text-foreground/70">{formatSourceBadge(job.source)}</span>
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

          <!-- Ledger Footer Bar -->
          <div class="flex flex-col items-center justify-between gap-3 border-t border-border bg-secondary/30 px-5 py-3.5 sm:flex-row">
            <span class="text-xs text-[#888888]">
              Showing <strong class="font-bold text-foreground">{filteredPreviewJobs.length}</strong> of <strong class="font-bold text-foreground">{liveJobCount}</strong> verified venture capital roles
            </span>
            <a
              href={resolve('/jobs')}
              class="inline-flex items-center gap-1.5 text-xs font-bold text-[#9966CB] hover:underline"
            >
              <span>Browse &amp; filter all {liveJobCount} open roles</span>
              <ArrowRight class="size-3.5" />
            </a>
          </div>
        </div>
      {:else}
        <div class="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-10 text-center">
          <Briefcase class="size-6 text-[#9966CB]" />
          <p class="text-sm font-bold text-foreground">Synchronizing live venture capital roles...</p>
          <button
            type="button"
            onclick={() => refreshHomeData(true)}
            class="inline-flex h-9 items-center gap-2 rounded-lg bg-[#9966CB] px-4 text-xs font-bold text-white"
          >
            <RefreshCw class="size-3.5" />
            Refresh Catalog
          </button>
        </div>
      {/if}
    </section>

    <!-- SECTION 3: MONITORED VENTURE CAPITAL FUNDS DIRECTORY -->
    {#if activeCompanies.length > 0}
      <section class="flex flex-col gap-5">
        <div class="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div class="flex flex-col gap-1">
            <span class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9966CB]">
              Institutional Coverage
            </span>
            <h2 class="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Monitored Venture Capital Funds ({totalFundsCount})
            </h2>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <div class="inline-flex flex-wrap items-center gap-1 rounded-lg border border-border bg-card p-1">
              {#each [
                { id: 'all', label: `All (${totalFundsCount})` },
                { id: 'in', label: `India VCs (${indiaVcCount})` },
                { id: 'global', label: `Global VCs (${globalVcCount})` },
                { id: 'hiring', label: `Actively Hiring (${activelyHiringFundsCount})` },
              ] as tab (tab.id)}
                <button
                  type="button"
                  onclick={() => (selectedFundRegion = tab.id as 'all' | 'in' | 'global' | 'hiring')}
                  class={[
                    'rounded-md px-2.5 py-1 text-xs font-bold transition-colors',
                    selectedFundRegion === tab.id
                      ? 'bg-[#1E1E1E] text-white dark:bg-white dark:text-[#1E1E1E]'
                      : 'text-[#888888] hover:text-foreground',
                  ]}
                >
                  {tab.label}
                </button>
              {/each}
            </div>

            <a
              href={resolve('/companies')}
              class="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-xs font-bold text-foreground transition-colors hover:border-[#9966CB] hover:text-[#9966CB]"
            >
              <span>All {totalFundsCount} Funds</span>
              <ArrowRight class="size-3.5" />
            </a>
          </div>
        </div>

        <div class="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card sm:grid-cols-2 sm:divide-x lg:grid-cols-3">
          {#each filteredFunds as fund (fund.slug)}
            <a
              href={resolve('/companies/[slug]', { slug: fund.slug })}
              class="group flex flex-col justify-between gap-3.5 border-b border-border p-5 transition-colors hover:bg-secondary/35"
            >
              <div class="flex flex-col gap-2.5">
                <div class="flex items-start justify-between gap-3">
                  <div class="flex min-w-0 items-center gap-3">
                    <div class="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary/60 text-sm font-bold text-[#9966CB]">
                      {fund.name.charAt(0)}
                    </div>
                    <div class="min-w-0">
                      <h3 class="truncate text-sm font-bold text-foreground transition-colors group-hover:text-[#9966CB]">
                        {fund.name}
                      </h3>
                      <div class="flex items-center gap-1.5 text-[11px] text-[#888888]">
                        {#if fund.hq_country}
                          <span class="font-bold uppercase text-foreground/80">{fund.hq_country}</span>
                        {/if}
                        {#if fund.industries && fund.industries.length > 0}
                          <span>·</span>
                          <span class="truncate">{fund.industries[1] ?? fund.industries[0]}</span>
                        {/if}
                      </div>
                    </div>
                  </div>

                  {#if fundOpenJobs(fund) > 0}
                    <span class="shrink-0 rounded-md bg-[#9966CB]/12 px-2 py-0.5 text-[11px] font-bold tabular-nums text-[#9966CB]">
                      {fundOpenJobs(fund)} {fundOpenJobs(fund) === 1 ? 'role' : 'roles'}
                    </span>
                  {:else}
                    <span class="shrink-0 rounded-md border border-border px-2 py-0.5 text-[11px] text-[#888888]">
                      Tracked
                    </span>
                  {/if}
                </div>

                {#if fund.tagline}
                  <p class="line-clamp-2 text-xs leading-relaxed text-[#888888]">
                    {fund.tagline}
                  </p>
                {/if}
              </div>

              <div class="flex items-center justify-between pt-1 text-[11px] font-bold text-[#888888] group-hover:text-[#9966CB]">
                <span>Fund dossier &amp; career feed</span>
                <ArrowUpRight class="size-3.5" />
              </div>
            </a>
          {/each}
        </div>
      </section>
    {/if}

    <!-- SECTION 4: INSTITUTIONAL WHATSAPP & HIRING PARTNER BANNER -->
    <section class="vc-caret-dark overflow-hidden rounded-xl border border-border bg-[#1E1E1E] p-6 text-white sm:p-10">
      <div class="relative z-10 grid items-center gap-8 lg:grid-cols-[1.35fr_1fr]">
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-3">
            <img
              src="/logo-on-dark.png"
              alt="VC Jobs"
              class="h-6 w-auto object-contain"
            />
            <span class="h-4 w-px bg-white/20" aria-hidden="true"></span>
            <span class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9966CB]">
              Community &amp; Talent Desk
            </span>
          </div>
          <h2 class="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Never miss an Analyst, Associate, Platform, or EIR mandate.
          </h2>
          <p class="max-w-xl text-sm leading-relaxed text-[#CCCCCC]">
            Venture capital hiring cycles move quickly and often close via warm network referrals.
            Join the official VC Jobs WhatsApp distribution or submit an open mandate directly from your fund.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3 lg:justify-end">
          <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external WhatsApp link -->
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-10 items-center gap-2 rounded-lg bg-[#9966CB] px-5 text-xs font-bold text-white transition-colors hover:bg-[#8652B8]"
          >
            <MessageCircle class="size-4" />
            <span>Get job updates</span>
            <ArrowUpRight class="size-3.5" />
          </a>

          <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- mailto link -->
          <a
            href="mailto:{postJobEmail}?subject=Post%20a%20VC%20job"
            class="inline-flex h-10 items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 text-xs font-bold text-white transition-colors hover:border-[#9966CB] hover:bg-[#9966CB]/15"
          >
            <Plus class="size-4" />
            <span>Post a job</span>
          </a>

          <a
            href={resolve('/submit')}
            class="inline-flex h-10 items-center gap-2 rounded-lg border border-white/15 bg-transparent px-4 text-xs font-bold text-[#CCCCCC] transition-colors hover:border-white/40 hover:text-white"
          >
            <span>Submit Role URL</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</div>
