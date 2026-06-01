import React from 'react';
import styles from './Switch.module.scss';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  helperText?: string;
  size?: SwitchSize;
  labelPosition?: 'left' | 'right';
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, helperText, size = 'md', labelPosition = 'right', disabled, id, ...rest }, ref) => {
    const inputId = id ?? `switch-${Math.random().toString(36).slice(2, 7)}`;

    return (
      <div className={[styles.wrapper, disabled ? styles['wrapper--disabled'] : ''].filter(Boolean).join(' ')}>
        <label
          htmlFor={inputId}
          className={[
            styles.label,
            styles[`label--${size}`],
            styles[`label--${labelPosition}`],
          ].join(' ')}
        >
          {label && labelPosition === 'left' && <span className={styles.text}>{label}</span>}
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            id={inputId}
            disabled={disabled}
            className={styles.input}
            {...rest}
          />
          <span className={styles.track} aria-hidden="true">
            <span className={styles.thumb} />
          </span>
          {label && labelPosition === 'right' && <span className={styles.text}>{label}</span>}
        </label>
        {helperText && <p className={styles.helper}>{helperText}</p>}
      </div>
    );
  },
);

Switch.displayName = 'Switch';
export default Switch;
