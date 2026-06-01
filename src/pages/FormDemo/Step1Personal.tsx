import { useFormContext } from 'react-hook-form';
import type { FormData } from './schema';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import styles from './FormDemo.module.scss';
import { AUTOFILL } from './schema';

export default function Step1Personal({ disabled = false }: { disabled?: boolean }) {
  const { register, formState: { errors }, setValue } = useFormContext<FormData>();

  function autofill() {
    (['firstName', 'lastName', 'email', 'phone'] as const).forEach(
      (k) => setValue(k, AUTOFILL[k] as string, { shouldValidate: true }),
    );
  }

  return (
    <div className={styles.step}>
      <div className={styles.step__header}>
        <div>
          <h2 className={styles.step__title}>Personal Information</h2>
          <p className={styles.step__desc}>Tell us a bit about yourself. All fields marked are required.</p>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={autofill}
          leftIcon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>}
        >
          Auto-fill
        </Button>
      </div>

      <div className={styles.form_grid}>
        <Input
          label="First name *"
          placeholder="Jane"
          disabled={disabled}
          errorText={errors.firstName?.message}
          {...register('firstName')}
        />
        <Input
          label="Last name *"
          placeholder="Smith"
          disabled={disabled}
          errorText={errors.lastName?.message}
          {...register('lastName')}
        />
        <Input
          label="Email address *"
          type="email"
          placeholder="jane@example.com"
          disabled={disabled}
          errorText={errors.email?.message}
          leftIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
          {...register('email')}
        />
        <Input
          label="Phone number"
          type="tel"
          placeholder="+44 7700 900000"
          helperText="Optional — include country code"
          disabled={disabled}
          errorText={errors.phone?.message}
          leftIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.72 16l.2.92z"/></svg>}
          {...register('phone')}
        />
      </div>
    </div>
  );
}
