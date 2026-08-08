<script lang="ts">
  import { TEAM_MEMBERS } from '../data/team';
  import TeamCard from './TeamCard.svelte';
</script>

<section id="team" class="w-full border-b border-[var(--border-color)] py-24 lg:py-36 bg-[var(--bg-primary)]">
  <div class="w-full px-6 sm:px-12">
    
    <!-- Section Header -->
    <div class="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6 pb-8 border-b border-[var(--border-color)]">
      <div>
        <span class="font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase block mb-3">02 / COLLECTIVE</span>
        <h2 class="font-display text-5xl sm:text-7xl font-extrabold uppercase text-[var(--text-primary)] tracking-tight">
          Team Members
        </h2>
      </div>

      <p class="font-sans text-base text-[var(--text-secondary)] max-w-md leading-relaxed">
        Hover over any member row to view bio details, focus areas, and subdomain portfolios.
      </p>
    </div>

    <!-- Editorial Roster List -->
    <div class="border-t border-[var(--border-color)]">
      {#each TEAM_MEMBERS as member, i (member.id)}
        <TeamCard {member} index={i} />
      {/each}
    </div>

  </div>
</section>
