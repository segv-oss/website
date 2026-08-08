<script lang="ts">
  import type { Project } from '../data/projects';
  import { Star } from 'lucide-svelte';
  import SocialIcons from './SocialIcons.svelte';

  let { project, index }: { project: Project; index: number } = $props();

  let isHovered = $state(false);
  let mouseX = $state(0);
  let mouseY = $state(0);

  function handleMouseMove(e: MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  }
</script>

<div 
  role="region"
  aria-label={`Project ${project.title}`}
  onmouseenter={() => isHovered = true}
  onmouseleave={() => isHovered = false}
  onmousemove={handleMouseMove}
  class="relative group border-b border-[var(--border-color)] py-8 sm:py-10 px-4 sm:px-8 transition-all cursor-pointer {isHovered ? 'bg-[var(--bg-surface)] translate-x-2' : 'hover:bg-[var(--bg-surface-hover)]'}"
>
  <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
    <div class="flex items-baseline gap-6 sm:gap-10">
      <span class="font-display font-black text-3xl sm:text-5xl text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
        0{index + 1}
      </span>
      <div>
        <div class="flex items-center gap-3">
          <h3 class="font-display text-2xl sm:text-4xl font-bold uppercase text-[var(--text-primary)]">
            {project.title}
          </h3>
          <span class="font-sans text-[10px] px-2.5 py-0.5 border border-[var(--border-color)] text-[var(--text-muted)] uppercase tracking-wider">
            {project.status}
          </span>
        </div>
        <span class="font-sans text-xs tracking-widest text-[var(--text-muted)] uppercase block mt-1">
          {project.tagline}
        </span>
      </div>
    </div>

    <div class="flex items-center gap-6 font-sans text-xs text-[var(--text-secondary)]">
      {#if project.stars}
        <div class="flex items-center gap-2 font-bold text-[var(--text-primary)]">
          <Star class="w-4 h-4 text-amber-400 fill-amber-400" />
          <span class="font-mono text-sm">{project.stars.toLocaleString()}</span>
        </div>
      {/if}

      {#if project.githubUrl}
        <a 
          href={project.githubUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          data-cursor="VISIT"
          class="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-colors font-bold uppercase shadow-sm"
        >
          <SocialIcons type="github" className="w-4 h-4" />
          <span>REPOSITORY</span>
        </a>
      {:else}
        <span 
          data-cursor="RESEARCH"
          class="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-muted)] font-bold uppercase shadow-sm cursor-default"
        >
          <span>RESEARCH & DESIGN</span>
        </span>
      {/if}
    </div>
  </div>

  {#if isHovered}
    <div class="mt-8 pt-6 border-t border-[var(--border-subtle)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <p class="lg:col-span-8 font-sans text-base text-[var(--text-secondary)] leading-relaxed">
        {project.description}
      </p>

      <div class="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end">
        {#each project.stack as tech}
          <span class="font-sans text-xs px-3 py-1 border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-secondary)]">
            {tech}
          </span>
        {/each}
      </div>
    </div>

    <!-- Floating Cursor Preview Badge -->
    <div 
      class="hidden lg:flex pointer-events-none absolute z-50 px-5 py-3 border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-2xl items-center gap-3 font-display text-xs uppercase font-bold tracking-wider animate-in fade-in zoom-in-95 duration-150"
      style="left: {mouseX + 20}px; top: {mouseY - 20}px;"
    >
      <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
      <span>{project.title} // {project.category}</span>
    </div>
  {/if}
</div>
