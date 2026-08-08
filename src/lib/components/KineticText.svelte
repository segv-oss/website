<script lang="ts">
  import { soundManager } from '../utils/sound';

  let { text, className = '' }: { text: string; className?: string } = $props();

  let isHovered = $state(false);

  function handleMouseEnter() {
    isHovered = true;
    soundManager.playHoverSound();
  }

  function handleMouseLeave() {
    isHovered = false;
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span 
  class="relative inline-block overflow-hidden select-none {className}"
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
>
  <!-- Main Row -->
  <span class="inline-block transition-transform duration-300 ease-out {isHovered ? '-translate-y-full' : 'translate-y-0'}">
    {#each text.split('') as char, i}
      <span 
        class="inline-block transition-transform duration-300 ease-out" 
        style="transition-delay: {i * 15}ms"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    {/each}
  </span>

  <!-- Hover Row (Sliding in from below) -->
  <span class="absolute top-0 left-0 inline-block transition-transform duration-300 ease-out {isHovered ? 'translate-y-0' : 'translate-y-full'}">
    {#each text.split('') as char, i}
      <span 
        class="inline-block transition-transform duration-300 ease-out text-[var(--badge-bg)]" 
        style="transition-delay: {i * 15}ms"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    {/each}
  </span>
</span>
