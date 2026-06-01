import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FormDemo.module.scss';
import StepIndicator from './StepIndicator';
import Step1Personal from './Step1Personal';
import Step2Account from './Step2Account';
import Step3Preferences from './Step3Preferences';
import Step4Review from './Step4Review';
import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';
import { fullSchema, STEP_FIELDS, type FormData } from './schema';
import { useAppDispatch } from '../../store';
import { addToast } from '../../store/uiSlice';

const STEPS = [
  { label: 'Personal',    description: 'Your identity' },
  { label: 'Account',     description: 'Credentials' },
  { label: 'Preferences', description: 'Customise' },
  { label: 'Review',      description: 'Confirm' },
];

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];

function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      className={styles.success}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <motion.div
        className={styles.success__icon}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.15 }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </motion.div>
      <h2 className={styles.success__title}>Account Created!</h2>
      <p className={styles.success__desc}>
        Your UIForge account has been set up successfully. This is a demo — no data was actually stored.
      </p>
      <Button onClick={onReset} variant="secondary">Start over</Button>
    </motion.div>
  );
}

export default function FormDemo() {
  const dispatch  = useAppDispatch();
  const [step, setStep]       = useState(0);
  const [dir, setDir]         = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    mode: 'onTouched',
    defaultValues: {
      notifications: true,
      newsletter: false,
      theme: 'system',
      experience: 'mid',
    },
  });

  async function next() {
    const valid = await methods.trigger(STEP_FIELDS[step]);
    if (!valid) return;
    setDir(1);
    setStep((s) => s + 1);
  }

  function back() {
    setDir(-1);
    setStep((s) => s - 1);
  }

  async function submit() {
    const valid = await methods.trigger(STEP_FIELDS[2]);
    if (!valid) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setSubmitted(true);
    dispatch(addToast({ type: 'success', message: 'Account created successfully!' }));
  }

  function reset() {
    methods.reset();
    setStep(0);
    setSubmitted(false);
  }

  const stepComponents = [
    <Step1Personal    key="s1" disabled={submitting} />,
    <Step2Account     key="s2" disabled={submitting} />,
    <Step3Preferences key="s3" disabled={submitting} />,
    <Step4Review      key="s4" />,
  ];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit:  (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  };

  if (submitted) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <SuccessScreen onReset={reset} />
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.page_header}>
          <Badge variant="info" size="sm">Interactive Demo</Badge>
          <h1 className={styles.page_title}>Multi-Step Form</h1>
          <p className={styles.page_desc}>
            A fully validated multi-step form built with React Hook Form + Zod. Fill fields manually or hit <strong>Auto-fill</strong> on any step to populate valid data instantly.
          </p>
        </div>

        <div className={styles.layout}>
          {/* Step indicator */}
          <aside className={styles.aside}>
            <StepIndicator steps={STEPS} current={step} />

            {/* Component legend */}
            <div className={styles.legend}>
              <p className={styles.legend__title}>Components used</p>
              <ul className={styles.legend__list}>
                {['Input', 'Select', 'Textarea', 'RadioGroup', 'Switch', 'Button', 'Badge', 'Avatar', 'Spinner'].map((c) => (
                  <li key={c} className={styles.legend__item}>
                    <span className={styles.legend__dot} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Form card */}
          <div className={styles.card}>
            <FormProvider {...methods}>
              <form onSubmit={(e) => e.preventDefault()} noValidate>
                <div className={styles.step_wrap}>
                  <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                      key={step}
                      custom={dir}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.28, ease: EASE }}
                    >
                      {stepComponents[step]}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className={styles.nav}>
                  <span className={styles.nav__progress}>
                    Step {step + 1} of {STEPS.length}
                  </span>
                  <div className={styles.nav__actions}>
                    {step > 0 && (
                      <Button type="button" variant="ghost" onClick={back}>
                        Back
                      </Button>
                    )}
                    {step < STEPS.length - 1 ? (
                      <Button type="button" onClick={next}>
                        Continue
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" style={{ marginLeft: 4 }}>
                          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </Button>
                    ) : (
                      <Button type="button" onClick={submit} loading={submitting}>
                        Create account
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </main>
  );
}
