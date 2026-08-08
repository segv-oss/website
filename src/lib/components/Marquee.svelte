<script lang="ts">
  const tickerItems = [
    "FINISHED MORE. PLANNED LESS.",
    "SEGV SOFTWARE STUDIO",
    "OPEN SOURCE BY CONVICTION",
    "HIGH-PERFORMANCE ARCHITECTURE",
    "EST. 2026"
  ];
</script>

<div class="w-full border-y border-[var(--border-color)] bg-[var(--bg-primary)] py-6 overflow-hidden select-none">
  <div class="flex whitespace-nowrap animate-marquee">
    {#each Array(4) as _}
      <div class="flex items-center gap-12 font-display text-2xl sm:text-4xl font-extrabold uppercase text-[var(--text-primary)] tracking-tight px-6">
        {#each tickerItems as item}
          <span>{item}</span>
          <span class="text-[var(--text-muted)] font-normal text-xl">•</span>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    display: flex;
    width: 200%;
    animation: marquee 25s linear infinite;
  }
  .animate-marquee:hover {
    animation-play-state: paused;
  }
</style>
