import React from 'react';
import styles from './Checkbox.module.scss';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  indeterminate?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, helperText, errorText, indeterminate = false, size = 'md', disabled, id, className, ...rest }, ref) => {
    const inputId = id ?? `checkbox-${Math.random().toString(36).slice(2, 7)}`;
    const hasError = Boolean(errorText);

    const setRef = (el: HTMLInputElement | null) => {
      if (el) el.indeterminate = indeterminate;
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
    };

    return (
      <div className={[styles.wrapper, disabled ? styles['wrapper--disabled'] : '', hasError ? styles['wrapper--error'] : ''].filter(Boolean).join(' ')}>
        <label className={[styles.label, styles[`label--${size}`]].join(' ')} htmlFor={inputId}>
          <input
            ref={setRef}
            type="checkbox"
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError}
            className={[styles.input, className ?? ''].filter(Boolean).join(' ')}
            {...rest}
          />
          <span className={styles.box} aria-hidden="true">
            <svg viewBox="0 0 12 10" fill="none" className={styles.check}>
              {indeterminate
                ? <line x1="1" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                : <polyline points="1,5.5 4.5,9 11,1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              }
            </svg>
          </span>
          {label && <span className={styles.text}>{label}</span>}
        </label>
        {hasError && <p className={styles.error} role="alert">{errorText}</p>}
        {helperText && !hasError && <p className={styles.helper}>{helperText}</p>}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
