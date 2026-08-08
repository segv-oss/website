<script lang="ts">
  import { PROJECTS } from '../data/projects';
  import ProjectCard from './ProjectCard.svelte';
</script>

<section id="projects" class="w-full border-b border-[var(--border-color)] py-24 lg:py-36 bg-[var(--bg-primary)]">
  <div class="w-full px-6 sm:px-12">
    
    <!-- Section Header -->
    <div class="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6 pb-8 border-b border-[var(--border-color)]">
      <div>
        <span class="font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase block mb-3">03 / SHOWCASE</span>
        <h2 class="font-display text-5xl sm:text-7xl font-extrabold uppercase text-[var(--text-primary)] tracking-tight">
          Projects Showcase
        </h2>
      </div>

      <p class="font-sans text-base text-[var(--text-secondary)] max-w-md leading-relaxed">
        Open-source systems, developer utilities, and web infrastructure.
      </p>
    </div>

    <!-- Editorial Project List -->
    <div class="border-t border-[var(--border-color)]">
      {#each PROJECTS as project, i (project.id)}
        <ProjectCard {project} index={i} />
      {/each}
    </div>

  </div>
</section>
