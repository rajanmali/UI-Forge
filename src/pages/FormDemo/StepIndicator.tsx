import { motion } from 'framer-motion';
import styles from './FormDemo.module.scss';

interface Step {
  label: string;
  description: string;
}

interface Props {
  steps: Step[];
  current: number;
}

export default function StepIndicator({ steps, current }: Props) {
  return (
    <nav aria-label="Form progress" className={styles.stepper}>
      {steps.map((step, i) => {
        const done    = i < current;
        const active  = i === current;

        return (
          <div key={step.label} className={styles.stepper__step}>
            {/* connector line */}
            {i > 0 && (
              <div className={styles.stepper__line_wrap}>
                <div className={styles.stepper__line}>
                  <motion.div
                    className={styles.stepper__line_fill}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: done ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    style={{ transformOrigin: 'left' }}
                  />
                </div>
              </div>
            )}

            {/* bubble */}
            <div className={styles.stepper__item} aria-current={active ? 'step' : undefined}>
              <motion.div
                className={[
                  styles.stepper__bubble,
                  done   ? styles['stepper__bubble--done']   : '',
                  active ? styles['stepper__bubble--active'] : '',
                ].filter(Boolean).join(' ')}
                animate={{ scale: active ? 1.1 : 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                {done ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <span>{i + 1}</span>
                )}
              </motion.div>
              <div className={styles.stepper__label_wrap}>
                <span className={[styles.stepper__label, active ? styles['stepper__label--active'] : ''].join(' ')}>
                  {step.label}
                </span>
                <span className={styles.stepper__desc}>{step.description}</span>
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
