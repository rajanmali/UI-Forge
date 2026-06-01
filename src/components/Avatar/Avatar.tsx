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
  '#1B3A6B', '#2563EB', '#7C3AED', '#DB2777', '#DC2626',
  '#D97706', '#16A34A', '#0891B2', '#9333EA', '#EA580C',
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
  const bgColor = name ? getColorFromName(name) : '#1B3A6B';
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
