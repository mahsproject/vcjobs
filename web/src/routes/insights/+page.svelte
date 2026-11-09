<script lang="ts">
  import { page } from '$app/state';
  import { resolve } from '$app/paths';
  import { ArrowRight, Building2, BarChart3 } from '@lucide/svelte';
  import RoleCountryGrid from '#lib/components/RoleCountryGrid.svelte';
  import Seo from '#lib/components/Seo.svelte';
  import { categoryLabel } from '#lib/labels.js';
  import { breadcrumbJsonLd, collectionPageJsonLd, jsonLdScript } from '#lib/seo.js';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const origin = $derived(page.url.origin);
  const gridOpen = $derived(
    new Map((data.grid?.cells ?? []).filter((c) => c.country === '').map((c) => [c.category, c.open_count])),
  );
  const displayTracks = $derived.by(() => {
    const fromGrid = (data.grid?.cells ?? [])
      .filter((c) => c.country === '' && c.open_count > 0)
      .sort((a, b) => b.open_count - a.open_count)
      .map((c) => ({
        category: c.category,
        label: categoryLabel(c.category),
        openCount: c.open_count,
      }));
    return fromGrid.length > 0 ? fromGrid : data.covered;
  });
  const canonical = $derived(`${origin}/insights`);
  const description =
    'Aggregate venture capital market data from VC Jobs: hiring velocity, in-demand skills, and mandate distribution across India and global VC hubs.';
  const sections = [
    { path: 'salary', label: 'salaries' },
    { path: 'skills', label: 'skills' },
    { path: 'roles', label: 'roles' },
  ];
  const items = $derived(
    data.covered.flatMap((c) =>
      sections.map((s) => ({
        name: `${c.label} ${s.label}`,
        url: `${origin}/insights/${s.path}/${c.category}`,
      })),
    ),
  );
  const jsonLd = $derived(
    jsonLdScript([
      collectionPageJsonLd('Venture Capital Market Insights', description, canonical, items),
      breadcrumbJsonLd([
        { name: 'VC Jobs', url: `${origin}/` },
        { name: 'Insights', url: canonical },
      ]),
    ]),
  );
</script>

<Seo title="Venture Capital Market Insights — VC Jobs" {description} {canonical} />
<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- non-executable JSON-LD from jsonLdScript, which escapes `<` -->
  {@html jsonLd}
</svelte:head>

<div class="flex flex-col">
  <!-- ARCHITECTURAL HEADER -->
  <section class="vc-caret-light border-b border-border bg-card">
    <div class="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div class="flex flex-col gap-2">
          <span class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9966CB]">
            Market Telemetry
          </span>
          <h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Venture Capital Ecosystem Insights
          </h1>
          <p class="max-w-2xl text-sm text-[#888888]">
            {description}
          </p>
        </div>

        <a
          href={resolve('/insights/companies')}
          class="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-4 text-xs font-bold text-foreground transition-colors hover:border-[#9966CB] hover:text-[#9966CB]"
        >
          <Building2 class="size-4 text-[#9966CB]" />
          <span>VC Fund Hiring Velocity</span>
          <ArrowRight class="size-3.5" />
        </a>
      </div>
    </div>
  </section>

  <div class="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
    {#if data.grid}
      <div class="rounded-xl border border-border bg-card p-5 sm:p-6">
        <RoleCountryGrid data={data.grid} />
      </div>
    {/if}

    {#if displayTracks.length === 0}
      <div class="rounded-xl border border-border bg-card p-8 text-center text-sm text-[#888888]">
        Insights are being computed — check back shortly.
      </div>
    {:else}
      <section class="flex flex-col gap-4">
        <div>
          <span class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9966CB]">
            Functional Breakdown
          </span>
          <h2 class="text-xl font-bold text-foreground">
            Drill Down by Venture Track
          </h2>
        </div>

        <div class="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card sm:grid-cols-2 sm:divide-x lg:grid-cols-3">
          {#each displayTracks as c (c.category)}
            <div class="flex flex-col justify-between gap-4 border-b border-border p-5">
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-2.5">
                  <div class="flex size-9 items-center justify-center rounded-lg border border-border bg-secondary/60 text-[#9966CB]">
                    <BarChart3 class="size-4" />
                  </div>
                  <div>
                    <h3 class="text-base font-bold text-foreground">{c.label}</h3>
                    <p class="text-xs text-[#888888]">
                      {(gridOpen.get(c.category) ?? c.openCount).toLocaleString('en-US')} open mandates
                    </p>
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 border-t border-border/60 pt-3 text-xs font-bold">
                <a
                  href="{resolve('/jobs')}?category={c.category}"
                  class="rounded-md bg-[#9966CB]/10 px-2.5 py-1 text-[#9966CB] transition-colors hover:bg-[#9966CB] hover:text-white"
                >
                  Open Mandates
                </a>
                <a
                  href={resolve('/insights/roles/[category]', { category: c.category })}
                  class="rounded-md border border-border bg-background px-2.5 py-1 text-foreground transition-colors hover:border-[#9966CB] hover:text-[#9966CB]"
                >
                  Seniority
                </a>
                <a
                  href={resolve('/insights/skills/[category]', { category: c.category })}
                  class="rounded-md border border-border bg-background px-2.5 py-1 text-[#888888] transition-colors hover:border-[#9966CB] hover:text-foreground"
                >
                  Core Skills
                </a>
              </div>
            </div>
          {/each}
        </div>
      </section>
    {/if}
  </div>
</div>
