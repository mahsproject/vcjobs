<script lang="ts">
  import { resolve } from '$app/paths';
  import {
    Briefcase,
    Building2,
    Globe,
    Layers,
    MessageCircle,
    Plus,
    Sparkles,
    ArrowUpRight,
    ArrowRight,
    Database,
    RefreshCw,
    ShieldCheck,
  } from '@lucide/svelte';
</script>

<svelte:head>
  <title>About VC Jobs — Opportunities in Venture Capital</title>
  <meta
    name="description"
    content="Good work deserves to be found. Learn how VC Jobs curates investment, platform, operations, and portfolio opportunities across 221+ venture capital firms."
  />
</svelte:head>

<div class="flex flex-col">
  <!-- ARCHITECTURAL HERO -->
  <section class="vc-caret-light border-b border-border bg-card">
    <div class="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div class="flex flex-col gap-5">
        <div class="flex items-center gap-3">
          <img
            src="/logo-on-light.png"
            alt="VC Jobs"
            class="h-7 w-auto object-contain dark:hidden"
          />
          <img
            src="/logo-on-dark.png"
            alt="VC Jobs"
            class="hidden h-7 w-auto object-contain dark:block"
          />
          <span class="h-4 w-px bg-border" aria-hidden="true"></span>
          <span class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9966CB]">
            Opportunities in Venture Capital
          </span>
        </div>

        <h1 class="max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
          Good work deserves to be found.
        </h1>

        <p class="max-w-3xl text-sm leading-relaxed text-[#888888] sm:text-base">
          Venture capital roles are notoriously fragmented across boutique fund websites, private partner networks,
          regional ATS portals, and closed WhatsApp groups. <strong class="font-bold text-foreground">VC Jobs</strong> brings transparency,
          structure, and real-time synchronization to career discovery across the Indian and global venture capital ecosystem.
        </p>

        <div class="flex flex-wrap items-center gap-2.5 pt-1">
          <a
            href={resolve('/jobs')}
            class="inline-flex h-10 items-center gap-2 rounded-lg bg-[#9966CB] px-5 text-xs font-bold text-white transition-colors hover:bg-[#8652B8]"
          >
            <span>Explore Open Roles</span>
            <ArrowRight class="size-3.5" />
          </a>
          <a
            href={resolve('/companies')}
            class="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-5 text-xs font-bold text-foreground transition-colors hover:border-[#9966CB] hover:text-[#9966CB]"
          >
            <span>Browse 221+ VC Funds</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <div class="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 sm:py-14">
    <!-- SECTION 1: DATA & INGESTION ARCHITECTURE -->
    <section class="flex flex-col gap-4">
      <div>
        <span class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9966CB]">
          Platform Architecture
        </span>
        <h2 class="text-xl font-bold text-foreground sm:text-2xl">
          How VC Jobs Indexes the Ecosystem
        </h2>
      </div>

      <div class="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card md:grid-cols-3 md:divide-x md:divide-y-0">
        <div class="flex flex-col gap-3 p-6">
          <div class="flex size-9 items-center justify-center rounded-lg border border-border bg-secondary/60 text-[#9966CB]">
            <Database class="size-4" />
          </div>
          <h3 class="text-base font-bold text-foreground">
            Direct ATS Synchronization
          </h3>
          <p class="text-xs leading-relaxed text-[#888888]">
            Automated crawlers poll official venture fund career boards across Greenhouse, Lever, Ashby, Workable, SmartRecruiters, Getro, Consider, and Zoho Recruit every 5 minutes.
          </p>
        </div>

        <div class="flex flex-col gap-3 p-6">
          <div class="flex size-9 items-center justify-center rounded-lg border border-border bg-secondary/60 text-[#9966CB]">
            <RefreshCw class="size-4" />
          </div>
          <h3 class="text-base font-bold text-foreground">
            Curated Ecosystem Sheet Sync
          </h3>
          <p class="text-xs leading-relaxed text-[#888888]">
            Verified community mandates and partner-shared openings from the master VC Jobs Google Sheet are ingested, normalized, and enriched alongside direct ATS feeds.
          </p>
        </div>

        <div class="flex flex-col gap-3 p-6">
          <div class="flex size-9 items-center justify-center rounded-lg border border-border bg-secondary/60 text-[#9966CB]">
            <ShieldCheck class="size-4" />
          </div>
          <h3 class="text-base font-bold text-foreground">
            Deduplication &amp; Verification
          </h3>
          <p class="text-xs leading-relaxed text-[#888888]">
            Every role is validated against canonical application URLs, deduplicated across aggregators, and mapped to structured venture tracks and fund dossiers.
          </p>
        </div>
      </div>
    </section>

    <!-- SECTION 2: FOUR CORE VENTURE CAREER TRACKS -->
    <section class="flex flex-col gap-4">
      <div>
        <span class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9966CB]">
          Taxonomy
        </span>
        <h2 class="text-xl font-bold text-foreground sm:text-2xl">
          Four Core Venture Career Tracks
        </h2>
      </div>

      <div class="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card sm:grid-cols-2 sm:divide-x">
        <div class="flex flex-col gap-2 border-b border-border p-6">
          <div class="flex items-center gap-2 text-[#9966CB]">
            <Briefcase class="size-4" />
            <span class="text-xs font-bold uppercase tracking-wider">Track 01</span>
          </div>
          <h3 class="text-base font-bold text-foreground">Investment Team</h3>
          <p class="text-xs leading-relaxed text-[#888888]">
            Pre-MBA Analysts, Associates, Senior Associates, Vice Presidents, and Principals focused on deal sourcing, thesis generation, due diligence, and board stewardship.
          </p>
        </div>

        <div class="flex flex-col gap-2 border-b border-border p-6">
          <div class="flex items-center gap-2 text-[#9966CB]">
            <Layers class="size-4" />
            <span class="text-xs font-bold uppercase tracking-wider">Track 02</span>
          </div>
          <h3 class="text-base font-bold text-foreground">Platform &amp; Value Creation</h3>
          <p class="text-xs leading-relaxed text-[#888888]">
            Operating Partners, Portfolio Growth leads, GTM Advisors, Finance/Legal Fund Ops, and Developer Relations specialists accelerating portfolio companies post-investment.
          </p>
        </div>

        <div class="flex flex-col gap-2 p-6">
          <div class="flex items-center gap-2 text-[#9966CB]">
            <Sparkles class="size-4" />
            <span class="text-xs font-bold uppercase tracking-wider">Track 03</span>
          </div>
          <h3 class="text-base font-bold text-foreground">Portfolio &amp; Founders&rsquo; Office</h3>
          <p class="text-xs leading-relaxed text-[#888888]">
            Entrepreneurs-in-Residence (EIR), Venture Fellows, and Chief of Staff roles incubated directly inside venture studios and top-tier funds.
          </p>
        </div>

        <div class="flex flex-col gap-2 p-6">
          <div class="flex items-center gap-2 text-[#9966CB]">
            <Globe class="size-4" />
            <span class="text-xs font-bold uppercase tracking-wider">Track 04</span>
          </div>
          <h3 class="text-base font-bold text-foreground">Talent, Brand &amp; Investor Relations</h3>
          <p class="text-xs leading-relaxed text-[#888888]">
            Executive Talent Partners, Head of Brand &amp; Content, Ecosystem Community leads, and Institutional LP Relations managers.
          </p>
        </div>
      </div>
    </section>

    <!-- SECTION 3: DARK CTA BANNER -->
    <section class="vc-caret-dark overflow-hidden rounded-xl border border-border bg-[#1E1E1E] p-6 text-white sm:p-10">
      <div class="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div class="flex flex-col gap-2">
          <span class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9966CB]">
            Connect With VC Jobs
          </span>
          <h2 class="text-xl font-bold text-white sm:text-2xl">
            Hiring for your venture fund or searching for your next role?
          </h2>
          <p class="max-w-xl text-sm text-[#CCCCCC]">
            Join our WhatsApp community for real-time role alerts, or reach out directly to feature an open mandate on the VC Jobs directory.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external WhatsApp link -->
          <a
            href="https://chat.whatsapp.com/E7r0xi9u1qOE9v0YjbHcpM?s=cl&p=i&mlu=4"
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
            href="mailto:Ozadhanvi99@gmail.com?subject=Post%20a%20VC%20job"
            class="inline-flex h-10 items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 text-xs font-bold text-white transition-colors hover:border-[#9966CB]"
          >
            <Plus class="size-4" />
            <span>Post a job</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</div>
