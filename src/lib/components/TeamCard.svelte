<script lang="ts">
  import type { TeamMember } from '../data/team';
  import { ExternalLink, Globe } from 'lucide-svelte';
  import SocialIcons from './SocialIcons.svelte';

  let { member, index }: { member: TeamMember; index: number } = $props();

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
  aria-label={`Team member ${member.name}`}
  onmouseenter={() => isHovered = true}
  onmouseleave={() => isHovered = false}
  onmousemove={handleMouseMove}
  class="relative group border-b border-[var(--border-color)] py-8 sm:py-10 px-4 sm:px-8 transition-colors cursor-pointer {isHovered ? 'bg-[var(--bg-surface)]' : 'hover:bg-[var(--bg-surface-hover)]'}"
>
  <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
    <div class="flex items-baseline gap-6 sm:gap-10">
      <span class="font-display font-black text-3xl sm:text-5xl text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
        0{index + 1}
      </span>
      <div>
        <h3 class="font-display text-2xl sm:text-4xl font-bold uppercase text-[var(--text-primary)]">
          {member.name}
        </h3>
        <span class="font-sans text-xs tracking-widest text-[var(--text-muted)] uppercase block mt-1">
          {member.role}
        </span>
      </div>
    </div>

    <!-- Subdomain Badge -->
    <a 
      href={`https://${member.subdomain}`}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="VISIT"
      class="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border-color)] bg-[var(--bg-primary)] font-sans text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-colors w-fit"
    >
      <Globe class="w-3.5 h-3.5" />
      <span>{member.subdomain}</span>
      <ExternalLink class="w-3 h-3" />
    </a>
  </div>

  {#if isHovered}
    <div class="mt-8 pt-6 border-t border-[var(--border-subtle)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <p class="lg:col-span-8 font-sans text-base text-[var(--text-secondary)] leading-relaxed">
        {member.bio}
      </p>

      <div class="lg:col-span-4 flex items-center gap-4 lg:justify-end font-sans text-xs">
        {#if member.github}
          <a href={member.github} target="_blank" rel="noopener noreferrer" data-cursor="VISIT" aria-label="GitHub" class="p-2 border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-colors">
            <SocialIcons type="github" className="w-4 h-4" />
          </a>
        {/if}
      </div>
    </div>

    <!-- Floating Cursor Preview Badge -->
    <div 
      class="hidden lg:flex pointer-events-none absolute z-50 px-5 py-3 border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-2xl items-center gap-3 font-display text-xs uppercase font-bold tracking-wider animate-in fade-in zoom-in-95 duration-150"
      style="left: {mouseX + 20}px; top: {mouseY - 20}px;"
    >
      <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
      <span>{member.name} // {member.role}</span>
    </div>
  {/if}
</div>
