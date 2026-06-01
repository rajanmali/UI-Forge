import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import type { FormData } from './schema';
import Badge from '../../components/Badge/Badge';
import Avatar from '../../components/Avatar/Avatar';
import styles from './FormDemo.module.scss';

function ReviewRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className={styles.review_row}>
      <span className={styles.review_label}>{label}</span>
      <span className={styles.review_value}>{value}</span>
    </div>
  );
}

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } } };

export default function Step4Review() {
  const { getValues } = useFormContext<FormData>();
  const d = getValues();

  const ROLE_LABELS: Record<string, string> = { developer: 'Developer', designer: 'Designer', manager: 'Product Manager', other: 'Other' };
  const EXP_LABELS:  Record<string, string> = { junior: 'Junior (0–2 yrs)', mid: 'Mid-level (2–5 yrs)', senior: 'Senior (5–10 yrs)', lead: 'Lead / Principal (10+)' };
  const THEME_LABELS: Record<string, string> = { light: 'Light', dark: 'Dark', system: 'System' };

  return (
    <div className={styles.step}>
      <div className={styles.step__header}>
        <div>
          <h2 className={styles.step__title}>Review &amp; Submit</h2>
          <p className={styles.step__desc}>Double-check your details before creating your account.</p>
        </div>
      </div>

      <motion.div className={styles.review} variants={stagger} initial="hidden" animate="show">
        {/* Profile preview */}
        <motion.div variants={fadeUp} className={styles.review_profile}>
          <Avatar name={`${d.firstName} ${d.lastName}`} size="xl" status="online" />
          <div>
            <p className={styles.review_name}>{d.firstName} {d.lastName}</p>
            <p className={styles.review_handle}>@{d.username}</p>
            <Badge variant="secondary" size="sm">{ROLE_LABELS[d.role]}</Badge>
          </div>
        </motion.div>

        {/* Section: Personal */}
        <motion.div variants={fadeUp} className={styles.review_section}>
          <h3 className={styles.review_section_title}>Personal Information</h3>
          <ReviewRow label="Full name"  value={`${d.firstName} ${d.lastName}`} />
          <ReviewRow label="Email"      value={d.email} />
          <ReviewRow label="Phone"      value={d.phone || <span style={{ opacity: 0.4 }}>—</span>} />
        </motion.div>

        {/* Section: Account */}
        <motion.div variants={fadeUp} className={styles.review_section}>
          <h3 className={styles.review_section_title}>Account</h3>
          <ReviewRow label="Username"   value={`@${d.username}`} />
          <ReviewRow label="Role"       value={ROLE_LABELS[d.role]} />
          <ReviewRow label="Password"   value={<span>{'•'.repeat(d.password.length)}</span>} />
        </motion.div>

        {/* Section: Preferences */}
        <motion.div variants={fadeUp} className={styles.review_section}>
          <h3 className={styles.review_section_title}>Preferences</h3>
          <ReviewRow label="Experience"      value={EXP_LABELS[d.experience]} />
          <ReviewRow label="Theme"           value={THEME_LABELS[d.theme]} />
          <ReviewRow label="Notifications"   value={<Badge variant={d.notifications ? 'success' : 'neutral'} size="sm">{d.notifications ? 'On' : 'Off'}</Badge>} />
          <ReviewRow label="Newsletter"      value={<Badge variant={d.newsletter ? 'success' : 'neutral'} size="sm">{d.newsletter ? 'Subscribed' : 'Opt-out'}</Badge>} />
          {d.bio     && <ReviewRow label="Bio"     value={d.bio} />}
          {d.website && <ReviewRow label="Website" value={<a href={d.website} target="_blank" rel="noopener noreferrer">{d.website}</a>} />}
        </motion.div>
      </motion.div>
    </div>
  );
}
