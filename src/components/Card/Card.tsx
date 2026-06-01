import React from 'react';
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

  return (
    <div
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        isInteractive
          ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick?.(e as never)
          : undefined
      }
      className={[
        styles.card,
        styles[`card--${variant}`],
        styles[`card--pad-${padding}`],
        hoverable || isInteractive ? styles['card--hoverable'] : '',
        isInteractive ? styles['card--clickable'] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {header && <div className={styles.card__header}>{header}</div>}
      <div className={styles.card__body}>{children}</div>
      {footer && <div className={styles.card__footer}>{footer}</div>}
    </div>
  );
}
