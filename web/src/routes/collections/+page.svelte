<script lang="ts">
  import { resolve } from '$app/paths';
  import { Layers, ArrowRight, Building2, Briefcase, Search } from '@lucide/svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  interface CollectionEntry {
    slug: string;
    title?: string;
    name?: string;
    category?: string;
    tagline?: string;
    description?: string;
    jobCount?: number;
    job_count?: number;
    fundCount?: number;
    company_count?: number;
  }

  let filterText = $state('');
  const allCollections = $derived<CollectionEntry[]>((data.collections ?? []) as CollectionEntry[]);

  const filtered = $derived.by(() => {
    const q = filterText.trim().toLowerCase();
    if (!q) return allCollections;
    return allCollections.filter((c) =>
      `${c.title ?? c.name ?? ''} ${c.category ?? c.tagline ?? ''} ${c.description ?? ''}`.toLowerCase().includes(q),
    );
  });
</script>

<svelte:head>
  <title>Curated Venture Capital Collections — VC Jobs</title>
  <meta
    name="description"
    content="Explore curated collections of venture capital roles and funds by stage, geography, and track."
  />
</svelte:head>

<div class="flex flex-col">
  <!-- ARCHITECTURAL HEADER -->
  <section class="vc-caret-light border-b border-border bg-card">
    <div class="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div class="flex flex-col gap-2">
          <span class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9966CB]">
            Curated Tracks
          </span>
          <h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Venture Capital Collections ({allCollections.length})
          </h1>
          <p class="max-w-2xl text-sm text-[#888888]">
            Focused views of the venture capital landscape — organized by investment stage, regional ecosystem, and functional career track.
          </p>
        </div>

        <div class="relative w-full max-w-sm">
          <Search class="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#888888]" />
          <input
            type="search"
            bind:value={filterText}
            placeholder="Filter collections..."
            aria-label="Filter collections"
            class="h-10 w-full rounded-lg border border-border bg-background pr-4 pl-10 text-sm text-foreground placeholder:text-[#888888] focus:border-[#9966CB] focus:outline-none focus:ring-2 focus:ring-[#9966CB]/20"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- COLLECTIONS MATRIX -->
  <div class="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
    {#if filtered.length > 0}
      <div class="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card md:grid-cols-2 md:divide-x lg:grid-cols-3">
        {#each filtered as col (col.slug)}
          <a
            href={resolve('/collections/[slug]', { slug: col.slug })}
            class="group flex flex-col justify-between gap-5 border-b border-border p-6 transition-colors hover:bg-secondary/35"
          >
            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between">
                <div class="flex size-10 items-center justify-center rounded-lg border border-border bg-secondary/60 text-[#9966CB] transition-colors group-hover:border-[#9966CB] group-hover:bg-[#9966CB] group-hover:text-white">
                  <Layers class="size-4" />
                </div>
                <div class="flex items-center gap-2 text-xs">
                  <span class="inline-flex items-center gap-1 rounded-md bg-[#9966CB]/12 px-2 py-0.5 font-bold tabular-nums text-[#9966CB]">
                    <Briefcase class="size-3" />
                    {col.jobCount ?? col.job_count ?? 0} {(col.jobCount ?? col.job_count ?? 0) === 1 ? 'role' : 'roles'}
                  </span>
                  <span class="inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5 tabular-nums text-[#888888]">
                    <Building2 class="size-3" />
                    {col.fundCount ?? col.company_count ?? 0} funds
                  </span>
                </div>
              </div>

              <div class="flex flex-col gap-1">
                <h2 class="text-base font-bold text-foreground transition-colors group-hover:text-[#9966CB]">
                  {col.title ?? col.name}
                </h2>
                {#if col.category || col.tagline}
                  <p class="text-xs font-bold text-[#9966CB]">
                    {col.category ?? col.tagline}
                  </p>
                {/if}
              </div>

              {#if col.description}
                <p class="line-clamp-3 text-xs leading-relaxed text-[#888888]">
                  {col.description}
                </p>
              {/if}
            </div>

            <div class="flex items-center justify-between border-t border-border/60 pt-3 text-xs font-bold text-foreground transition-colors group-hover:text-[#9966CB]">
              <span>Explore collection</span>
              <ArrowRight class="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </a>
        {/each}
      </div>
    {:else}
      <div class="rounded-xl border border-border bg-card p-10 text-center text-sm text-[#888888]">
        No collections match "{filterText}".
      </div>
    {/if}
  </div>
</div>
