<script lang="ts">
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import {
    ArrowLeft,
    ArrowUpRight,
    Briefcase,
    Building2,
    FileSpreadsheet,
    Globe,
    Layers,
    MapPin,
    MessageCircle,
    Plus,
    Search,
  } from '@lucide/svelte';
  import Seo from '#lib/components/Seo.svelte';
  import { breadcrumbJsonLd, collectionPageJsonLd, jobListItems, jsonLdScript } from '#lib/seo.js';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let searchQuery = $state('');

  const filteredJobs = $derived.by(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return data.jobs;
    return data.jobs.filter((job) => {
      const hay = `${job.title} ${job.company} ${job.location} ${job.skills.join(' ')}`.toLowerCase();
      return hay.includes(q);
    });
  });

  const origin = $derived(page.url.origin);
  const canonical = $derived(`${origin}/collections/${data.slug}`);
  const pageTitle = $derived(`${data.collection.title} (${data.jobs.length} Roles) · VC Jobs`);

  const jsonLd = $derived(
    jsonLdScript([
      collectionPageJsonLd(
        data.collection.title,
        data.collection.description,
        canonical,
        jobListItems(data.jobs.slice(0, 20), origin),
      ),
      breadcrumbJsonLd([
        { name: 'VC Jobs', url: `${origin}/` },
        { name: 'Collections', url: `${origin}/collections` },
        { name: data.collection.title, url: canonical },
      ]),
    ]),
  );

  function formatWorkMode(mode?: string): string {
    if (mode === 'remote') return 'Remote';
    if (mode === 'hybrid') return 'Hybrid';
    return 'On-site';
  }
</script>

<Seo title={pageTitle} description={data.collection.description} {canonical} />

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- non-executable JSON-LD built by jsonLdScript -->
  {@html jsonLd}
</svelte:head>

<div class="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
  <nav aria-label="Breadcrumb" class="mb-6">
    <a
      href={resolve('/collections')}
      class="inline-flex items-center gap-1.5 text-xs font-bold text-[#888888] transition-colors hover:text-[#9966CB]"
    >
      <ArrowLeft class="size-3.5" />
      <span>Back to all VC collections</span>
    </a>
  </nav>

  <header
    class="dot-grid relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8"
  >
    <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
      <div>
        <div class="inline-flex items-center gap-2 rounded-full bg-[#9966CB]/12 px-3 py-1">
          <Layers class="size-3.5 text-[#9966CB]" />
          <span class="text-xs font-bold tracking-[0.12em] uppercase text-[#9966CB]">
            {data.collection.category}
          </span>
        </div>
        <h1 class="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
          {data.collection.title}
        </h1>
        <p class="mt-2 max-w-2xl text-sm font-normal leading-relaxed text-[#888888] sm:text-base">
          {data.collection.description}
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
        bind:value={searchQuery}
        placeholder="Filter roles in this collection..."
        aria-label="Filter roles in this collection"
        class="h-10 w-full rounded-xl border border-border bg-background pr-3 pl-10 text-sm font-normal text-foreground focus:border-[#9966CB] focus:outline-none"
      />
    </div>
  </header>

  <section class="mt-8" aria-labelledby="collection-roles-heading">
    <div class="mb-4 flex items-center justify-between">
      <h2 id="collection-roles-heading" class="text-lg font-bold text-foreground">
        Open Roles ({filteredJobs.length})
      </h2>
      <a
        href={resolve('/jobs')}
        class="text-xs font-bold text-[#9966CB] hover:underline"
      >
        Browse all roles →
      </a>
    </div>

    {#if filteredJobs.length === 0}
      <div class="rounded-2xl border border-border bg-card p-10 text-center">
        <p class="text-base font-bold text-foreground">No matching roles found in this collection</p>
        <p class="mt-1 text-xs font-normal text-[#888888]">
          Try clearing your search filter or explore all open roles across 221 venture funds.
        </p>
      </div>
    {:else}
      <div class="grid gap-4">
        {#each filteredJobs as job (job.public_slug)}
          <article
            class="group flex flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-[#9966CB] sm:flex-row sm:items-center sm:p-6"
          >
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <span
                  class="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-[11px] font-normal text-[#888888]"
                >
                  {#if job.source === 'google_sheets'}
                    <FileSpreadsheet class="size-3 text-[#9966CB]" />
                    Google Sheet Sync
                  {:else}
                    <Globe class="size-3 text-[#9966CB]" />
                    Live VC Career Board
                  {/if}
                </span>
              </div>

              <h3 class="mt-2 text-lg font-bold text-foreground group-hover:text-[#9966CB]">
                <a href={resolve('/jobs/[slug]', { slug: job.public_slug })} class="hover:underline">
                  {job.title}
                </a>
              </h3>

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
            </div>

            <div class="flex shrink-0 items-center gap-2.5">
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
                class="inline-flex h-10 items-center justify-center rounded-xl border border-border px-3.5 text-xs font-bold text-foreground transition-colors hover:border-[#9966CB] hover:text-[#9966CB]"
              >
                Details
              </a>
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </section>

  {#if data.funds.length > 0}
    <section class="mt-12" aria-labelledby="collection-funds-heading">
      <div class="mb-4 flex items-center justify-between">
        <h2 id="collection-funds-heading" class="text-lg font-bold text-foreground">
          Featured Venture Funds in This Collection
        </h2>
        <a
          href={resolve('/companies')}
          class="text-xs font-bold text-[#9966CB] hover:underline"
        >
          View all 221 funds →
        </a>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {#each data.funds as fund (fund.slug)}
          <a
            href={resolve('/companies/[slug]', { slug: fund.slug })}
            class="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-all hover:border-[#9966CB]"
          >
            <div>
              <div class="flex items-center justify-between gap-2">
                <h3 class="text-base font-bold text-foreground group-hover:text-[#9966CB]">
                  {fund.name}
                </h3>
                <span class="rounded-full bg-[#9966CB]/12 px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#9966CB]">
                  {fund.hq_country === 'in' ? 'India' : fund.hq_country.toUpperCase()}
                </span>
              </div>
              <p class="mt-2 line-clamp-2 text-xs font-normal leading-relaxed text-[#888888]">
                {fund.tagline}
              </p>
            </div>
          </a>
        {/each}
      </div>
    </section>
  {/if}
</div>
