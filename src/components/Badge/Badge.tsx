import styles from './Badge.module.scss';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  variant = 'primary',
  size = 'md',
  dot = false,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={[
        styles.badge,
        styles[`badge--${variant}`],
        styles[`badge--${size}`],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {dot && <span className={styles.badge__dot} aria-hidden="true" />}
      {children}
    </span>
  );
}
