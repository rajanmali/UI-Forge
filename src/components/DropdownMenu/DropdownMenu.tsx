import { useState, useRef, useEffect, useId, type ReactNode, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './DropdownMenu.module.scss';

// ─── Context ──────────────────────────────────────────────────
interface DropdownCtx {
  close: () => void;
}
const Ctx = createContext<DropdownCtx>({ close: () => {} });

// ─── Types ────────────────────────────────────────────────────
export interface DropdownItem {
  id: string;
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

export interface DropdownSection {
  label?: string;
  items: DropdownItem[];
}

export interface DropdownMenuProps {
  trigger: ReactNode;
  sections: DropdownSection[];
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  width?: number;
}

function getCoords(
  el: HTMLElement,
  menuW: number,
  menuH: number,
  placement: DropdownMenuProps['placement'],
) {
  const r = el.getBoundingClientRect();
  const gap = 4;
  const coords = {
    'bottom-start': { top: r.bottom + gap, left: r.left },
    'bottom-end':   { top: r.bottom + gap, left: r.right - menuW },
    'top-start':    { top: r.top - menuH - gap, left: r.left },
    'top-end':      { top: r.top - menuH - gap, left: r.right - menuW },
  }[placement ?? 'bottom-start'];

  return {
    top:  Math.max(8, Math.min(coords.top,  window.innerHeight - menuH - 8)) + window.scrollY,
    left: Math.max(8, Math.min(coords.left, window.innerWidth  - menuW - 8)) + window.scrollX,
  };
}

// ─── Item component ───────────────────────────────────────────
function Item({ item }: { item: DropdownItem }) {
  const { close } = useContext(Ctx);
  return (
    <button
      role="menuitem"
      disabled={item.disabled}
      aria-disabled={item.disabled}
      className={[
        styles.item,
        item.danger    ? styles['item--danger']    : '',
        item.disabled  ? styles['item--disabled']  : '',
      ].filter(Boolean).join(' ')}
      onClick={() => {
        if (item.disabled) return;
        item.onClick?.();
        close();
      }}
    >
      {item.icon && <span className={styles.item__icon} aria-hidden="true">{item.icon}</span>}
      <span className={styles.item__label}>{item.label}</span>
      {item.shortcut && <span className={styles.item__shortcut} aria-label={`Shortcut: ${item.shortcut}`}>{item.shortcut}</span>}
    </button>
  );
}

// ─── Root component ───────────────────────────────────────────
export default function DropdownMenu({
  trigger,
  sections,
  placement = 'bottom-start',
  width = 220,
}: DropdownMenuProps) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const menuRef    = useRef<HTMLDivElement>(null);

  function close() { setOpen(false); }

  useEffect(() => {
    if (!open) return;
    function reposition() {
      if (triggerRef.current && menuRef.current) {
        setPos(getCoords(triggerRef.current, width, menuRef.current.offsetHeight, placement));
      }
    }
    requestAnimationFrame(() => requestAnimationFrame(reposition));
    window.addEventListener('resize', reposition);
    window.addEventListener('scroll', reposition, true);
    return () => {
      window.removeEventListener('resize', reposition);
      window.removeEventListener('scroll', reposition, true);
    };
  }, [open, placement, width]);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const click = (e: MouseEvent) => {
      if (!triggerRef.current?.contains(e.target as Node) && !menuRef.current?.contains(e.target as Node))
        close();
    };
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') { close(); triggerRef.current?.querySelector('button')?.focus(); } };
    document.addEventListener('mousedown', click);
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('mousedown', click); document.removeEventListener('keydown', key); };
  }, [open]);

  // Arrow key navigation inside menu
  function handleMenuKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not([disabled])') ?? []);
    const idx = items.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx + 1) % items.length]?.focus(); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); items[(idx - 1 + items.length) % items.length]?.focus(); }
    if (e.key === 'Home')      { e.preventDefault(); items[0]?.focus(); }
    if (e.key === 'End')       { e.preventDefault(); items[items.length - 1]?.focus(); }
  }

  return (
    <Ctx.Provider value={{ close }}>
      <span
        ref={triggerRef}
        style={{ display: 'inline-flex' }}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={uid}
      >
        {trigger}
      </span>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              ref={menuRef}
              id={uid}
              role="menu"
              aria-label="Menu"
              tabIndex={-1}
              style={{ top: pos.top, left: pos.left, width }}
              className={styles.menu}
              onKeyDown={handleMenuKeyDown}
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.14, ease: 'easeOut' }}
            >
              {sections.map((section, si) => (
                <div key={si} role="group" aria-label={section.label}>
                  {si > 0 && <div className={styles.divider} role="separator" />}
                  {section.label && <p className={styles.group_label}>{section.label}</p>}
                  {section.items.map((item) => (
                    <Item key={item.id} item={item} />
                  ))}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </Ctx.Provider>
  );
}
