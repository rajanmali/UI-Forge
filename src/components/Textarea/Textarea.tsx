import React from 'react';
import styles from './Textarea.module.scss';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helperText, errorText, fullWidth = false, resize = 'vertical', disabled, id, className, ...rest }, ref) => {
    const inputId = id ?? `textarea-${Math.random().toString(36).slice(2, 7)}`;
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
        ].filter(Boolean).join(' ')}
      >
        {label && <label htmlFor={inputId} className={styles.field__label}>{label}</label>}
        <textarea
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={
            [hasError ? errorId : '', helperText ? helperId : ''].filter(Boolean).join(' ') || undefined
          }
          className={[styles.field__textarea, styles[`field__textarea--resize-${resize}`], className ?? ''].filter(Boolean).join(' ')}
          {...rest}
        />
        {hasError && <p id={errorId} className={styles.field__error} role="alert">{errorText}</p>}
        {helperText && !hasError && <p id={helperId} className={styles.field__helper}>{helperText}</p>}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
export default Textarea;
