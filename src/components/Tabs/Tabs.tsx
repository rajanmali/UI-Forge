import React, { useState, useRef } from 'react';
import styles from './Tabs.module.scss';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  variant?: 'line' | 'pill';
  onChange?: (id: string) => void;
  className?: string;
}

export default function Tabs({
  tabs,
  defaultTab,
  variant = 'line',
  onChange,
  className,
}: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function selectTab(id: string) {
    setActive(id);
    onChange?.(id);
  }

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    const enabledTabs = tabs.filter((t) => !t.disabled);
    const currentEnabled = enabledTabs.findIndex((t) => t.id === tabs[index].id);

    let nextEnabled: number | null = null;
    if (e.key === 'ArrowRight') nextEnabled = (currentEnabled + 1) % enabledTabs.length;
    if (e.key === 'ArrowLeft') nextEnabled = (currentEnabled - 1 + enabledTabs.length) % enabledTabs.length;
    if (e.key === 'Home') nextEnabled = 0;
    if (e.key === 'End') nextEnabled = enabledTabs.length - 1;

    if (nextEnabled !== null) {
      e.preventDefault();
      const targetTab = enabledTabs[nextEnabled];
      selectTab(targetTab.id);
      const targetIndex = tabs.findIndex((t) => t.id === targetTab.id);
      tabRefs.current[targetIndex]?.focus();
    }
  }

  const activeTab = tabs.find((t) => t.id === active);

  return (
    <div className={[styles.tabs, className].filter(Boolean).join(' ')}>
      <div
        role="tablist"
        aria-label="Navigation tabs"
        className={[styles.tabs__list, styles[`tabs__list--${variant}`]].join(' ')}
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            role="tab"
            ref={(el) => { tabRefs.current[i] = el; }}
            id={`tab-${tab.id}`}
            aria-controls={`panel-${tab.id}`}
            aria-selected={active === tab.id}
            disabled={tab.disabled}
            tabIndex={active === tab.id ? 0 : -1}
            onClick={() => !tab.disabled && selectTab(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={[
              styles.tabs__tab,
              active === tab.id ? styles['tabs__tab--active'] : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {tab.icon && <span className={styles.tabs__icon} aria-hidden="true">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        tabIndex={0}
        className={styles.tabs__panel}
      >
        {activeTab?.content}
      </div>
    </div>
  );
}
