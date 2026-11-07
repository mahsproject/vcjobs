<script lang="ts">
  // Per-page document metadata: title, description, canonical, and Open
  // Graph / Twitter Card tags. One <Seo> per route; rendered server-side so
  // crawlers and link-preview bots get it in the initial HTML.
  import { page } from '$app/state';

  let {
    title,
    description,
    canonical,
    ogType = 'website',
    image,
    robots,
  }: {
    title: string;
    description?: string;
    canonical?: string;
    ogType?: string;
    image?: string;
    robots?: string;
  } = $props();

  const previewImage = $derived(image ?? `${page.url.origin}/og.png`);
</script>

<svelte:head>
  <title>{title}</title>
  {#if description}
    <meta name="description" content={description} />
  {/if}
  {#if canonical}
    <link rel="canonical" href={canonical} />
    <meta property="og:url" content={canonical} />
  {/if}
  {#if robots}
    <meta name="robots" content={robots} />
  {/if}
  <meta property="og:title" content={title} />
  {#if description}
    <meta property="og:description" content={description} />
  {/if}
  <meta property="og:type" content={ogType} />
  <meta property="og:site_name" content="VC Jobs" />
  <meta property="og:image" content={previewImage} />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={title} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  {#if description}
    <meta name="twitter:description" content={description} />
  {/if}
  <meta name="twitter:image" content={previewImage} />
</svelte:head>
