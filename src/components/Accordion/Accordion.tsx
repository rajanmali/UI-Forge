import React, { createContext, useCallback, useContext, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Accordion.module.scss';

// ─── Context ────────────────────────────────────────────────────────────────

interface AccordionCtx {
  openItems: number[];
  toggle: (index: number) => void;
  setRef: (index: number, el: HTMLButtonElement | null) => void;
  focusAt: (index: number) => void;
  totalItems: number;
}

const Ctx = createContext<AccordionCtx | null>(null);

function useAccordion() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('AccordionItem must be inside Accordion');
  return ctx;
}

// ─── Root ────────────────────────────────────────────────────────────────────

export interface AccordionProps {
  children: React.ReactNode;
  defaultOpen?: number[];
  allowMultiple?: boolean;
  variant?: 'default' | 'bordered';
  className?: string;
}

export function Accordion({
  children,
  defaultOpen = [],
  allowMultiple = false,
  variant = 'default',
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<number[]>(defaultOpen);
  // Refs are stored inside a plain object to avoid ESLint react-hooks/immutability
  // complaints when the ref array is passed through context and mutated in items.
  const refsMap = useRef<Record<number, HTMLButtonElement | null>>({});

  const toggle = useCallback(
    (index: number) => {
      setOpenItems((prev) => {
        if (prev.includes(index)) return prev.filter((i) => i !== index);
        return allowMultiple ? [...prev, index] : [index];
      });
    },
    [allowMultiple],
  );

  const setRef = useCallback((index: number, el: HTMLButtonElement | null) => {
    refsMap.current[index] = el;
  }, []);

  const focusAt = useCallback((index: number) => {
    refsMap.current[index]?.focus();
  }, []);

  const items = React.Children.toArray(children);

  return (
    <Ctx.Provider value={{ openItems, toggle, setRef, focusAt, totalItems: items.length }}>
      <div
        className={[styles.accordion, styles[`accordion--${variant}`], className]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
    </Ctx.Provider>
  );
}

// ─── Item ────────────────────────────────────────────────────────────────────

export interface AccordionItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  index?: number; // injected automatically when used inside Accordion
  disabled?: boolean;
}

export function AccordionItem({
  title,
  children,
  index = 0,
  disabled = false,
}: AccordionItemProps) {
  const { openItems, toggle, setRef, focusAt, totalItems } = useAccordion();
  const id = useId();
  const triggerId = `${id}-trigger`;
  const panelId = `${id}-panel`;
  const isOpen = openItems.includes(index);

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusAt((index + 1) % totalItems);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusAt((index - 1 + totalItems) % totalItems);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusAt(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusAt(totalItems - 1);
    }
  }

  return (
    <div
      className={[styles.item, disabled && styles['item--disabled']].filter(Boolean).join(' ')}
      data-index={index}
    >
      <h3 className={styles.item__heading}>
        <button
          id={triggerId}
          ref={(el) => setRef(index, el)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-disabled={disabled || undefined}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          className={[styles.item__trigger, isOpen && styles['item__trigger--open']]
            .filter(Boolean)
            .join(' ')}
          onClick={() => !disabled && toggle(index)}
          onKeyDown={handleKeyDown}
          data-total={totalItems}
        >
          <span className={styles.item__title}>{title}</span>
          <motion.span
            className={styles.item__chevron}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{
              duration: 0.2,
              ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
            }}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.24,
              ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
            }}
            className={styles.item__panel}
            style={{ overflow: 'hidden' }}
          >
            <div className={styles.item__content}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Auto-inject index ────────────────────────────────────────────────────────

// Wrap Accordion so children get their index automatically
const AccordionWithIndex = Object.assign(
  function AccordionWithIndexed(props: AccordionProps) {
    const children = React.Children.map(props.children, (child, i) =>
      React.isValidElement(child)
        ? React.cloneElement(child as React.ReactElement<AccordionItemProps>, { index: i })
        : child,
    );
    return <Accordion {...props}>{children}</Accordion>;
  },
  { Item: AccordionItem },
);

export default AccordionWithIndex;
