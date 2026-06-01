import React from 'react';
import { motion } from 'framer-motion';
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

const tapScale = { scale: 0.96 };
const whileHover = { scale: 1.02 };
const transition = { type: 'spring' as const, stiffness: 500, damping: 30 };

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
      <motion.button
        ref={ref}
        whileHover={isDisabled ? undefined : whileHover}
        whileTap={isDisabled ? undefined : tapScale}
        transition={transition}
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
        {...(rest as React.ComponentProps<typeof motion.button>)}
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
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
