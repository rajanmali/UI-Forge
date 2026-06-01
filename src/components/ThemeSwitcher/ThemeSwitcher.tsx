import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ThemeSwitcher.module.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import { setPalette, type Palette } from '../../store/uiSlice';

interface PaletteConfig {
  id: Palette;
  label: string;
  accent: string;
  primary: string;
}

const PALETTES: PaletteConfig[] = [
  { id: 'ocean',  label: 'Ocean',  accent: '#2563EB', primary: '#1B3A6B' },
  { id: 'forest', label: 'Forest', accent: '#16a34a', primary: '#14532d' },
  { id: 'sunset', label: 'Sunset', accent: '#ea580c', primary: '#7c2d12' },
  { id: 'violet', label: 'Violet', accent: '#7c3aed', primary: '#4c1d95' },
  { id: 'rose',   label: 'Rose',   accent: '#e11d48', primary: '#881337' },
];

export default function ThemeSwitcher() {
  const dispatch = useAppDispatch();
  const palette = useAppSelector((s) => s.ui.palette);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const current = PALETTES.find((p) => p.id === palette)!;

  return (
    <div ref={ref} className={styles.switcher}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Colour palette: ${current.label}`}
        title="Switch colour palette"
      >
        <span
          className={styles.trigger__swatch}
          style={{ background: `linear-gradient(135deg, ${current.primary}, ${current.accent})` }}
          aria-hidden="true"
        />
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            aria-label="Colour palettes"
            className={styles.panel}
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <p className={styles.panel__heading}>Colour Palette</p>
            <ul className={styles.list} role="presentation">
              {PALETTES.map((p) => (
                <li key={p.id} role="presentation">
                  <button
                    role="option"
                    aria-selected={palette === p.id}
                    className={[styles.option, palette === p.id ? styles['option--active'] : ''].join(' ')}
                    onClick={() => { dispatch(setPalette(p.id)); setOpen(false); }}
                  >
                    <span
                      className={styles.option__swatch}
                      style={{ background: `linear-gradient(135deg, ${p.primary}, ${p.accent})` }}
                      aria-hidden="true"
                    />
                    <span className={styles.option__label}>{p.label}</span>
                    {palette === p.id && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
