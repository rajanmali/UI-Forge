import React from 'react';
import styles from './Input.module.scss';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  size?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorText,
      size = 'md',
      leftIcon,
      rightIcon,
      fullWidth = false,
      id,
      disabled,
      className,
      ...rest
    },
    ref,
  ) => {
    const inputId = id ?? `input-${Math.random().toString(36).slice(2, 7)}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const hasError = Boolean(errorText);

    return (
      <div
        className={[
          styles.field,
          fullWidth ? styles['field--full'] : '',
          hasError ? styles['field--error'] : '',
          disabled ? styles['field--disabled'] : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {label && (
          <label htmlFor={inputId} className={styles.field__label}>
            {label}
          </label>
        )}
        <div className={styles.field__wrapper}>
          {leftIcon && (
            <span className={styles.field__icon} aria-hidden="true">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              [hasError ? errorId : '', helperText ? helperId : ''].filter(Boolean).join(' ') ||
              undefined
            }
            className={[
              styles.field__input,
              styles[`field__input--${size}`],
              leftIcon ? styles['field__input--has-left'] : '',
              rightIcon ? styles['field__input--has-right'] : '',
              className ?? '',
            ]
              .filter(Boolean)
              .join(' ')}
            {...rest}
          />
          {rightIcon && (
            <span className={[styles.field__icon, styles['field__icon--right']].join(' ')} aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </div>
        {hasError && (
          <p id={errorId} className={styles.field__error} role="alert">
            {errorText}
          </p>
        )}
        {helperText && !hasError && (
          <p id={helperId} className={styles.field__helper}>
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
