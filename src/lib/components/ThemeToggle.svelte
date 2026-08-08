<script lang="ts">
  import { themeState } from '../state/theme.svelte';
  import { Sun, Moon } from 'lucide-svelte';
</script>

<button
  type="button"
  aria-label="Toggle Dark and Light Mode"
  onclick={() => themeState.toggle()}
  class="relative inline-flex items-center justify-center p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-all duration-300 group cursor-pointer"
>
  <div class="relative w-5 h-5 flex items-center justify-center overflow-hidden">
    {#if themeState.isDark}
      <Sun class="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
    {:else}
      <Moon class="w-4 h-4 text-zinc-900 group-hover:-rotate-12 transition-transform duration-300" />
    {/if}
  </div>
  <span class="sr-only">Toggle theme</span>
</button>
