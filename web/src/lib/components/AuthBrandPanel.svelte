<script lang="ts">
  const metrics = [
    ['221+', 'Monitored VC Funds'],
    ['100+', 'Live Venture Roles'],
    ['9', 'Direct ATS & Sheet Feeds'],
  ] as const;

  const features = [
    [
      'Investment & Platform Roles',
      'Analyst, Associate, Principal, Operating Partner, and EIR mandates across India and global venture capital firms.',
    ],
    [
      'Direct ATS & Sheet Sync',
      'Every role is continuously synchronized from verified VC career portals and curated ecosystem sheets.',
    ],
    [
      'Instant Community Alerts',
      'Save searches, track applications, and join our WhatsApp community so you never miss a newly opened mandate.',
    ],
  ] as const;
</script>

<aside
  aria-label="About VC Jobs"
  class="relative hidden overflow-hidden border-r border-border bg-[#1E1E1E] p-12 text-white lg:flex lg:flex-col lg:justify-between"
>
  <div class="relative z-10 flex items-center gap-3">
    <img
      src="/logo-on-dark.png"
      alt="VC Jobs"
      class="h-8 w-auto object-contain"
    />
  </div>

  <div class="relative z-10 max-w-md space-y-8">
    <div class="space-y-3">
      <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9966CB]">
        Opportunities in Venture Capital
      </p>
      <p class="text-3xl font-bold leading-tight tracking-tight text-white">
        Good work deserves to be found.
      </p>
    </div>

    <dl class="grid grid-cols-3 gap-4 border-y border-white/10 py-5">
      {#each metrics as [value, label] (label)}
        <div>
          <dt class="text-xs text-[#888888]">{label}</dt>
          <dd class="mt-0.5 text-2xl font-bold tabular-nums tracking-tight text-white">{value}</dd>
        </div>
      {/each}
    </dl>

    <ul class="space-y-3 text-sm">
      {#each features as [title, body] (title)}
        <li class="flex gap-3">
          <span class="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#9966CB]" aria-hidden="true"></span>
          <span>
            <span class="font-bold text-white">{title}</span>
            <span class="text-[#CCCCCC]"> — {body}</span>
          </span>
        </li>
      {/each}
    </ul>
  </div>

  <p class="relative z-10 text-xs text-[#888888]">
    Direct from VC career portals &amp; curated community sheets · Updated every 5 minutes
  </p>
</aside>
