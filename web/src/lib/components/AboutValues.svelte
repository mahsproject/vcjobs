<script lang="ts">
  const values = [
    {
      n: '01',
      title: 'Built for the venture ecosystem.',
      body: 'Breaking into venture capital traditionally depended on closed networks and fragmented LinkedIn posts. VC Jobs brings every active Analyst, Associate, Principal, Platform, and EIR role into one transparent directory.',
    },
    {
      n: '02',
      title: 'Curated & verified listings.',
      body: 'We combine automated feeds from leading venture funds with direct community submissions so candidates can apply directly to the hiring firm.',
    },
    {
      n: '03',
      title: 'Zero noise, high signal.',
      body: 'Every listing is categorized by VC career track, seniority level, work mode, and geographic hub so you can focus on roles that match your background.',
    },
  ];
</script>

<section class="pb-12">
  <div class="rounded-3xl border border-border bg-[#1E1E1E] p-8 text-white sm:p-10">
    <p class="text-xs font-bold uppercase tracking-[0.16em] text-[#9966CB]">^ Our Principles</p>
    <h2 class="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Why VC Jobs Exists</h2>
    <ol class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
      {#each values as v (v.n)}
        <li class="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <span class="text-xs font-bold text-[#9966CB]">{v.n}</span>
          <h3 class="mt-2 text-base font-bold tracking-tight text-white">{v.title}</h3>
          <p class="mt-2 text-xs leading-relaxed text-[#CCCCCC]">{v.body}</p>
        </li>
      {/each}
    </ol>
  </div>
</section>
