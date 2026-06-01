import styles from './Avatar.module.scss';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  status?: 'online' | 'away' | 'busy' | 'offline';
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

const AVATAR_COLORS = [
  '#0a4f4b', '#2a5fcc', '#5F4C41', '#DB6557', '#d97a2a',
  '#b33d2d', '#8e7ed4', '#1BAAA0', '#669DEC', '#AC80A0',
];

function getColorFromName(name: string): string {
  const hash = name.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

export default function Avatar({
  src,
  alt,
  name,
  size = 'md',
  status,
  className,
}: AvatarProps) {
  const initials = name ? getInitials(name) : '?';
  const bgColor = name ? getColorFromName(name) : '#0a4f4b';
  const label = alt ?? name ?? 'Avatar';

  return (
    <span
      className={[styles.avatar, styles[`avatar--${size}`], className].filter(Boolean).join(' ')}
      aria-label={label}
      role="img"
    >
      {src ? (
        <img src={src} alt={label} className={styles.avatar__img} />
      ) : (
        <span
          className={styles.avatar__initials}
          style={{ backgroundColor: bgColor }}
          aria-hidden="true"
        >
          {initials}
        </span>
      )}
      {status && (
        <span
          className={[styles.avatar__status, styles[`avatar__status--${status}`]].join(' ')}
          aria-label={`Status: ${status}`}
        />
      )}
    </span>
  );
}
