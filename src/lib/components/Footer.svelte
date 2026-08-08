<script lang="ts">
  import { ArrowUp } from 'lucide-svelte';
  import SocialIcons from './SocialIcons.svelte';

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<footer class="w-full border-t border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)] font-sans text-xs">
  
  <!-- Top Grid Section -->
  <div class="w-full px-6 sm:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[var(--border-color)]">
    
    <div>
      <span class="font-display text-xl font-bold text-[var(--text-primary)] uppercase block mb-1">FINISHED MORE. PLANNED LESS.</span>
      <span class="text-[var(--text-muted)] text-xs">SEGV Software Studio // segv.tech</span>
    </div>

    <div class="flex items-center gap-6">
      <a href="https://github.com/segv-oss" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" class="hover:text-[var(--text-primary)] transition-colors">
        <SocialIcons type="github" className="w-5 h-5" />
      </a>
      <a href="https://x.com/segv_tech" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile" class="hover:text-[var(--text-primary)] transition-colors">
        <SocialIcons type="twitter" className="w-5 h-5" />
      </a>
      <button 
        type="button"
        onclick={scrollToTop}
        class="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors cursor-pointer font-bold uppercase"
      >
        <span>TOP</span>
        <ArrowUp class="w-3.5 h-3.5" />
      </button>
    </div>

  </div>

  <!-- Bottom Legal & Copyright Bar -->
  <div class="w-full px-6 sm:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[var(--text-muted)] tracking-widest uppercase">
    <div>
      &copy; {new Date().getFullYear()} SEGV DEVELOPER COLLECTIVE. ALL RIGHTS RESERVED.
    </div>
    <div class="flex items-center gap-4">
      <span>DESIGN & SOFTWARE</span>
      <span>•</span>
      <span>CRAFT & ELEGANCE</span>
    </div>
  </div>

</footer>
