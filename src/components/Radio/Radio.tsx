import React from 'react';
import styles from './Radio.module.scss';

export interface RadioOption {
  value: string;
  label: string;
  helperText?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  errorText?: string;
  orientation?: 'vertical' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
}

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  label,
  errorText,
  orientation = 'vertical',
  size = 'md',
}: RadioGroupProps) {
  const groupId = `radio-group-${name}`;
  const hasError = Boolean(errorText);

  return (
    <fieldset className={styles.group} aria-describedby={hasError ? `${groupId}-error` : undefined}>
      {label && <legend className={styles.group__legend}>{label}</legend>}
      <div className={[styles.group__options, styles[`group__options--${orientation}`]].join(' ')}>
        {options.map((opt) => (
          <label
            key={opt.value}
            className={[
              styles.label,
              styles[`label--${size}`],
              opt.disabled ? styles['label--disabled'] : '',
            ].filter(Boolean).join(' ')}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              disabled={opt.disabled}
              aria-invalid={hasError}
              onChange={() => onChange?.(opt.value)}
              className={styles.input}
            />
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.content}>
              <span className={styles.text}>{opt.label}</span>
              {opt.helperText && <span className={styles.helper}>{opt.helperText}</span>}
            </span>
          </label>
        ))}
      </div>
      {hasError && <p id={`${groupId}-error`} className={styles.error} role="alert">{errorText}</p>}
    </fieldset>
  );
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, size = 'md', disabled, id, ...rest }, ref) => {
    const inputId = id ?? `radio-${Math.random().toString(36).slice(2, 7)}`;
    return (
      <label className={[styles.label, styles[`label--${size}`], disabled ? styles['label--disabled'] : ''].filter(Boolean).join(' ')} htmlFor={inputId}>
        <input ref={ref} type="radio" id={inputId} disabled={disabled} className={styles.input} {...rest} />
        <span className={styles.dot} aria-hidden="true" />
        {label && <span className={styles.text}>{label}</span>}
      </label>
    );
  },
);

Radio.displayName = 'Radio';
export default Radio;
