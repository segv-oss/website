<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let timeString = $state('');
  let timer: number;

  function updateClock() {
    const now = new Date();
    timeString = now.toLocaleTimeString('en-US', { hour12: false }) + ' IST';
  }

  onMount(() => {
    updateClock();
    timer = window.setInterval(updateClock, 1000);
  });

  onDestroy(() => {
    if (timer) clearInterval(timer);
  });
</script>

<span class="font-sans text-xs text-[var(--text-muted)] tracking-widest uppercase">
  {timeString || '21:55:00 IST'}
</span>
