import React from 'react';
import { motion } from 'framer-motion';
import styles from './Card.module.scss';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps {
  variant?: CardVariant;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function Card({
  variant = 'elevated',
  padding = 'md',
  hoverable = false,
  clickable = false,
  header,
  footer,
  children,
  className,
  onClick,
}: CardProps) {
  const isInteractive = clickable || Boolean(onClick);
  const animate = hoverable || isInteractive;

  return (
    <motion.div
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        isInteractive
          ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick?.(e as never)
          : undefined
      }
      whileHover={animate ? { y: -4, boxShadow: '0 20px 40px -8px rgba(0,0,0,0.18)' } : undefined}
      whileTap={isInteractive ? { scale: 0.98 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className={[
        styles.card,
        styles[`card--${variant}`],
        styles[`card--pad-${padding}`],
        animate ? styles['card--hoverable'] : '',
        isInteractive ? styles['card--clickable'] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {header && <div className={styles.card__header}>{header}</div>}
      <div className={styles.card__body}>{children}</div>
      {footer && <div className={styles.card__footer}>{footer}</div>}
    </motion.div>
  );
}
