<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { themeState } from '../state/theme.svelte';

  let canvasRef: HTMLCanvasElement;
  let animId: number;

  let width = 0;
  let height = 0;
  let mouseX = -1000;
  let mouseY = -1000;
  let targetMouseX = -1000;
  let targetMouseY = -1000;
  let scrollY = 0;

  const glyphs = ['S', 'E', 'G', 'V', '0', '1', '+', '*', '%', '/', '#'];

  interface GlyphParticle {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    char: string;
    vx: number;
    vy: number;
    alpha: number;
  }

  let particles: GlyphParticle[] = [];

  function initParticles() {
    particles = [];
    const spacing = 40;
    const cols = Math.floor(width / spacing) + 2;
    const rows = Math.floor(height / spacing) + 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * spacing;
        const y = r * spacing;
        const char = glyphs[Math.floor(Math.random() * glyphs.length)];
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          char,
          vx: 0,
          vy: 0,
          alpha: Math.random() * 0.25 + 0.2
        });
      }
    }
  }

  function handleMouseMove(e: MouseEvent) {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  }

  function handleScroll() {
    scrollY = window.scrollY;
  }

  function handleResize() {
    if (!canvasRef) return;
    width = window.innerWidth;
    height = window.innerHeight;
    canvasRef.width = width;
    canvasRef.height = height;
    initParticles();
  }

  function animate() {
    animId = requestAnimationFrame(animate);
    if (!canvasRef) return;
    const ctx = canvasRef.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    mouseX += (targetMouseX - mouseX) * 0.08;
    mouseY += (targetMouseY - mouseY) * 0.08;

    const isDark = themeState.isDark;
    const fillStyle = isDark ? '255, 255, 255' : '9, 9, 11';

    ctx.font = '700 14px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const time = Date.now() * 0.0012;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Mouse Repulsion Physics
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 160;

      let currentAlpha = p.alpha;

      if (dist < maxDist) {
        const force = (maxDist - dist) / maxDist;
        const angle = Math.atan2(dy, dx);
        p.vx -= Math.cos(angle) * force * 3.5;
        p.vy -= Math.sin(angle) * force * 3.5;
        currentAlpha = Math.min(0.9, p.alpha + force * 0.6);
      }

      // Drift & Wave offsets
      const waveX = Math.sin(time + p.baseY * 0.02 + scrollY * 0.001) * 10;
      const waveY = Math.cos(time + p.baseX * 0.02 + scrollY * 0.001) * 10;

      const targetX = p.baseX + waveX;
      const targetY = p.baseY + waveY;

      p.vx += (targetX - p.x) * 0.06;
      p.vy += (targetY - p.y) * 0.06;

      p.vx *= 0.88;
      p.vy *= 0.88;

      p.x += p.vx;
      p.y += p.vy;

      ctx.fillStyle = `rgba(${fillStyle}, ${currentAlpha})`;
      ctx.fillText(p.char, p.x, p.y);
    }
  }

  onMount(() => {
    handleResize();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    animate();
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    }
    if (animId) cancelAnimationFrame(animId);
  });
</script>

<div class="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
  <canvas bind:this={canvasRef} class="w-full h-full block opacity-100"></canvas>
</div>
