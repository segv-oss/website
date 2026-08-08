<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  import KineticText from './KineticText.svelte';
  import { ArrowUpRight, Volume2, VolumeX, Command } from 'lucide-svelte';
  import { soundManager } from '../utils/sound';

  let soundEnabled = $state(false);

  function toggleSound() {
    soundEnabled = soundManager.toggle();
  }

  function openCommandPalette() {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  }

  const navLinks = [
    { label: 'PHILOSOPHY', href: '#manifesto', cursor: 'READ', key: '1' },
    { label: 'COLLECTIVE', href: '#team', cursor: 'TEAM', key: '2' },
    { label: 'WORK', href: '#projects', cursor: 'WORK', key: '3' },
    { label: 'CONTACT', href: '#contact', cursor: 'CONTACT', key: '4' }
  ];

  function handleHotkey(e: KeyboardEvent) {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    const link = navLinks.find(l => l.key === e.key);
    if (link) {
      soundManager.playClickSound();
      window.location.hash = link.href;
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleHotkey);
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', handleHotkey);
    }
  });
</script>

<header class="sticky top-0 z-50 w-full border-b border-[var(--border-color)] bg-[var(--bg-primary)]/90 backdrop-blur-md transition-colors duration-300">
  <div class="w-full flex items-stretch justify-between h-16 sm:h-20 px-6 sm:px-12">
    
    <!-- Brand Logo Cell -->
    <a 
      href="/" 
      class="flex items-center gap-3.5 group text-[var(--text-primary)]" 
      data-cursor="SEGV"
      onmouseenter={() => soundManager.playHoverSound()}
      onclick={() => soundManager.playClickSound()}
    >
      <svg width="28" height="21" viewBox="0 0 352 260" fill="currentColor" class="w-7 h-5 transition-transform group-hover:scale-105">
        <path d="M0.42586 233.922L0.858132 207.845H175.996H351.134L351.567 233.922L352 260H175.999H0L0.42586 233.922ZM175.995 155.689V129.222H88.0328H0.0711134V103.533V77.8443H88.0328H175.995V103.533V129.222H263.956H351.918V155.689V182.156H263.956H175.995V155.689ZM0.0711134 25.6885V0H175.995H351.918V25.6885V51.3774H175.995H0.0711134V25.6885Z"/>
      </svg>
      <span class="font-display font-black text-xl tracking-tight uppercase">segv<span class="text-xs font-normal text-[var(--text-muted)] ml-1">.tech</span></span>
    </a>

    <!-- Navigation Links with Kinetic Text & Hotkey Badge -->
    <nav class="hidden md:flex items-center gap-8">
      {#each navLinks as link}
        <a 
          href={link.href}
          data-cursor={link.cursor}
          onmouseenter={() => soundManager.playHoverSound()}
          onclick={() => soundManager.playClickSound()}
          class="font-sans text-xs font-semibold tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors uppercase flex items-center gap-1.5"
        >
          <KineticText text={link.label} />
          <span class="font-mono text-[9px] opacity-40 px-1 border border-[var(--border-color)]">[{link.key}]</span>
        </a>
      {/each}
    </nav>

    <!-- Controls & Actions -->
    <div class="flex items-center gap-3 sm:gap-4">
      
      <!-- Command Palette Trigger -->
      <button
        type="button"
        onclick={openCommandPalette}
        data-cursor="SEARCH"
        title="Open Command Palette (Cmd + K)"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-xs font-sans font-medium uppercase cursor-pointer"
      >
        <Command class="w-3.5 h-3.5" />
        <span class="hidden sm:inline">⌘K</span>
      </button>

      <!-- Sound Toggle -->
      <button 
        type="button"
        onclick={toggleSound}
        data-cursor="SOUND"
        title="Toggle Audio Synthesizer"
        class="inline-flex items-center gap-2 px-3 py-1.5 border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-xs font-sans font-medium uppercase cursor-pointer"
      >
        {#if soundEnabled}
          <Volume2 class="w-3.5 h-3.5 text-emerald-500" />
          <span class="hidden lg:inline">SOUND: ON</span>
        {:else}
          <VolumeX class="w-3.5 h-3.5 text-[var(--text-muted)]" />
          <span class="hidden lg:inline">SOUND: OFF</span>
        {/if}
      </button>

      <ThemeToggle />

      <a 
        href="#contact" 
        data-cursor="CONTACT"
        onmouseenter={() => soundManager.playHoverSound()}
        onclick={() => soundManager.playClickSound()}
        class="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 font-sans text-xs font-bold border border-[var(--border-color)] bg-[var(--badge-bg)] text-[var(--badge-text)] hover:opacity-90 transition-opacity uppercase tracking-wider shadow-md"
      >
        <span>CONTACT</span>
        <ArrowUpRight class="w-3.5 h-3.5" />
      </a>
    </div>

  </div>
</header>
