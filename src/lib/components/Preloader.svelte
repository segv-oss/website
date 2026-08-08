<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  let progress = $state(0);
  let isDone = $state(false);
  let loaderRef = $state<HTMLDivElement | undefined>(undefined);
  let curtainRef = $state<HTMLDivElement | undefined>(undefined);

  onMount(() => {
    const duration = 1600;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      progress = pct;

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          if (curtainRef) {
            gsap.to(curtainRef, {
              yPercent: -100,
              duration: 0.9,
              ease: "power4.inOut",
              onComplete: () => {
                isDone = true;
              }
            });
          }
        }, 200);
      }
    }, 20);
  });
</script>

{#if !isDone}
  <div 
    bind:this={curtainRef}
    class="fixed inset-0 z-[99999] bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col justify-between p-8 sm:p-16 select-none overflow-hidden"
  >
    <!-- Top Identity -->
    <div class="flex items-center justify-between font-sans text-xs text-[var(--text-muted)] tracking-widest uppercase">
      <span>SEGV STUDIO</span>
      <span>INDEPENDENT SOFTWARE COLLECTIVE</span>
    </div>

    <!-- Center Kinetic 0-100% Number Counter -->
    <div bind:this={loaderRef} class="my-auto flex flex-col items-center">
      <div class="font-display font-black text-giant tracking-tighter leading-none text-[var(--text-primary)]">
        {progress < 10 ? `0${progress}` : progress}%
      </div>
      <span class="font-sans text-xs tracking-widest text-[var(--text-muted)] uppercase mt-4">
        FINISHED MORE. PLANNED LESS.
      </span>
    </div>

    <!-- Bottom Progress Line -->
    <div class="w-full">
      <div class="w-full h-1 bg-[var(--border-color)] overflow-hidden">
        <div class="h-full bg-[var(--text-primary)] transition-all duration-75" style="width: {progress}%"></div>
      </div>
    </div>
  </div>
{/if}
