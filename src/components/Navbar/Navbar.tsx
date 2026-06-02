import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { useAppDispatch, useAppSelector } from '../../store';
import { toggleTheme, toggleNav, setNavOpen, openCommandPalette } from '../../store/uiSlice';
import { APP_VERSION } from '../../version';

export interface NavItem {
  label: string;
  to: string;
}

export interface NavbarProps {
  items?: NavItem[];
}

const DEFAULT_ITEMS: NavItem[] = [
  { label: 'Showcase', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Form Demo', to: '/form-demo' },
  { label: 'Docs', to: '/docs' },
  { label: 'Changelog', to: '/changelog' },
];

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

export default function Navbar({ items = DEFAULT_ITEMS }: NavbarProps) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.ui.theme);
  const navOpen = useAppSelector((s) => s.ui.navOpen);

  // Close mobile menu on route change / resize past md
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) dispatch(setNavOpen(false));
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [dispatch]);

  // Trap body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [navOpen]);

  return (
    <header className={styles.navbar} role="banner">
      <div className={styles.navbar__inner}>
        {/* Logo */}
        <div className={styles.navbar__logo_group}>
          <NavLink to="/" className={styles.navbar__logo} aria-label="UIForge home">
            <span className={styles.navbar__logo_mark} aria-hidden="true">
              ⬡
            </span>
            <span className={styles.navbar__logo_text}>UIForge</span>
          </NavLink>
          <NavLink
            to="/changelog"
            className={styles.navbar__version}
            aria-label={`View changelog for version ${APP_VERSION}`}
          >
            v{APP_VERSION}
          </NavLink>
        </div>

        {/* Desktop nav */}
        <nav className={styles.navbar__nav} aria-label="Main navigation">
          <ul role="list" className={styles.navbar__list}>
            {items.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    [styles.navbar__link, isActive ? styles['navbar__link--active'] : ''].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className={styles.navbar__actions}>
          <button
            className={styles.navbar__search_btn}
            onClick={() => dispatch(openCommandPalette())}
            aria-label="Open command palette (⌘K)"
            title="Search (⌘K)"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className={styles.navbar__search_hint}>⌘K</span>
          </button>
          <ThemeSwitcher />
          <button
            onClick={() => dispatch(toggleTheme())}
            className={styles.navbar__icon_btn}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Hamburger */}
          <button
            className={[
              styles.navbar__hamburger,
              navOpen ? styles['navbar__hamburger--open'] : '',
            ].join(' ')}
            onClick={() => dispatch(toggleNav())}
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={navOpen}
            aria-controls="mobile-nav"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <nav
        id="mobile-nav"
        className={[styles.navbar__mobile, navOpen ? styles['navbar__mobile--open'] : ''].join(' ')}
        aria-label="Mobile navigation"
        aria-hidden={!navOpen}
      >
        <ul role="list" className={styles.navbar__mobile_list}>
          {items.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                onClick={() => dispatch(setNavOpen(false))}
                className={({ isActive }) =>
                  [
                    styles.navbar__mobile_link,
                    isActive ? styles['navbar__mobile_link--active'] : '',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Backdrop */}
      {navOpen && (
        <div
          className={styles.navbar__backdrop}
          onClick={() => dispatch(setNavOpen(false))}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
