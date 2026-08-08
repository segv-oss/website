<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let cursorDot = $state<HTMLDivElement | undefined>(undefined);
  let cursorRing = $state<HTMLDivElement | undefined>(undefined);
  let mouseX = 0;
  let mouseY = 0;
  let dotX = 0;
  let dotY = 0;
  let ringX = 0;
  let ringY = 0;
  let isVisible = $state(false);
  let isHovered = $state(false);
  let badgeText = $state('');
  let animationId: number;

  function evaluateCursorBadge(target: HTMLElement): string {
    const custom = target.getAttribute('data-cursor') || target.closest('[data-cursor]')?.getAttribute('data-cursor');
    if (custom) return custom;

    const link = target.closest('a') || target.closest('button');
    if (!link) return '';

    const href = link.getAttribute('href') || '';
    const title = (link.getAttribute('title') || '').toLowerCase();
    const text = (link.textContent || '').toLowerCase();

    if (title.includes('copy') || text.includes('copy')) {
      return 'COPY';
    }
    if (href.startsWith('mailto:')) {
      return 'EMAIL';
    }
    if (href === '#contact' || text.includes('contact') || text.includes('get in touch') || text.includes('send email')) {
      return 'CONTACT';
    }
    if (href === '#manifesto') {
      return 'READ';
    }
    if (href === '#team') {
      return 'TEAM';
    }
    if (href === '#projects') {
      return 'WORK';
    }
    if (link.getAttribute('target') === '_blank' || href.startsWith('http') || href.includes('.segv.tech')) {
      return 'VISIT';
    }

    return 'VIEW';
  }

  function onMouseMove(e: MouseEvent) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isVisible) isVisible = true;

    const target = e.target as HTMLElement;
    const interactive = target?.closest('a') || target?.closest('button');

    if (interactive) {
      isHovered = true;
      badgeText = evaluateCursorBadge(interactive);

      // Magnetic pull physics for CTA buttons
      const rect = interactive.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (distance < 60) {
        const pullX = (e.clientX - centerX) * 0.2;
        const pullY = (e.clientY - centerY) * 0.2;
        (interactive as HTMLElement).style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
      }
    } else {
      isHovered = false;
      badgeText = '';

      // Reset magnetic pull
      document.querySelectorAll('a, button').forEach(el => {
        (el as HTMLElement).style.transform = '';
      });
    }
  }

  function onMouseLeave() {
    isVisible = false;
  }

  function animate() {
    animationId = requestAnimationFrame(animate);

    dotX += (mouseX - dotX) * 0.4;
    dotY += (mouseY - dotY) * 0.4;

    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    if (cursorDot) {
      cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
    }
    if (cursorRing) {
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${isHovered ? 2.4 : 1})`;
    }
  }

  onMount(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseleave', onMouseLeave);
      animate();
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    }
    if (animationId) cancelAnimationFrame(animationId);
  });
</script>

{#if isVisible}
  <!-- Cursor Inner Dot -->
  <div 
    bind:this={cursorDot}
    class="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--text-primary)] pointer-events-none z-[999] transition-opacity duration-300"
  ></div>

  <!-- Cursor Outer Ring with Context-Aware Text Badge -->
  <div 
    bind:this={cursorRing}
    class="fixed top-0 left-0 w-11 h-11 rounded-full border border-[var(--text-primary)]/60 pointer-events-none z-[998] flex items-center justify-center font-sans text-[8px] font-bold text-[var(--text-primary)] uppercase tracking-tighter backdrop-blur-md bg-[var(--bg-primary)]/40 transition-all duration-300 ease-out shadow-lg"
  >
    {#if isHovered && badgeText}
      <span>{badgeText}</span>
    {/if}
  </div>
{/if}
