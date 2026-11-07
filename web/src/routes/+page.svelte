<script lang="ts">
  import { page } from '$app/state';
  import HomeLandingView from '#lib/components/HomeLandingView.svelte';
  import Seo from '#lib/components/Seo.svelte';
  import { jsonLdScript, siteOrganizationJsonLd, websiteJsonLd } from '#lib/seo.js';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const origin = $derived(page.url.origin);
  const jsonLd = $derived(jsonLdScript([websiteJsonLd(origin), siteOrganizationJsonLd(origin)]));
</script>

<Seo
  title="VC Jobs — Curated Opportunities in Venture Capital"
  description="Good work deserves to be found. Discover live investment, platform, operations, and portfolio roles across top venture capital funds worldwide."
  canonical="{origin}/"
/>

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- non-executable JSON-LD built by jsonLdScript -->
  {@html jsonLd}
</svelte:head>

<div class="mx-auto w-full max-w-7xl px-4 sm:px-6">
  <HomeLandingView
    counts={data.counts}
    scale={data.scale}
    initialJobs={data.jobs}
    initialCompanies={data.companies}
  />
</div>
