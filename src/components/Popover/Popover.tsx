import { useState, useRef, useEffect, useId, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Popover.module.scss';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

export interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  title?: string;
  placement?: PopoverPlacement;
  closeOnOutside?: boolean;
  className?: string;
}

function getPosition(
  triggerEl: HTMLElement,
  popEl: HTMLElement,
  placement: PopoverPlacement,
): { top: number; left: number } {
  const tr = triggerEl.getBoundingClientRect();
  const pw = popEl.offsetWidth;
  const ph = popEl.offsetHeight;
  const gap = 8;

  const positions: Record<PopoverPlacement, { top: number; left: number }> = {
    'top':          { top: tr.top - ph - gap,              left: tr.left + tr.width / 2 - pw / 2 },
    'bottom':       { top: tr.bottom + gap,                left: tr.left + tr.width / 2 - pw / 2 },
    'left':         { top: tr.top + tr.height / 2 - ph / 2, left: tr.left - pw - gap },
    'right':        { top: tr.top + tr.height / 2 - ph / 2, left: tr.right + gap },
    'top-start':    { top: tr.top - ph - gap,              left: tr.left },
    'top-end':      { top: tr.top - ph - gap,              left: tr.right - pw },
    'bottom-start': { top: tr.bottom + gap,                left: tr.left },
    'bottom-end':   { top: tr.bottom + gap,                left: tr.right - pw },
  };

  const pos = positions[placement];
  // Clamp to viewport
  return {
    top:  Math.max(8, Math.min(pos.top,  window.innerHeight - ph - 8)) + window.scrollY,
    left: Math.max(8, Math.min(pos.left, window.innerWidth  - pw - 8)) + window.scrollX,
  };
}

export default function Popover({
  trigger,
  content,
  title,
  placement = 'bottom',
  closeOnOutside = true,
  className,
}: PopoverProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function reposition() {
      if (triggerRef.current && popRef.current) {
        setPos(getPosition(triggerRef.current, popRef.current, placement));
      }
    }
    // Two frames so the element is measured after render
    requestAnimationFrame(() => requestAnimationFrame(reposition));
    window.addEventListener('resize', reposition);
    window.addEventListener('scroll', reposition, true);
    return () => {
      window.removeEventListener('resize', reposition);
      window.removeEventListener('scroll', reposition, true);
    };
  }, [open, placement]);

  useEffect(() => {
    if (!open || !closeOnOutside) return;
    const handler = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        popRef.current?.contains(e.target as Node)
      ) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, closeOnOutside]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <span
        ref={triggerRef}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        style={{ display: 'inline-flex', cursor: 'pointer' }}
      >
        {trigger}
      </span>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              ref={popRef}
              id={id}
              role="dialog"
              aria-modal="false"
              aria-label={title ?? 'Popover'}
              className={[styles.popover, className].filter(Boolean).join(' ')}
              style={{ top: pos.top, left: pos.left }}
              initial={{ opacity: 0, scale: 0.94, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 6 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
            >
              {title && (
                <div className={styles.popover__header}>
                  <span className={styles.popover__title}>{title}</span>
                  <button
                    className={styles.popover__close}
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              )}
              <div className={styles.popover__body}>{content}</div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
