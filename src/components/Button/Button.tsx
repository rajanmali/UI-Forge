import React from 'react';
import styles from './Button.module.scss';
import Spinner from '../Spinner/Spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={[
          styles.btn,
          styles[`btn--${variant}`],
          styles[`btn--${size}`],
          fullWidth ? styles['btn--full'] : '',
          loading ? styles['btn--loading'] : '',
          className ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...rest}
      >
        {loading && (
          <span className={styles.btn__spinner} aria-hidden="true">
            <Spinner size="sm" />
          </span>
        )}
        {!loading && leftIcon && (
          <span className={styles.btn__icon} aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span className={styles.btn__label}>{children}</span>
        {!loading && rightIcon && (
          <span className={styles.btn__icon} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
