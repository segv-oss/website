<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import { themeState } from '../state/theme.svelte';
  import { soundManager } from '../utils/sound';
  import { Search, Compass, Users, Code, Mail, Copy, Check, Volume2, Sun, X } from 'lucide-svelte';

  let isOpen = $state(false);
  let query = $state('');
  let selectedIndex = $state(0);
  let copiedText = $state('');
  let inputRef = $state<HTMLInputElement | undefined>(undefined);

  const commands = [
    { id: 'manifesto', title: 'Philosophy / Manifesto', category: 'Navigation', href: '#manifesto', icon: Compass },
    { id: 'team', title: 'Collective Team Roster', category: 'Navigation', href: '#team', icon: Users },
    { id: 'projects', title: 'Work & Showcase Projects', category: 'Navigation', href: '#projects', icon: Code },
    { id: 'contact', title: 'Get in Touch', category: 'Navigation', href: '#contact', icon: Mail },
    { id: 'email', title: 'Copy Email (contact@segv.tech)', category: 'Action', action: () => copyValue('contact@segv.tech', 'Email'), icon: Copy },
    { id: 'discord', title: 'Copy Discord (discord.gg/segv)', category: 'Action', action: () => copyValue('https://discord.gg/segv', 'Discord'), icon: Copy },
    { id: 'theme', title: 'Toggle Light / Dark Theme', category: 'Preferences', action: () => themeState.toggle(), icon: Sun },
    { id: 'sound', title: 'Toggle Audio Synthesizer', category: 'Preferences', action: () => soundManager.toggle(), icon: Volume2 }
  ];

  let filteredCommands = $derived(
    query
      ? commands.filter(c => c.title.toLowerCase().includes(query.toLowerCase()) || c.category.toLowerCase().includes(query.toLowerCase()))
      : commands
  );

  function copyValue(val: string, label: string) {
    navigator.clipboard.writeText(val);
    copiedText = label;
    soundManager.playClickSound();
    setTimeout(() => { copiedText = ''; }, 2000);
  }

  async function openPalette() {
    isOpen = true;
    selectedIndex = 0;
    document.body.style.overflow = 'hidden';
    soundManager.playClickSound();
    await tick();
    if (inputRef) inputRef.focus();
  }

  function closePalette() {
    isOpen = false;
    document.body.style.overflow = '';
  }

  function handleKeyDown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (isOpen) closePalette();
      else openPalette();
    } else if (isOpen) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closePalette();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % Math.max(1, filteredCommands.length);
        soundManager.playHoverSound();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length);
        soundManager.playHoverSound();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          executeCommand(filteredCommands[selectedIndex]);
        }
      }
    }
  }

  function executeCommand(cmd: typeof commands[0]) {
    soundManager.playClickSound();
    if (cmd.action) {
      cmd.action();
    } else if (cmd.href) {
      closePalette();
      window.location.hash = cmd.href;
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    }
  });
</script>

{#if isOpen}
  <!-- Backdrop Blur with Click Outside Close & Scroll Trap -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div 
    class="fixed inset-0 z-[99999] bg-[var(--bg-primary)]/80 backdrop-blur-md flex items-start justify-center pt-20 px-4"
    onclick={(e) => e.target === e.currentTarget && closePalette()}
    onkeydown={(e) => e.key === 'Escape' && closePalette()}
  >
    
    <!-- Modal Container -->
    <div class="w-full max-w-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-2xl overflow-hidden">
      
      <!-- Input Header -->
      <div class="flex items-center gap-3 px-5 py-4 border-b border-[var(--border-color)]">
        <Search class="w-5 h-5 text-[var(--text-muted)]" />
        <input 
          bind:this={inputRef}
          type="text" 
          bind:value={query}
          oninput={() => selectedIndex = 0}
          placeholder="Type a command or search... (Use ↑ ↓ Enter)"
          class="w-full bg-transparent text-sm font-sans placeholder-[var(--text-muted)] focus:outline-none text-[var(--text-primary)]"
        />
        <button 
          type="button" 
          onclick={closePalette}
          class="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 cursor-pointer"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Command List -->
      <div class="max-h-80 overflow-y-auto py-2">
        {#if copiedText}
          <div class="px-5 py-3 bg-emerald-500/10 text-emerald-500 font-sans text-xs font-bold flex items-center justify-between">
            <span>COPIED {copiedText.toUpperCase()} TO CLIPBOARD!</span>
            <Check class="w-4 h-4" />
          </div>
        {/if}

        {#each filteredCommands as cmd, i}
          <button
            type="button"
            onclick={() => executeCommand(cmd)}
            onmouseenter={() => { selectedIndex = i; soundManager.playHoverSound(); }}
            class="w-full px-5 py-3.5 flex items-center justify-between text-left transition-colors cursor-pointer {selectedIndex === i ? 'bg-[var(--badge-bg)] text-[var(--badge-text)]' : 'hover:bg-[var(--bg-surface-hover)] text-[var(--text-primary)]'}"
          >
            <div class="flex items-center gap-3">
              <cmd.icon class="w-4 h-4 {selectedIndex === i ? 'text-[var(--badge-text)]' : 'text-[var(--text-muted)]'}" />
              <span class="font-sans text-xs font-medium">{cmd.title}</span>
            </div>

            <span class="font-sans text-[10px] uppercase tracking-wider px-2 py-0.5 border border-[var(--border-color)] {selectedIndex === i ? 'border-[var(--badge-text)]' : 'text-[var(--text-muted)]'}">
              {cmd.category}
            </span>
          </button>
        {/each}
      </div>

      <!-- Footer Keyboard Navigation Cue -->
      <div class="px-5 py-3 border-t border-[var(--border-color)] bg-[var(--bg-surface)] flex items-center justify-between font-sans text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
        <span>NAVIGATION: ↑ ↓ TO SELECT • ENTER TO CONFIRM</span>
        <span>ESC TO CLOSE</span>
      </div>

    </div>

  </div>
{/if}
