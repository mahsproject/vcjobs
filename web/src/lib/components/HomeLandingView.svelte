<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import {
    Search,
    ArrowUpRight,
    ArrowRight,
    MapPin,
    Briefcase,
    Building2,
    MessageCircle,
    Plus,
    RefreshCw,
    Globe,
    Layers,
  } from '@lucide/svelte';
  import type { CatalogScale, CompanyListItem, FacetCounts, Job } from '#lib/types.js';

  let {
    scale = null,
    initialJobs = [],
    initialCompanies = [],
  }: {
    counts?: FacetCounts | null;
    scale?: CatalogScale | null;
    initialJobs?: Job[];
    initialCompanies?: CompanyListItem[];
  } = $props();

  let searchQuery = $state('');

  const jobs = $derived(initialJobs ?? []);
  const companies = $derived(initialCompanies ?? []);

  const totalOpenJobs = $derived(jobs.length || scale?.open_jobs || 0);
  const totalFunds = $derived(companies.length || scale?.companies || 0);
  const indiaFundsCount = $derived(companies.filter((c) => c.hq_country === 'in').length);
  const globalFundsCount = $derived(Math.max(totalFunds - indiaFundsCount, 0));

  const featuredHeroRoles = $derived(jobs.slice(0, 3));
  const latestRolesPreview = $derived(jobs.slice(0, 6));
  const featuredFunds = $derived(companies.slice(0, 12));

  const tracks = $derived([
    {
      id: 'investment',
      label: 'Investment Team',
      subtitle: 'Analyst, Associate, Principal, VP & Partner roles driving deal sourcing and thesis conviction.',
      count: jobs.filter((j) => j.enrichment?.category === 'finance').length,
      href: '/jobs?track=investment',
    },
    {
      id: 'platform',
      label: 'Platform & Value Creation',
      subtitle: 'Founder success, GTM advisory, community, and fund operations roles supporting portfolio growth.',
      count: jobs.filter((j) => j.enrichment?.category === 'operations').length,
      href: '/jobs?track=platform',
    },
    {
      id: 'portfolio',
      label: 'Portfolio & EIR',
      subtitle: 'Entrepreneur-in-Residence, venture builder, technical advisor, and residency leadership tracks.',
      count: jobs.filter((j) =>
        ['product', 'software_engineering', 'data_science'].includes(j.enrichment?.category ?? ''),
      ).length,
      href: '/jobs?track=portfolio',
    },
    {
      id: 'talent',
      label: 'Talent, Brand & IR',
      subtitle: 'Executive search, leadership recruiting, marketing, content, and investor relations roles.',
      count: jobs.filter((j) =>
        ['recruiting', 'marketing', 'legal'].includes(j.enrichment?.category ?? ''),
      ).length,
      href: '/jobs?track=talent',
    },
  ]);

  function handleSearchSubmit(e: SubmitEvent) {
    e.preventDefault();
    const q = searchQuery.trim();
    const target = q ? `${resolve('/jobs')}?q=${encodeURIComponent(q)}` : resolve('/jobs');
    // eslint-disable-next-line svelte/no-navigation-without-resolve -- resolved above
    void goto(target);
  }

  function formatWorkMode(mode?: string): string {
    if (!mode) return 'On-site';
    if (mode === 'remote') return 'Remote';
    if (mode === 'hybrid') return 'Hybrid';
    return 'On-site';
  }

  function formatTrackBadge(cat?: string): string {
    if (cat === 'finance') return 'Investment';
    if (cat === 'operations') return 'Platform & Ops';
    if (cat === 'product') return 'Portfolio / EIR';
    if (cat === 'marketing') return 'Marketing & Brand';
    if (cat === 'recruiting') return 'Talent & People';
    if (cat === 'legal') return 'Legal & Compliance';
    return 'Venture Role';
  }

  function formatSourceLabel(source?: string): string {
    if (source === 'google_sheets') return 'Google Sheet Sync';
    if (source === 'greenhouse') return 'Greenhouse Live';
    if (source === 'lever') return 'Lever Live';
    if (source === 'ashby') return 'Ashby Live';
    if (source === 'workable') return 'Workable Live';
    if (source === 'smartrecruiters') return 'SmartRecruiters Live';
    return 'Live ATS';
  }
