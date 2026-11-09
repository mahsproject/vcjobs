<script lang="ts">
  import { page } from '$app/state';
  import { resolve } from '$app/paths';
  import { ArrowLeft, Search } from '@lucide/svelte';

  const COPY: Record<number, { title: string; detail: string }> = {
    404: {
      title: 'Page not found',
      detail: 'The link may have expired, or the mandate may have been filled and removed from the directory.',
    },
    410: {
      title: 'Mandate closed',
      detail: 'This role is no longer open at the venture fund.',
    },
    429: {
      title: 'Too many requests',
      detail: 'Give it a moment and refresh the page.',
    },
  };

  const status = $derived(page.status);
  const copy = $derived(
    COPY[status] ?? {
      title: 'Something went wrong',
      detail:
        status >= 500
          ? 'The server hit an unexpected error. Try again in a moment.'
          : (page.error?.message ?? 'The request could not be completed.'),
    },
  );
</script>

<svelte:head>
  <title>{status} — {copy.title} · VC Jobs</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="mx-auto flex max-w-xl flex-col items-center px-4 py-16 text-center sm:py-24">
  <div class="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 sm:p-10">
    <span class="rounded-md bg-[#9966CB]/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#9966CB] tabular-nums">
      HTTP {status}
    </span>
    <h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{copy.title}</h1>
    <p class="max-w-md text-sm leading-relaxed text-[#888888]">{copy.detail}</p>
    <div class="mt-3 flex flex-wrap items-center justify-center gap-2.5">
      <a
        href={resolve('/jobs')}
        class="inline-flex h-10 items-center gap-2 rounded-lg bg-[#9966CB] px-5 text-xs font-bold text-white transition-colors hover:bg-[#8652B8]"
      >
        <Search class="size-3.5" />
        <span>Browse Open Roles</span>
      </a>
      <a
        href={resolve('/')}
        class="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-5 text-xs font-bold text-foreground transition-colors hover:border-[#9966CB]"
      >
        <ArrowLeft class="size-3.5" />
        <span>Back to Overview</span>
      </a>
    </div>
  </div>
</div>
