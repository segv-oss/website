<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { MANIFESTO_PRINCIPLES } from '../data/manifesto';

  gsap.registerPlugin(ScrollTrigger);

  let sectionRef = $state<HTMLElement | undefined>(undefined);
  let activeIndex = $state<number | null>(0);
  let scrollTriggerInstance: ScrollTrigger | null = null;

  function toggleIndex(i: number) {
    activeIndex = activeIndex === i ? null : i;
  }

  onMount(() => {
    if (!sectionRef) return;

    const items = sectionRef.querySelectorAll('.manifesto-item');
    if (!items.length) return;

    const st = ScrollTrigger.batch(items, {
      onEnter: batch => {
        gsap.from(batch, {
          y: 60,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          overwrite: "auto"
        });
      },
      once: true
    });

    scrollTriggerInstance = st[0] || null;
  });

  onDestroy(() => {
    if (scrollTriggerInstance) scrollTriggerInstance.kill();
  });
</script>

<section bind:this={sectionRef} id="manifesto" class="w-full border-b border-[var(--border-color)] py-24 lg:py-36 bg-[var(--bg-primary)]">
  <div class="w-full px-6 sm:px-12">
    
    <!-- Section Header -->
    <div class="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6 pb-8 border-b border-[var(--border-color)]">
      <div>
        <span class="font-sans text-xs text-[var(--text-muted)] tracking-widest uppercase block mb-3">01 / PHILOSOPHY</span>
        <h2 class="font-display text-5xl sm:text-7xl font-extrabold uppercase text-[var(--text-primary)] tracking-tight">
          Studio Philosophy
        </h2>
      </div>

      <p class="font-sans text-base text-[var(--text-secondary)] max-w-md leading-relaxed">
        Click on any principle to expand our core engineering and design values.
      </p>
    </div>

    <!-- Expanding Editorial List Rows with GSAP Batch Reveals -->
    <div class="border-t border-[var(--border-color)]">
      {#each MANIFESTO_PRINCIPLES as item, i}
        <div 
          role="button"
          tabindex="0"
          class="manifesto-item group border-b border-[var(--border-color)] transition-colors cursor-pointer {activeIndex === i ? 'bg-[var(--bg-surface)]' : 'hover:bg-[var(--bg-surface-hover)]'}"
          onclick={() => toggleIndex(i)}
          onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleIndex(i)}
        >
          <div class="py-8 sm:py-10 px-4 sm:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div class="flex items-baseline gap-6 sm:gap-10">
              <span class="font-display font-black text-4xl sm:text-6xl text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                {item.number}
              </span>
              <h3 class="font-display text-2xl sm:text-4xl font-bold uppercase text-[var(--text-primary)]">
                {item.title}
              </h3>
            </div>

            <span class="font-sans text-xs tracking-widest text-[var(--text-secondary)] uppercase">
              {item.tag} {activeIndex === i ? '[-]' : '[+]'}
            </span>
          </div>

          {#if activeIndex === i}
            <div class="px-4 sm:px-8 pb-10 pt-2 border-t border-[var(--border-subtle)] font-sans text-lg text-[var(--text-secondary)] max-w-4xl leading-relaxed">
              {item.summary}
            </div>
          {/if}
        </div>
      {/each}
    </div>

  </div>
</section>
