import { test, expect } from '@playwright/test';

test.describe('Theme persistence', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('dark mode toggle switches data-theme attribute', async ({ page }) => {
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'light');
    await page.getByRole('button', { name: /switch to dark/i }).click();
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('dark mode persists after reload', async ({ page }) => {
    await page.getByRole('button', { name: /switch to dark/i }).click();
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('palette switch updates data-palette attribute', async ({ page }) => {
    // Open the ThemeSwitcher dropdown (aria-label is "Colour palette: Ocean")
    await page.getByRole('button', { name: /colour palette/i }).click();
    // Click the Forest option (role="option")
    await page.getByRole('option', { name: /forest/i }).click();
    await expect(page.locator('html')).toHaveAttribute('data-palette', 'forest');
  });

  test('palette persists after reload', async ({ page }) => {
    await page.getByRole('button', { name: /colour palette/i }).click();
    await page.getByRole('option', { name: /violet/i }).click();
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-palette', 'violet');
  });

  test('restores default light/ocean after clearing storage', async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(page.locator('html')).toHaveAttribute('data-palette', 'ocean');
  });
});
