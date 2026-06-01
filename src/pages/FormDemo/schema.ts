import { z } from 'zod';

export const step1Schema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName:  z.string().min(2, 'Last name must be at least 2 characters'),
  email:     z.string().email('Please enter a valid email address'),
  phone:     z.string().regex(/^\+?[0-9\s\-().]{7,15}$/, 'Please enter a valid phone number').or(z.literal('')).optional(),
});

export const step2Schema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be 20 characters or fewer')
    .regex(/^[a-z0-9_]+$/, 'Only lowercase letters, numbers and underscores allowed'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  confirmPassword: z.string(),
  role: z.enum(['developer', 'designer', 'manager', 'other'], {
    error: 'Please select a role',
  }),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const step3Schema = z.object({
  bio:           z.string().max(280, 'Bio must be 280 characters or fewer').optional(),
  website:       z.string().url('Please enter a valid URL').or(z.literal('')).optional(),
  notifications: z.boolean(),
  newsletter:    z.boolean(),
  theme:         z.enum(['light', 'dark', 'system']),
  experience:    z.enum(['junior', 'mid', 'senior', 'lead']),
});

// Full merged schema for the single RHF instance
export const fullSchema = step1Schema
  .and(step2Schema)
  .and(step3Schema);

export type Step1Fields = keyof z.infer<typeof step1Schema>;
export type Step2Fields = keyof z.infer<typeof step2Schema>;
export type Step3Fields = keyof z.infer<typeof step3Schema>;

export type FormData = z.infer<typeof step1Schema> &
  z.infer<typeof step2Schema> &
  z.infer<typeof step3Schema>;

// Fields to validate per step
export const STEP_FIELDS: Array<Array<keyof FormData>> = [
  ['firstName', 'lastName', 'email', 'phone'],
  ['username', 'password', 'confirmPassword', 'role'],
  ['bio', 'website', 'notifications', 'newsletter', 'theme', 'experience'],
];

// ─── Auto-fill seeds ──────────────────────────────────────────
export const AUTOFILL: FormData = {
  firstName:       'Rajan',
  lastName:        'Mali',
  email:           'rajan@uiforge.dev',
  phone:           '+44 7700 900123',
  username:        'rajan_mali',
  password:        'UIForge2024!',
  confirmPassword: 'UIForge2024!',
  role:            'developer',
  bio:             'Senior front-end engineer specialising in React component libraries, design systems, and developer tooling.',
  website:         'https://uiforge.dev',
  notifications:   true,
  newsletter:      false,
  theme:           'dark',
  experience:      'senior',
};
