<script lang="ts">
  import {
    Mail,
    MessageSquare,
    Copy,
    Check,
    ExternalLink,
  } from "lucide-svelte";
  import SocialIcons from "./SocialIcons.svelte";

  let copiedEmail = $state(false);
  let copiedDiscord = $state(false);

  const EMAIL = "contact@segv.tech";
  const DISCORD_INVITE = "https://discord.gg/PUHyMgjeT7";
  const GITHUB_ORG = "https://github.com/segv-oss";
  const GITHUB_USER = "https://github.com/segv113";

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL);
    copiedEmail = true;
    setTimeout(() => {
      copiedEmail = false;
    }, 2500);
  }

  function copyDiscord() {
    navigator.clipboard.writeText(DISCORD_INVITE);
    copiedDiscord = true;
    setTimeout(() => {
      copiedDiscord = false;
    }, 2500);
  }
</script>

<section
  id="contact"
  class="w-full border-b border-[var(--border-color)] py-24 lg:py-36 bg-[var(--bg-primary)]"
>
  <div class="w-full px-6 sm:px-12">
    <!-- Section Header -->
    <div
      class="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6 pb-8 border-b border-[var(--border-color)]"
    >
      <div>
        <span
          class="font-sans text-xs text-[var(--text-muted)] tracking-widest uppercase block mb-3"
          >04 / CONTACT</span
        >
        <h2
          class="font-display text-5xl sm:text-7xl font-extrabold uppercase text-[var(--text-primary)] tracking-tight"
        >
          Get in Touch
        </h2>
      </div>

      <p
        class="font-sans text-base text-[var(--text-secondary)] max-w-md leading-relaxed"
      >
        Connect with us directly via email, Discord, or GitHub.
      </p>
    </div>

    <!-- Full-Bleed Studio Contact Rows -->
    <div class="border-t border-[var(--border-color)]">
      <!-- 1. EMAIL ROW -->
      <div
        class="group border-b border-[var(--border-color)] py-10 px-4 sm:px-8 hover:bg-[var(--bg-surface)] transition-colors"
      >
        <div
          class="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          <div>
            <span
              class="font-sans text-xs tracking-widest text-[var(--text-muted)] uppercase block mb-2"
              >EMAIL ADDRESS</span
            >
            <h3
              class="font-display text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)]"
            >
              contact@segv.tech
            </h3>
          </div>

          <div class="flex items-center gap-4 font-sans text-xs">
            <a
              href={`mailto:${EMAIL}`}
              class="px-6 py-3.5 border border-[var(--border-color)] bg-[var(--badge-bg)] text-[var(--badge-text)] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              SEND EMAIL
            </a>
            <button
              type="button"
              onclick={copyEmail}
              title="Copy Email"
              class="p-3.5 border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors cursor-pointer"
            >
              {#if copiedEmail}
                <Check class="w-4 h-4 text-emerald-500" />
              {:else}
                <Copy class="w-4 h-4" />
              {/if}
            </button>
          </div>
        </div>
      </div>

      <!-- 2. DISCORD ROW -->
      <div
        class="group border-b border-[var(--border-color)] py-10 px-4 sm:px-8 hover:bg-[var(--bg-surface)] transition-colors"
      >
        <div
          class="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          <div>
            <span
              class="font-sans text-xs tracking-widest text-[var(--text-muted)] uppercase block mb-2"
              >DISCORD COMMUNITY</span
            >
            <h3
              class="font-display text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)]"
            >
              discord.gg/segv
            </h3>
          </div>

          <div class="flex items-center gap-4 font-sans text-xs">
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-3.5 border border-[var(--border-color)] bg-[var(--badge-bg)] text-[var(--badge-text)] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <span>JOIN DISCORD</span>
              <ExternalLink class="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onclick={copyDiscord}
              title="Copy Invite Link"
              class="p-3.5 border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors cursor-pointer"
            >
              {#if copiedDiscord}
                <Check class="w-4 h-4 text-emerald-500" />
              {:else}
                <Copy class="w-4 h-4" />
              {/if}
            </button>
          </div>
        </div>
      </div>

      <!-- 3. GITHUB ROW -->
      <div
        class="group border-b border-[var(--border-color)] py-10 px-4 sm:px-8 hover:bg-[var(--bg-surface)] transition-colors"
      >
        <div
          class="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          <div>
            <span
              class="font-sans text-xs tracking-widest text-[var(--text-muted)] uppercase block mb-2"
              >GITHUB PROFILES</span
            >
            <h3
              class="font-display text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)]"
            >
              github.com/segv-oss
            </h3>
          </div>

          <div class="flex flex-wrap items-center gap-4 font-sans text-xs">
            <a
              href={GITHUB_ORG}
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-3.5 border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] font-bold uppercase tracking-widest hover:bg-[var(--bg-surface-hover)] transition-colors flex items-center gap-2"
            >
              <span>@segv-oss (ORGANIZATION)</span>
              <ExternalLink class="w-3.5 h-3.5" />
            </a>
            <a
              href={GITHUB_USER}
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-3.5 border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] font-bold uppercase tracking-widest hover:bg-[var(--bg-surface-hover)] transition-colors flex items-center gap-2"
            >
              <span>@segv113 (USER)</span>
              <ExternalLink class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
