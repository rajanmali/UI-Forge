import { useState, useRef, useId, type ReactNode } from 'react';
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

type MotionInitial = { opacity: number; y?: number; x?: number; scale: number };

const MOTION: Record<TooltipPlacement, { initial: MotionInitial }> = {
  top:    { initial: { opacity: 0, y: 6,  scale: 0.94 } },
  bottom: { initial: { opacity: 0, y: -6, scale: 0.94 } },
  left:   { initial: { opacity: 0, x: 6,  scale: 0.94 } },
  right:  { initial: { opacity: 0, x: -6, scale: 0.94 } },
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
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function show() {
    if (disabled) return;
    timer.current = setTimeout(() => setVisible(true), delay);
  }

  function hide() {
    if (timer.current) clearTimeout(timer.current);
    setVisible(false);
  }

  return (
    <span
      className={styles.wrapper}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span aria-describedby={visible ? id : undefined}>{children}</span>

      <AnimatePresence>
        {visible && (
          <motion.span
            id={id}
            role="tooltip"
            className={[styles.tooltip, styles[`tooltip--${placement}`]].join(' ')}
            initial={MOTION[placement].initial}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            {content}
            <span className={styles.tooltip__arrow} aria-hidden="true" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
