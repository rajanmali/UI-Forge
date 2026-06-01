import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import type { FormData } from './schema';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import styles from './FormDemo.module.scss';
import { AUTOFILL } from './schema';

function EyeIcon({ open }: { open: boolean }) {
  return open
    ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
    : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;
}

const ROLE_OPTIONS = [
  { value: 'developer', label: 'Developer' },
  { value: 'designer',  label: 'Designer' },
  { value: 'manager',   label: 'Product Manager' },
  { value: 'other',     label: 'Other' },
];

function PasswordStrength({ value }: { value: string }) {
  const checks = [
    value.length >= 8,
    /[A-Z]/.test(value),
    /[0-9]/.test(value),
    /[^a-zA-Z0-9]/.test(value),
  ];
  const score = checks.filter(Boolean).length;
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colours = ['', '#ef4444', '#f59e0b', '#3b82f6', '#22c55e'];

  if (!value) return null;

  return (
    <div className={styles.strength}>
      <div className={styles.strength__bars}>
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className={styles.strength__bar}
            style={{ backgroundColor: n <= score ? colours[score] : undefined }}
          />
        ))}
      </div>
      <span className={styles.strength__label} style={{ color: colours[score] }}>
        {labels[score]}
      </span>
    </div>
  );
}

export default function Step2Account({ disabled = false }: { disabled?: boolean }) {
  const { register, control, watch, formState: { errors }, setValue } = useFormContext<FormData>();
  const [showPw, setShowPw]     = useState(false);
  const [showCpw, setShowCpw]   = useState(false);
  const pwValue = watch('password') ?? '';

  function autofill() {
    (['username', 'password', 'confirmPassword', 'role'] as const).forEach(
      (k) => setValue(k, AUTOFILL[k] as string, { shouldValidate: true }),
    );
  }

  return (
    <fieldset className={styles.step} disabled={disabled}>
      <div className={styles.step__header}>
        <div>
          <h2 className={styles.step__title}>Account Setup</h2>
          <p className={styles.step__desc}>Choose your username, set a secure password, and select your role.</p>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={autofill}
          leftIcon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>}
        >
          Auto-fill
        </Button>
      </div>

      <div className={styles.form_grid}>
        <Input
          label="Username *"
          placeholder="jane_smith"
          helperText="3–20 chars — lowercase letters, numbers, underscores only"
          disabled={disabled}
          errorText={errors.username?.message}
          leftIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
          {...register('username')}
        />

        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select
              label="Role *"
              placeholder="Select your role…"
              options={ROLE_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              errorText={errors.role?.message}

              fullWidth
            />
          )}
        />

        <div className={styles.full_col}>
          <Input
            label="Password *"
            type={showPw ? 'text' : 'password'}
            placeholder="Min 8 chars, one uppercase, one number"
            disabled={disabled}
            errorText={errors.password?.message}
            rightIcon={
              <button type="button" onClick={() => setShowPw((v) => !v)} aria-label={showPw ? 'Hide password' : 'Show password'} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                <EyeIcon open={showPw} />
              </button>
            }
            {...register('password')}
          />
          <PasswordStrength value={pwValue} />
        </div>

        <div className={styles.full_col}>
          <Input
            label="Confirm password *"
            type={showCpw ? 'text' : 'password'}
            placeholder="Repeat your password"
            disabled={disabled}
            errorText={errors.confirmPassword?.message}
            rightIcon={
              <button type="button" onClick={() => setShowCpw((v) => !v)} aria-label={showCpw ? 'Hide password' : 'Show password'} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                <EyeIcon open={showCpw} />
              </button>
            }
            {...register('confirmPassword')}
          />
        </div>
      </div>
    </fieldset>
  );
}
