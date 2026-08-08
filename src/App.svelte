<script lang="ts">
  import { onMount } from 'svelte';
  import { themeState } from './lib/state/theme.svelte';
  import { initSmoothScroll } from './lib/utils/lenis';
  
  import Preloader from './lib/components/Preloader.svelte';
  import Navbar from './lib/components/Navbar.svelte';
  import Hero from './lib/components/Hero.svelte';
  import Marquee from './lib/components/Marquee.svelte';
  import Manifesto from './lib/components/Manifesto.svelte';
  import Team from './lib/components/Team.svelte';
  import Projects from './lib/components/Projects.svelte';
  import Contact from './lib/components/Contact.svelte';
  import Footer from './lib/components/Footer.svelte';
  import CustomCursor from './lib/components/CustomCursor.svelte';
  import BackgroundGrid from './lib/components/BackgroundGrid.svelte';
  import AsciiCanvas2D from './lib/components/AsciiCanvas2D.svelte';
  import CommandPalette from './lib/components/CommandPalette.svelte';

  let mainContainerRef = $state<HTMLElement | undefined>(undefined);

  onMount(() => {
    themeState.init();
    
    // Init Lenis momentum scroll with scroll velocity skew physics
    const lenis = initSmoothScroll();
    if (lenis && mainContainerRef) {
      lenis.on('scroll', (e: { velocity: number }) => {
        const skew = Math.max(-2, Math.min(2, e.velocity * 0.03));
        if (mainContainerRef) {
          mainContainerRef.style.transform = `skewY(${skew}deg)`;
          mainContainerRef.style.transition = 'transform 0.15s ease-out';
        }
      });
    }
  });
</script>

<Preloader />
<CommandPalette />

<div class="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
  <AsciiCanvas2D />
  <BackgroundGrid />
  <CustomCursor />

  <div class="relative z-10 flex flex-col min-h-screen">
    <Navbar />

    <main bind:this={mainContainerRef} class="flex-1">
      <Hero />
      <Marquee />
      <Manifesto />
      <Team />
      <Projects />
      <Contact />
    </main>

    <Footer />
  </div>
</div>
