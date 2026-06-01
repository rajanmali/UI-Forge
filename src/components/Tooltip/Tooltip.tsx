import { useState, useRef, useId, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Tooltip.module.scss';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
  disabled?: boolean;
  children: ReactNode;
}

interface TooltipPos {
  top: number;
  left: number;
  // CSS transform applied to the outer portal wrapper for centering.
  // Framer Motion animates the inner span so the two transforms don't conflict.
  transform: string;
}

const GAP = 8;

function calcPos(rect: DOMRect, placement: TooltipPlacement): TooltipPos {
  switch (placement) {
    case 'top':
      return { top: rect.top - GAP, left: rect.left + rect.width / 2, transform: 'translate(-50%, -100%)' };
    case 'bottom':
      return { top: rect.bottom + GAP, left: rect.left + rect.width / 2, transform: 'translate(-50%, 0%)' };
    case 'left':
      return { top: rect.top + rect.height / 2, left: rect.left - GAP, transform: 'translate(-100%, -50%)' };
    case 'right':
      return { top: rect.top + rect.height / 2, left: rect.right + GAP, transform: 'translate(0%, -50%)' };
  }
}

// Slide direction per placement (for the motion.span inside the portal wrapper)
const SLIDE: Record<TooltipPlacement, { initial: { opacity: number; scale: number; y?: number; x?: number } }> = {
  top:    { initial: { opacity: 0, scale: 0.94, y: 4  } },
  bottom: { initial: { opacity: 0, scale: 0.94, y: -4 } },
  left:   { initial: { opacity: 0, scale: 0.94, x: 4  } },
  right:  { initial: { opacity: 0, scale: 0.94, x: -4 } },
};

export default function Tooltip({
  content,
  placement = 'top',
  delay = 300,
  disabled = false,
  children,
}: TooltipProps) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState<TooltipPos | null>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function show() {
    if (disabled) return;
    if (wrapperRef.current) {
      setPos(calcPos(wrapperRef.current.getBoundingClientRect(), placement));
    }
    timer.current = setTimeout(() => setVisible(true), delay);
  }

  function hide() {
    if (timer.current) clearTimeout(timer.current);
    setVisible(false);
  }

  return (
    <span
      ref={wrapperRef}
      className={styles.wrapper}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span aria-describedby={visible ? id : undefined}>{children}</span>

      {createPortal(
        <AnimatePresence>
          {visible && pos && (
            // Outer div: fixed position + centering transform (no Framer Motion so no conflict)
            <div
              style={{
                position: 'fixed',
                top: pos.top,
                left: pos.left,
                transform: pos.transform,
                zIndex: 600,
                pointerEvents: 'none',
              }}
            >
              {/* Inner span: Framer Motion handles only opacity/scale/slide — no positioning transform */}
              <motion.span
                id={id}
                role="tooltip"
                className={[styles.tooltip, styles[`tooltip--${placement}`]].join(' ')}
                initial={SLIDE[placement].initial}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
                {content}
                <span className={styles.tooltip__arrow} aria-hidden="true" />
              </motion.span>
            </div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </span>
  );
}
