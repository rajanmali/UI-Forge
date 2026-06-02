import { test, expect } from '@playwright/test';

test.describe('Form Demo — 4-step happy path', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/form-demo');
  });

  test('page loads and shows step 1', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /personal information/i })).toBeVisible();
  });

  test('auto-fill and advance through all 4 steps', async ({ page }) => {
    // Step 1 — Personal Information
    await page.getByRole('button', { name: 'Auto-fill' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();

    // Step 2 — Account Setup
    await expect(page.getByRole('heading', { name: /account setup/i })).toBeVisible();
    await page.getByRole('button', { name: 'Auto-fill' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();

    // Step 3 — Preferences
    await expect(page.getByRole('heading', { name: /preferences/i })).toBeVisible();
    await page.getByRole('button', { name: 'Auto-fill' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();

    // Step 4 — Review screen is visible and Create account button is present
    await expect(page.getByRole('heading', { name: /review/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /create account/i })).toBeVisible();
  });

  test('shows inline validation when continuing with empty step 1', async ({ page }) => {
    await page.getByRole('button', { name: 'Continue' }).click();
    // RHF inline errors appear next to the fields — verify at least one is visible
    await expect(page.locator('[id$="-error"], p[class*="error"]').first()).toBeVisible();
  });

  test('Back button returns to previous step', async ({ page }) => {
    await page.getByRole('button', { name: 'Auto-fill' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('heading', { name: /account setup/i })).toBeVisible();
    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page.getByRole('heading', { name: /personal information/i })).toBeVisible();
  });
});
