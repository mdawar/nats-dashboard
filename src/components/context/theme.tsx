import {
  createSignal,
  createMemo,
  createEffect,
  createContext,
  useContext,
  onMount,
  onCleanup,
  type ParentProps,
  type Accessor,
} from 'solid-js';

import { createLocalSignal } from '~/lib/localstate';

interface Theme {
  /** Dark theme is active. */
  isDark: Accessor<boolean>;
  /** Using the system's default theme. */
  isAuto: Accessor<boolean>;
  /** Toggle theme. */
  toggle: () => void;
  /** Reset theme (Use system theme). */
  reset: () => void;
}

const defaultTheme: Theme = {
  isDark() {
    return false;
  },
  isAuto() {
    return false;
  },
  toggle() {},
  reset() {},
};

const ThemeContext = createContext<Theme>(defaultTheme);

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

/**
 * Check if the system's preferred color scheme is dark.
 */
function isDarkPreferred(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(COLOR_SCHEME_QUERY).matches ?? false;
}

/**
 * Check if the system's preferred color scheme is dark and watch for changes.
 */
function useSystemDark(): Accessor<boolean> {
  const [isSystemDark, setIsSystemDark] = createSignal(isDarkPreferred());

  onMount(() => {
    const mql = window.matchMedia(COLOR_SCHEME_QUERY);
    const onChange = (e: MediaQueryListEvent) => setIsSystemDark(e.matches);

    mql.addEventListener('change', onChange);
    onCleanup(() => mql.removeEventListener('change', onChange));
  });

  return isSystemDark;
}

export function ThemeProvider(props: ParentProps) {
  const isSystemDark = useSystemDark();

  // Local storage state to save the user's preference (undefined used for system theme).
  const [darkMode, setDarkMode] = createLocalSignal<boolean | undefined>(
    'darkMode',
    undefined
  );

  const isAuto = createMemo(() => darkMode() === undefined);
  const isDark = createMemo(() => darkMode() || (isAuto() && isSystemDark()));

  // Watch for theme changes.
  createEffect(() => {
    if (isDark()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });

  const theme = {
    isAuto,
    isDark,
    toggle() {
      setDarkMode(!isDark());
    },
    reset() {
      setDarkMode(undefined);
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
