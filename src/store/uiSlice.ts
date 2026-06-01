import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';
export type Palette = 'ocean' | 'forest' | 'sunset' | 'violet' | 'rose';

export interface Toast {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  duration?: number;
}

interface UIState {
  theme: Theme;
  palette: Palette;
  toasts: Toast[];
  navOpen: boolean;
}

const storedTheme = (localStorage.getItem('ui-forge-theme') as Theme) ?? 'light';
const storedPalette = (localStorage.getItem('ui-forge-palette') as Palette) ?? 'ocean';

const initialState: UIState = {
  theme: storedTheme,
  palette: storedPalette,
  toasts: [],
  navOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
      localStorage.setItem('ui-forge-theme', action.payload);
      document.documentElement.setAttribute('data-theme', action.payload);
    },
    toggleTheme(state) {
      const next: Theme = state.theme === 'light' ? 'dark' : 'light';
      state.theme = next;
      localStorage.setItem('ui-forge-theme', next);
      document.documentElement.setAttribute('data-theme', next);
    },
    setPalette(state, action: PayloadAction<Palette>) {
      state.palette = action.payload;
      localStorage.setItem('ui-forge-palette', action.payload);
      document.documentElement.setAttribute('data-palette', action.payload);
    },
    addToast(state, action: PayloadAction<Omit<Toast, 'id'>>) {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      state.toasts.push({ ...action.payload, id });
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    clearToasts(state) {
      state.toasts = [];
    },
    setNavOpen(state, action: PayloadAction<boolean>) {
      state.navOpen = action.payload;
    },
    toggleNav(state) {
      state.navOpen = !state.navOpen;
    },
  },
});

export const {
  setTheme,
  toggleTheme,
  setPalette,
  addToast,
  removeToast,
  clearToasts,
  setNavOpen,
  toggleNav,
} = uiSlice.actions;

export default uiSlice.reducer;
