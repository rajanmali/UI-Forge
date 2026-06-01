import React, { useState, useRef, useEffect, useId } from 'react';
import styles from './Select.module.scss';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

export type SelectItem = SelectOption | SelectGroup;

function isGroup(item: SelectItem): item is SelectGroup {
  return 'options' in item;
}

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectProps {
  options: SelectItem[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  errorText?: string;
  size?: SelectSize;
  disabled?: boolean;
  fullWidth?: boolean;
  id?: string;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      aria-hidden="true"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  helperText,
  errorText,
  size = 'md',
  disabled = false,
  fullWidth = false,
  id,
}: SelectProps) {
  const uid = useId();
  const inputId = id ?? `select-${uid}`;
  const listboxId = `${inputId}-listbox`;
  const hasError = Boolean(errorText);

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const flatOptions = options.flatMap((item) => (isGroup(item) ? item.options : [item]));
  const selected = flatOptions.find((o) => o.value === value);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Scroll active option into view
  useEffect(() => {
    if (open && activeIndex >= 0) {
      const el = listRef.current?.children[activeIndex] as HTMLElement | undefined;
      el?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex, open]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (disabled) return;
    const enabledFlat = flatOptions.filter((o) => !o.disabled);

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!open) { setOpen(true); break; }
        if (activeIndex >= 0 && activeIndex < enabledFlat.length) {
          onChange?.(enabledFlat[activeIndex].value);
          setOpen(false);
        }
        break;
      case 'Escape':
        setOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!open) { setOpen(true); setActiveIndex(0); break; }
        setActiveIndex((i) => Math.min(i + 1, enabledFlat.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setActiveIndex(enabledFlat.length - 1);
        break;
    }
  }

  function selectOption(val: string) {
    onChange?.(val);
    setOpen(false);
  }

  let flatIdx = -1;

  return (
    <div className={[styles.field, fullWidth ? styles['field--full'] : ''].filter(Boolean).join(' ')}>
      {label && <label htmlFor={inputId} className={styles.field__label} id={`${inputId}-label`}>{label}</label>}
      <div ref={containerRef} className={styles.field__wrapper}>
        <button
          type="button"
          id={inputId}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-labelledby={label ? `${inputId}-label` : undefined}
          aria-invalid={hasError}
          aria-describedby={
            [hasError ? `${inputId}-error` : '', helperText ? `${inputId}-helper` : ''].filter(Boolean).join(' ') || undefined
          }
          disabled={disabled}
          onClick={() => !disabled && setOpen((o) => !o)}
          onKeyDown={handleKeyDown}
          className={[
            styles.trigger,
            styles[`trigger--${size}`],
            open ? styles['trigger--open'] : '',
            hasError ? styles['trigger--error'] : '',
            !selected ? styles['trigger--placeholder'] : '',
          ].filter(Boolean).join(' ')}
        >
          <span className={styles.trigger__value}>
            {selected ? selected.label : placeholder}
          </span>
          <span className={styles.trigger__icon}>
            <ChevronIcon open={open} />
          </span>
        </button>

        {open && (
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label={label ?? 'Options'}
            className={styles.listbox}
          >
            {options.map((item) => {
              if (isGroup(item)) {
                return (
                  <li key={item.label} role="presentation">
                    <span className={styles.listbox__group_label}>{item.label}</span>
                    <ul role="group" aria-label={item.label}>
                      {item.options.map((opt) => {
                        flatIdx++;
                        const idx = flatIdx;
                        return (
                          <li
                            key={opt.value}
                            role="option"
                            aria-selected={value === opt.value}
                            aria-disabled={opt.disabled}
                            className={[
                              styles.listbox__option,
                              value === opt.value ? styles['listbox__option--selected'] : '',
                              activeIndex === idx ? styles['listbox__option--active'] : '',
                              opt.disabled ? styles['listbox__option--disabled'] : '',
                            ].filter(Boolean).join(' ')}
                            onClick={() => !opt.disabled && selectOption(opt.value)}
                            onMouseEnter={() => setActiveIndex(idx)}
                          >
                            {opt.label}
                            {value === opt.value && (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              }
              flatIdx++;
              const idx = flatIdx;
              return (
                <li
                  key={item.value}
                  role="option"
                  aria-selected={value === item.value}
                  aria-disabled={item.disabled}
                  className={[
                    styles.listbox__option,
                    value === item.value ? styles['listbox__option--selected'] : '',
                    activeIndex === idx ? styles['listbox__option--active'] : '',
                    item.disabled ? styles['listbox__option--disabled'] : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => !item.disabled && selectOption(item.value)}
                  onMouseEnter={() => setActiveIndex(idx)}
                >
                  {item.label}
                  {value === item.value && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {hasError && <p id={`${inputId}-error`} className={styles.field__error} role="alert">{errorText}</p>}
      {helperText && !hasError && <p id={`${inputId}-helper`} className={styles.field__helper}>{helperText}</p>}
    </div>
  );
}
