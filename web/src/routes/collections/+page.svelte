<script lang="ts">
  import { page } from '$app/state';
  import { resolve } from '$app/paths';
  import { Search, ArrowRight, Layers, MessageCircle, Plus } from '@lucide/svelte';
  import Seo from '#lib/components/Seo.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let query = $state('');
  const needle = $derived(query.trim().toLowerCase());

  const visibleCollections = $derived(
    data.collections.filter(
      (c) =>
        !needle ||
        c.title.toLowerCase().includes(needle) ||
        c.description.toLowerCase().includes(needle) ||
        c.category.toLowerCase().includes(needle),
    ),
  );

  const canonical = $derived(`${page.url.origin}/collections`);
</script>

<Seo
  title="Curated Venture Capital Collections · VC Jobs"
  description="Browse curated collections of venture capital roles by fund stage, geography (India & Global), and career track (Investment, Platform, EIR, Talent)."
  {canonical}
/>

<div class="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
  <header
    class="dot-grid relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8"
  >
    <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
      <div>
        <div class="inline-flex items-center gap-2 rounded-full bg-[#9966CB]/12 px-3 py-1">
          <span class="text-xs font-bold leading-none text-[#9966CB]">^</span>
          <span class="text-xs font-bold tracking-[0.12em] uppercase text-[#9966CB]">
            Curated Venture Collections
          </span>
        </div>
        <h1 class="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
          Explore VC Roles by Track &amp; Ecosystem
        </h1>
        <p class="mt-2 max-w-2xl text-sm font-normal leading-relaxed text-[#888888] sm:text-base">
          Curated slices across {data.totalFunds} monitored Indian and global venture capital funds and
          {data.totalJobs} live openings.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2.5">
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

    <div class="relative mt-6 max-w-md">
      <Search
        class="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#888888]"
      />
      <input
        type="search"
        bind:value={query}
        placeholder="Filter collections (India, Seed, Investment, Platform)..."
        aria-label="Search collections"
        class="h-10 w-full rounded-xl border border-border bg-background pr-3 pl-10 text-sm font-normal text-foreground focus:border-[#9966CB] focus:outline-none"
      />
    </div>
  </header>

  <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {#each visibleCollections as col (col.slug)}
      <a
        href={resolve('/collections/[slug]', { slug: col.slug })}
        class="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:border-[#9966CB]"
      >
        <div>
          <div class="flex items-center justify-between gap-2">
            <span
              class="inline-flex items-center gap-1.5 rounded-full bg-[#9966CB]/12 px-3 py-1 text-[11px] font-bold text-[#9966CB]"
            >
              <Layers class="size-3" />
              {col.category}
            </span>
            <span class="text-xs font-bold text-foreground">
              {col.jobCount} {col.jobCount === 1 ? 'role' : 'roles'}
            </span>
          </div>

          <h2 class="mt-4 text-lg font-bold text-foreground group-hover:text-[#9966CB]">
            {col.title}
          </h2>
          <p class="mt-2 text-xs font-normal leading-relaxed text-[#888888]">
            {col.description}
          </p>
        </div>

        <div class="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs">
          <span class="font-normal text-[#888888]">{col.fundCount} VC funds covered</span>
          <span class="inline-flex items-center gap-1 font-bold text-[#9966CB]">
            View roles
            <ArrowRight class="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </a>
    {/each}
  </div>
</div>