</script>

<div class="flex flex-col gap-16 py-8 sm:py-12">
  <!-- ======================================================================= -->
  <!-- 1. HERO SECTION (Strictly per VC Jobs Brand Guidelines)                 -->
  <!-- ======================================================================= -->
  <section class="grid items-stretch gap-8 lg:grid-cols-[1.2fr_0.8fr]">
    <!-- Left Hero Card -->
    <div
      class="dot-grid relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-10"
    >
      <div>
        <div class="inline-flex items-center gap-2 rounded-full bg-[#9966CB]/12 px-3.5 py-1.5">
          <span class="text-xs font-bold leading-none text-[#9966CB]">^</span>
          <span class="text-xs font-bold tracking-[0.12em] uppercase text-[#9966CB]">
            Opportunities in Venture Capital
          </span>
        </div>

        <h1
          class="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-5xl sm:leading-[1.12]"
        >
          Good work deserves
          <span class="block text-[#9966CB]">to be found.</span>
        </h1>

        <p class="mt-4 max-w-xl text-base font-normal leading-relaxed text-[#888888] sm:text-lg">
          Explore live investment, platform, operations, and portfolio talent opportunities synced
          automatically from {totalFunds} venture capital funds across India, the US, Europe, and APAC.
        </p>
      </div>

      <!-- Search Bar Navigating to Dedicated `/jobs` Route -->
      <div class="mt-8">
        <form onsubmit={handleSearchSubmit} class="flex flex-col gap-3 sm:flex-row">
          <div class="relative flex-1">
            <Search
              class="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#888888]"
            />
            <input
              type="search"
              bind:value={searchQuery}
              placeholder="Search by role (Analyst, Associate, Platform), VC fund, or city..."
              aria-label="Search open venture capital roles"
              class="h-12 w-full rounded-xl border border-border bg-background pr-4 pl-11 text-sm font-normal text-foreground transition-colors focus:border-[#9966CB] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            class="inline-flex h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#9966CB] px-6 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            <span>Open Roles ({totalOpenJobs})</span>
            <ArrowRight class="size-4" />
          </button>
        </form>

        <!-- Quick Track Pills Navigating to `/jobs?track=...` -->
        <div class="mt-4 flex flex-wrap items-center gap-2">
          <span class="text-xs font-bold tracking-wider uppercase text-[#888888]">Tracks:</span>
          {#each [
            { id: 'investment', label: 'Investment Team' },
            { id: 'platform', label: 'Platform & Ops' },
            { id: 'portfolio', label: 'Portfolio & EIR' },
            { id: 'talent', label: 'Talent & Brand' },
          ] as pill (pill.id)}
            <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- query param on resolved /jobs -->
            <a
              href="{resolve('/jobs')}?track={pill.id}"
              class="rounded-full border border-border bg-background px-3 py-1 text-xs font-bold text-[#888888] transition-colors hover:border-[#9966CB] hover:text-[#9966CB]"
            >
              {pill.label}
            </a>
          {/each}
        </div>
      </div>
    </div>

    <!-- Right Dark Brand Card (#1E1E1E + Caret Pattern + /logo-on-dark.png) -->
    <div
      class="vc-caret-dark relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1E1E1E] bg-[#1E1E1E] p-6 text-white sm:p-8"
    >
      <div class="relative z-10 flex items-center justify-between gap-4">
        <img
          src="/logo-on-dark.png"
          alt="VC Jobs"
          class="h-7 w-auto object-contain sm:h-8"
        />
        <span
          class="inline-flex items-center gap-1.5 rounded-full border border-[#9966CB]/40 bg-[#9966CB]/15 px-3 py-1 text-[11px] font-bold tracking-[0.12em] uppercase text-[#9966CB]"
        >
          <RefreshCw class="size-3" />
          Live Automated Index
        </span>
      </div>

      <!-- Real Live Catalog Metrics (Zero Hardcoded Numbers) -->
      <div class="relative z-10 my-6 grid grid-cols-2 gap-3.5">
        <div class="rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <p class="text-2xl font-bold text-white sm:text-3xl">{totalOpenJobs}</p>
          <p class="mt-1 text-xs font-bold tracking-wider uppercase text-[#9966CB]">
            Live Open Roles
          </p>
        </div>
        <div class="rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <p class="text-2xl font-bold text-white sm:text-3xl">{totalFunds}</p>
          <p class="mt-1 text-xs font-bold tracking-wider uppercase text-[#9966CB]">
            VC Funds Tracked
          </p>
          <p class="mt-0.5 text-[11px] font-normal text-[#888888]">
            {indiaFundsCount} India · {globalFundsCount} Global
          </p>
        </div>
      </div>

      <!-- Top 3 Latest Synced Roles -->
      <div class="relative z-10 flex flex-col gap-2.5">
        <p class="text-xs font-bold tracking-[0.12em] uppercase text-[#888888]">
          Latest Synced Openings
        </p>
        {#each featuredHeroRoles as role (role.public_slug)}
          <a
            href={resolve('/jobs/[slug]', { slug: role.public_slug })}
            class="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-colors hover:border-[#9966CB] hover:bg-white/[0.08]"
          >
            <div class="min-w-0">
              <p class="truncate text-xs font-bold text-white group-hover:text-[#9966CB]">
                {role.title}
              </p>
              <p class="mt-0.5 truncate text-[11px] font-normal text-[#888888]">
                {role.company} · {role.location}
              </p>
            </div>
            <ArrowUpRight class="size-4 shrink-0 text-[#9966CB]" />
          </a>
        {/each}
      </div>

      <div
        class="relative z-10 mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs"
      >
        <span class="font-normal text-[#888888]">Synced from live ATS boards &amp; Google Sheet</span>
        <a
          href={resolve('/jobs')}
          class="inline-flex items-center gap-1 font-bold text-[#9966CB] hover:underline"
        >
          View all open roles
          <ArrowRight class="size-3.5" />
        </a>
      </div>
    </div>
  </section>

  <!-- ======================================================================= -->
  <!-- 2. VENTURE CAREER TRACKS (Clicks Navigate to `/jobs?track=...`)         -->
  <!-- ======================================================================= -->
  <section aria-labelledby="career-tracks-heading">
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <div class="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.14em] uppercase text-[#9966CB]">
          <span>^</span>
          <span>Career Pathways</span>
        </div>
        <h2 id="career-tracks-heading" class="mt-1.5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Explore Roles by Venture Track
        </h2>
      </div>
      <a
        href={resolve('/jobs')}
        class="inline-flex items-center gap-1.5 text-sm font-bold text-[#9966CB] hover:underline"
      >
        Browse all {totalOpenJobs} open roles
        <ArrowRight class="size-4" />
      </a>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {#each tracks as track (track.id)}
        <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- query param on /jobs -->
        <a
          href="{resolve('/jobs')}?track={track.id}"
          class="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:border-[#9966CB]"
        >
          <div>
            <div class="flex items-center justify-between gap-2">
              <span
                class="inline-flex size-9 items-center justify-center rounded-xl bg-[#9966CB]/12 text-[#9966CB]"
              >
                <Layers class="size-4" />
              </span>
              <span
                class="rounded-full bg-[#9966CB]/12 px-2.5 py-1 text-xs font-bold text-[#9966CB]"
              >
                {track.count} {track.count === 1 ? 'role' : 'roles'}
              </span>
            </div>
            <h3 class="mt-4 text-base font-bold text-foreground group-hover:text-[#9966CB]">
              {track.label}
            </h3>
            <p class="mt-2 text-xs font-normal leading-relaxed text-[#888888]">
              {track.subtitle}
            </p>
          </div>
          <div class="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[#9966CB]">
            <span>Explore track</span>
            <ArrowRight class="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </a>
      {/each}
    </div>
  </section>

  <!-- ======================================================================= -->
  <!-- 3. FEATURED LIVE OPEN ROLES PREVIEW (Links to `/jobs` & `/jobs/[slug]`) -->
  <!-- ======================================================================= -->
  <section aria-labelledby="featured-roles-heading">
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <div class="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.14em] uppercase text-[#9966CB]">
          <span>^</span>
          <span>Live Role Feed</span>
        </div>
        <h2 id="featured-roles-heading" class="mt-1.5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Recently Synced VC Opportunities
        </h2>
        <p class="mt-1 text-sm font-normal text-[#888888]">
          Automatically indexed from live VC career portals and our verified Google Sheet.
        </p>
      </div>
      <a
        href={resolve('/jobs')}
        class="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl bg-[#9966CB] px-5 text-xs font-bold text-white transition-opacity hover:opacity-90"
      >
        <span>Open Full Role Board ({totalOpenJobs})</span>
        <ArrowRight class="size-4" />
      </a>
    </div>

    {#if latestRolesPreview.length === 0}
      <div class="mt-6 rounded-2xl border border-border bg-card p-10 text-center">
        <p class="text-base font-bold text-foreground">Syncing live VC roles...</p>
        <p class="mt-1 text-sm font-normal text-[#888888]">
          Visit the Open Roles page to trigger a live ATS and Google Sheet refresh.
        </p>
        <a
          href={resolve('/jobs')}
          class="mt-4 inline-flex h-10 items-center gap-2 rounded-xl bg-[#9966CB] px-5 text-xs font-bold text-white"
        >
          Go to Open Roles
          <ArrowRight class="size-4" />
        </a>
      </div>
    {:else}
      <div class="mt-6 grid gap-4 md:grid-cols-2">
        {#each latestRolesPreview as job (job.public_slug)}
          <article
            class="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-all hover:border-[#9966CB]"
          >
            <div>
              <div class="flex flex-wrap items-center justify-between gap-2">
                <span
                  class="rounded-full bg-[#9966CB]/12 px-2.5 py-0.5 text-[11px] font-bold text-[#9966CB]"
                >
                  {formatTrackBadge(job.enrichment?.category)}
                </span>
                <span class="text-[11px] font-normal text-[#888888]">
                  {formatSourceLabel(job.source)}
                </span>
              </div>

              <h3 class="mt-3 text-base font-bold text-foreground group-hover:text-[#9966CB]">
                <a href={resolve('/jobs/[slug]', { slug: job.public_slug })} class="hover:underline">
                  {job.title}
                </a>
              </h3>

              <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-normal text-[#888888]">
                <a
                  href={resolve('/companies/[slug]', { slug: job.company_slug })}
                  class="inline-flex items-center gap-1 font-bold text-foreground hover:text-[#9966CB]"
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
            </div>

            <div class="mt-4 flex items-center justify-between border-t border-border pt-3.5">
              <a
                href={resolve('/jobs/[slug]', { slug: job.public_slug })}
                class="text-xs font-bold text-foreground hover:text-[#9966CB]"
              >
                View role details →
              </a>
              <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external ATS apply link -->
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 rounded-lg bg-[#9966CB] px-3 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90"
              >
                Apply
                <ArrowUpRight class="size-3.5" />
              </a>
            </div>
          </article>
        {/each}
      </div>

      <div class="mt-6 flex justify-center">
        <a
          href={resolve('/jobs')}
          class="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card px-6 text-sm font-bold text-foreground transition-colors hover:border-[#9966CB] hover:text-[#9966CB]"
        >
          <span>View All {totalOpenJobs} Open VC Roles</span>
          <ArrowRight class="size-4" />
        </a>
      </div>
    {/if}
  </section>

  <!-- ======================================================================= -->
  <!-- 4. FEATURED VENTURE CAPITAL FUNDS DIRECTORY PREVIEW                     -->
  <!-- ======================================================================= -->
  <section aria-labelledby="featured-funds-heading">
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <div class="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.14em] uppercase text-[#9966CB]">
          <span>^</span>
          <span>Venture Ecosystem Directory</span>
        </div>
        <h2 id="featured-funds-heading" class="mt-1.5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {totalFunds} Monitored Indian &amp; Global VC Funds
        </h2>
        <p class="mt-1 text-sm font-normal text-[#888888]">
          Covering {indiaFundsCount} Indian VC firms and {globalFundsCount} global multi-stage, seed, and deep-tech funds.
        </p>
      </div>
      <a
        href={resolve('/companies')}
        class="inline-flex items-center gap-1.5 text-sm font-bold text-[#9966CB] hover:underline"
      >
        Explore all {totalFunds} VC funds
        <ArrowRight class="size-4" />
      </a>
    </div>

    <div class="mt-6 grid gap-3.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {#each featuredFunds as fund (fund.slug)}
        <a
          href={resolve('/companies/[slug]', { slug: fund.slug })}
          class="group flex flex-col justify-between rounded-2xl border border-border bg-card p-4 transition-all hover:border-[#9966CB]"
        >
          <div>
            <div class="flex items-start justify-between gap-2">
              <div
                class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#9966CB]/12 text-xs font-bold text-[#9966CB]"
              >
                {fund.name.slice(0, 2).toUpperCase()}
              </div>
              {#if fund.job_count > 0}
                <span
                  class="rounded-full bg-[#9966CB] px-2.5 py-0.5 text-[11px] font-bold text-white"
                >
                  {fund.job_count} {fund.job_count === 1 ? 'role' : 'roles'}
                </span>
              {:else}
                <span
                  class="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-normal text-[#888888]"
                >
                  {fund.hq_country === 'in' ? 'India VC' : 'Global VC'}
                </span>
              {/if}
            </div>
            <h3 class="mt-3 text-sm font-bold text-foreground group-hover:text-[#9966CB]">
              {fund.name}
            </h3>
            {#if fund.tagline}
              <p class="mt-1 line-clamp-2 text-xs font-normal leading-relaxed text-[#888888]">
                {fund.tagline}
              </p>
            {/if}
          </div>
          <div class="mt-3 flex items-center justify-between pt-2 text-[11px] font-bold text-[#9966CB]">
            <span>View fund profile</span>
            <ArrowRight class="size-3" />
          </div>
        </a>
      {/each}
    </div>
  </section>

  <!-- ======================================================================= -->
  <!-- 5. COMMUNITY & AUTOMATION BANNER                                        -->
  <!-- ======================================================================= -->
  <section
    class="vc-caret-dark relative overflow-hidden rounded-2xl border border-[#1E1E1E] bg-[#1E1E1E] p-8 text-white sm:p-12"
  >
    <div class="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
      <div class="max-w-2xl">
        <div class="inline-flex items-center gap-2 rounded-full bg-[#9966CB]/20 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#9966CB]">
          <Globe class="size-3.5" />
          <span>VC Jobs Community &amp; Live Alerts</span>
        </div>
        <h2 class="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Never miss an opening at a top venture fund.
        </h2>
        <p class="mt-2 text-sm font-normal leading-relaxed text-[#888888] sm:text-base">
          New analyst, associate, principal, platform, and EIR openings are synced automatically from
          live VC ATS boards and shared with our community on WhatsApp.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external WhatsApp link -->
        <a
          href="https://chat.whatsapp.com/E7r0xi9u1qOE9v0YjbHcpM?s=cl&p=i&mlu=4"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex h-11 items-center gap-2 rounded-xl bg-[#9966CB] px-6 text-xs font-bold text-white transition-opacity hover:opacity-90"
        >
          <MessageCircle class="size-4" />
          <span>Join WhatsApp Alerts</span>
          <ArrowUpRight class="size-3.5" />
        </a>

        <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- mailto link -->
        <a
          href="mailto:Ozadhanvi99@gmail.com?subject=Post%20a%20VC%20job"
          class="inline-flex h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 text-xs font-bold text-white transition-colors hover:border-[#9966CB] hover:text-[#9966CB]"
        >
          <Plus class="size-4" />
          <span>Post a VC Role</span>
        </a>
      </div>
    </div>
  </section>
</div>

<style>
  .vc-caret-dark {
    background-image: radial-gradient(
        ellipse 60% 60% at 50% 50%,
        rgba(30, 30, 30, 0.96) 35%,
        rgba(30, 30, 30, 0.72) 100%
      ),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='140' viewBox='0 0 160 140' fill='none'%3E%3Cpath d='M80 14L138 112C141 117 136 123 130 121L80 100L30 121C24 123 19 117 22 112L80 14Z' stroke='%239966CB' stroke-opacity='0.28' stroke-width='3.5' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-size:
      100% 100%,
      160px 140px;
  }
</style>
