import { Controller, useFormContext } from 'react-hook-form';
import type { FormData } from './schema';
import Textarea from '../../components/Textarea/Textarea';
import Input from '../../components/Input/Input';
import Switch from '../../components/Switch/Switch';
import { RadioGroup } from '../../components/Radio/Radio';
import Button from '../../components/Button/Button';
import styles from './FormDemo.module.scss';
import { AUTOFILL } from './schema';

const THEME_OPTIONS = [
  { value: 'light',  label: 'Light',  helperText: 'Always use light mode' },
  { value: 'dark',   label: 'Dark',   helperText: 'Always use dark mode' },
  { value: 'system', label: 'System', helperText: 'Follow system preference' },
];

const EXP_OPTIONS = [
  { value: 'junior', label: 'Junior',    helperText: '0–2 years' },
  { value: 'mid',    label: 'Mid-level', helperText: '2–5 years' },
  { value: 'senior', label: 'Senior',    helperText: '5–10 years' },
  { value: 'lead',   label: 'Lead / Principal', helperText: '10+ years' },
];

export default function Step3Preferences() {
  const { register, control, watch, formState: { errors }, setValue } = useFormContext<FormData>();
  const bio = watch('bio') ?? '';

  function autofill() {
    setValue('bio',           AUTOFILL.bio ?? '',    { shouldValidate: true });
    setValue('website',       AUTOFILL.website ?? '', { shouldValidate: true });
    setValue('notifications', AUTOFILL.notifications, { shouldValidate: true });
    setValue('newsletter',    AUTOFILL.newsletter,    { shouldValidate: true });
    setValue('theme',         AUTOFILL.theme,         { shouldValidate: true });
    setValue('experience',    AUTOFILL.experience,    { shouldValidate: true });
  }

  return (
    <div className={styles.step}>
      <div className={styles.step__header}>
        <div>
          <h2 className={styles.step__title}>Preferences</h2>
          <p className={styles.step__desc}>Customise your profile and notification settings.</p>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={autofill}
          leftIcon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>}
        >
          Auto-fill
        </Button>
      </div>

      <div className={styles.form_stack}>
        {/* Bio */}
        <div>
          <Textarea
            label="Bio"
            placeholder="Tell the community about yourself…"
            rows={3}
            helperText={`${bio.length}/280 characters`}
            errorText={errors.bio?.message}
            fullWidth
            {...register('bio')}
          />
        </div>

        {/* Website */}
        <Input
          label="Website"
          type="url"
          placeholder="https://yoursite.com"
          helperText="Optional personal or portfolio link"
          errorText={errors.website?.message}
          leftIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>}
          {...register('website')}
          fullWidth
        />

        {/* Theme */}
        <Controller
          name="theme"
          control={control}
          render={({ field }) => (
            <RadioGroup
              name="theme"
              label="Interface theme *"
              value={field.value}
              onChange={field.onChange}
              options={THEME_OPTIONS}
              orientation="horizontal"
              errorText={errors.theme?.message}
            />
          )}
        />

        {/* Experience */}
        <Controller
          name="experience"
          control={control}
          render={({ field }) => (
            <RadioGroup
              name="experience"
              label="Experience level *"
              value={field.value}
              onChange={field.onChange}
              options={EXP_OPTIONS}
              orientation="horizontal"
              errorText={errors.experience?.message}
            />
          )}
        />

        {/* Notifications */}
        <div className={styles.switches}>
          <Controller
            name="notifications"
            control={control}
            render={({ field }) => (
              <Switch
                label="Email notifications"
                helperText="Receive updates about your account activity"
                checked={field.value}
                onChange={field.onChange}
                size="md"
              />
            )}
          />
          <Controller
            name="newsletter"
            control={control}
            render={({ field }) => (
              <Switch
                label="Product newsletter"
                helperText="Monthly digest of new features and changelog"
                checked={field.value}
                onChange={field.onChange}
                size="md"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
