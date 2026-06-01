import styles from './Spinner.module.scss';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg';

export interface SpinnerProps {
  size?: SpinnerSize;
  label?: string;
  color?: 'current' | 'primary' | 'white';
}

export default function Spinner({
  size = 'md',
  label = 'Loading…',
  color = 'current',
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={[styles.spinner, styles[`spinner--${size}`], styles[`spinner--${color}`]].join(' ')}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={styles.spinner__svg}
      >
        <circle
          className={styles.spinner__track}
          cx="12"
          cy="12"
          r="10"
          strokeWidth="3"
        />
        <path
          className={styles.spinner__arc}
          d="M12 2a10 10 0 0 1 10 10"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span className={styles.spinner__label}>{label}</span>
    </span>
  );
}
