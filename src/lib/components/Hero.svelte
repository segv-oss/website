<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import HeaderClock from './HeaderClock.svelte';
  import KineticText from './KineticText.svelte';
  import { ArrowDownRight } from 'lucide-svelte';
  import { soundManager } from '../utils/sound';

  let titleRef = $state<HTMLHeadingElement | undefined>(undefined);
  let subRef = $state<HTMLParagraphElement | undefined>(undefined);
  let ctaRef = $state<HTMLDivElement | undefined>(undefined);

  onMount(() => {
    if (!titleRef) return;

    const chars = titleRef.querySelectorAll('.char');
    if (chars.length) {
      gsap.from(chars, {
        y: 80,
        opacity: 0,
        stagger: 0.04,
        duration: 1.2,
        ease: "power4.out"
      });
    }

    if (subRef) {
      gsap.from(subRef, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out"
      });
    }

    if (ctaRef) {
      gsap.from(ctaRef, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.7,
        ease: "power3.out"
      });
    }
  });
</script>

<section class="relative w-full border-b border-[var(--border-color)] bg-[var(--bg-primary)] pt-12 pb-24 sm:pb-32 overflow-hidden">
  <div class="w-full px-6 sm:px-12">
    
    <!-- Top Identity Marker with Real-Time Clock -->
    <div class="flex items-center justify-between mb-8 pb-6 border-b border-[var(--border-color)] font-sans text-xs text-[var(--text-muted)] tracking-widest uppercase">
      <span>SEGV STUDIO</span>
      <div class="flex items-center gap-4">
        <HeaderClock />
        <span>•</span>
        <span>INDEPENDENT COLLECTIVE</span>
      </div>
    </div>

    <!-- Giant 2D Typographic Statement -->
    <div class="w-full select-none overflow-hidden my-4">
      <h1 bind:this={titleRef} class="font-display font-black text-giant uppercase text-[var(--text-primary)] leading-none tracking-tighter flex flex-wrap">
        {#each "SEGV".split("") as char}
          <span class="char inline-block">{char}</span>
        {/each}
      </h1>
    </div>

    <!-- Tagline & Core Pitch -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pt-12 border-t border-[var(--border-color)]">
      
      <div class="lg:col-span-8">
        <h2 class="font-display text-4xl sm:text-6xl sm:text-7xl font-extrabold uppercase tracking-tight text-[var(--text-primary)] leading-none mb-6">
          Finished more.<br />
          <span class="text-[var(--text-muted)] font-normal italic">Planned less.</span>
        </h2>
        <p bind:this={subRef} class="font-sans text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">
          We are <strong class="text-[var(--text-primary)]">segv</strong> — an independent software development collective crafting thoughtful digital products, high-performance platforms, and open-source infrastructure.
        </p>
      </div>

      <div bind:this={ctaRef} class="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-4">
        <a 
          href="#manifesto" 
          data-cursor="READ"
          onmouseenter={() => soundManager.playHoverSound()}
          onclick={() => soundManager.playClickSound()}
          class="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 border border-[var(--border-color)] bg-[var(--badge-bg)] text-[var(--badge-text)] font-sans text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-all shadow-2xl"
        >
          <KineticText text="EXPLORE PHILOSOPHY" />
          <ArrowDownRight class="w-4 h-4" />
        </a>
      </div>

    </div>

  </div>
</section>
