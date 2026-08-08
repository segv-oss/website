// Svelte 5 state rune for dark/light mode persistence

export type Theme = 'dark' | 'light';

function createThemeStore() {
  // Initial check from localStorage or system preference
  const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'dark';
    const stored = localStorage.getItem('segv-theme') as Theme | null;
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  let currentTheme = $state<Theme>(getInitialTheme());

  const applyTheme = (theme: Theme) => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('segv-theme', theme);
    window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme } }));
  };

  return {
    get current() {
      return currentTheme;
    },
    get isDark() {
      return currentTheme === 'dark';
    },
    init() {
      applyTheme(currentTheme);
    },
    toggle() {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
    },
    set(theme: Theme) {
      currentTheme = theme;
      applyTheme(theme);
    }
  };
}

export const themeState = createThemeStore();
