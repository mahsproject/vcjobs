<script lang="ts">
  import { page } from '$app/state';
  import Seo from '#lib/components/Seo.svelte';
  import StatusBoard from '#lib/components/StatusBoard.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const canonical = $derived(`${page.url.origin}/status`);
</script>

<Seo
  title="System Status — VC Jobs"
  description="Live status of VC Jobs: platform availability, API telemetry, and the health of every ATS and Google Sheet source adapter crawling venture capital job boards."
  {canonical}
/>

<div class="flex flex-col">
  <section class="vc-caret-light border-b border-border bg-card">
    <div class="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div class="flex flex-col gap-2">
        <span class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9966CB]">
          Platform Telemetry
        </span>
        <h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          System &amp; Ingestion Status
        </h1>
        <p class="max-w-2xl text-sm text-[#888888]">
          Live operational health of the VC Jobs platform and the automated ATS / Google Sheet crawl adapters behind the directory.
        </p>
      </div>
    </div>
  </section>

  <div class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
    <StatusBoard status={data.status} />
  </div>
</div>
