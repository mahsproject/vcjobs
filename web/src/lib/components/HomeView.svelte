<script lang="ts">
  import { resolve } from '$app/paths';
  import { ArrowRight, Building2, MessageCircle, Plus, Sparkles } from '@lucide/svelte';
  import { HOME_FAQ } from '#lib/homeFaq.js';

  const {
    stats,
  }: { stats: { jobs: number | null; companies: number | null; sources: number | null } } = $props();

  const pillars = [
    {
      n: '01',
      title: 'Direct from Venture Funds',
      body: 'Every opportunity is pulled directly from VC fund career boards and our curated community sheet — connecting candidates straight to the hiring fund.',
    },
    {
      n: '02',
      title: 'Structured by VC Career Track',
      body: 'Roles are organized across Investment Team, Platform & Value Creation, Portfolio Talent, Fund Operations, and Entrepreneur-in-Residence tracks.',
    },
    {
      n: '03',
      title: 'Real-Time Community Alerts',
      body: 'Because venture capital hiring windows are short and high-conviction, our WhatsApp updates channel alerts members as soon as new roles open.',
    },
  ];
</script>

<div class="py-8 sm:py-12">
  <section class="rounded-3xl border border-border bg-card p-8 sm:p-12">
    <span class="inline-flex items-center gap-1.5 rounded-full border border-[#9966CB]/35 bg-[#9966CB]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#9966CB]">
      <Sparkles class="size-3.5" />
      About VC Jobs
    </span>

    <h1 class="mt-5 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
      Good work deserves <span class="text-[#9966CB]">to be found.</span>
    </h1>

    <p class="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
      VC Jobs is the dedicated career discovery platform for the venture capital ecosystem —
      bringing together investment, platform, operations, and portfolio leadership roles across
      India, the United States, Europe, and global hubs.
    </p>

    <div class="mt-8 flex flex-wrap items-center gap-3">
      <a
        href={resolve('/')}
        class="inline-flex h-11 items-center gap-2 rounded-full bg-[#9966CB] px-6 text-xs font-bold text-white transition-opacity hover:opacity-90"
      >
        Explore Role Board
        <ArrowRight class="size-4" />
      </a>
      <a
        href={resolve('/companies')}
        class="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background px-6 text-xs font-bold text-foreground transition-colors hover:border-[#9966CB]"
      >
        <Building2 class="size-4" />
        View Venture Funds ({stats.companies ?? 14})
      </a>
      <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- mailto link -->
      <a
        href="mailto:Ozadhanvi99@gmail.com?subject=Post%20a%20VC%20job"
        class="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background px-6 text-xs font-bold text-foreground transition-colors hover:border-[#9966CB]"
      >
        <Plus class="size-4" />
        Post a job
      </a>
    </div>
  </section>

  <section class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
    {#each pillars as p (p.n)}
      <div class="rounded-2xl border border-border bg-card p-6">
        <span class="text-xs font-bold uppercase tracking-widest text-[#9966CB]">{p.n} / Pillar</span>
        <h2 class="mt-2 text-lg font-bold tracking-tight text-foreground">{p.title}</h2>
        <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
      </div>
    {/each}
  </section>

  <section class="mt-12 rounded-3xl border border-border bg-card p-8 sm:p-10">
    <p class="text-xs font-bold uppercase tracking-[0.16em] text-[#9966CB]">^ FAQ</p>
    <h2 class="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
      Frequently Asked Questions
    </h2>
    <dl class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {#each HOME_FAQ as item (item.question)}
        <div class="rounded-2xl border border-border bg-background p-5">
          <dt class="text-base font-bold tracking-tight text-foreground">{item.question}</dt>
          <dd class="mt-2 text-xs leading-relaxed text-muted-foreground">{item.answer}</dd>
        </div>
      {/each}
    </dl>
  </section>
</div>
