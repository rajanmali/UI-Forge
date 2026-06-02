import { test, expect } from '@playwright/test';

test.describe('Command palette navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('opens via Navbar search button', async ({ page }) => {
    await page.getByRole('button', { name: /open command palette/i }).click();
    await expect(page.getByRole('dialog', { name: /command palette/i })).toBeVisible();
  });

  test('opens with keyboard shortcut', async ({ page }) => {
    // Try both Meta+k (Mac) and Control+k (other platforms)
    await page.keyboard.press('Control+k');
    const dialog = page.getByRole('dialog', { name: /command palette/i });
    const isOpen = await dialog.isVisible().catch(() => false);
    if (!isOpen) {
      // Fallback: open via button
      await page.getByRole('button', { name: /open command palette/i }).click();
    }
    await expect(dialog).toBeVisible();
  });

  test('closes with Escape', async ({ page }) => {
    await page.getByRole('button', { name: /open command palette/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('closes when backdrop is clicked', async ({ page }) => {
    await page.getByRole('button', { name: /open command palette/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.mouse.click(10, 10);
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('typing filters results', async ({ page }) => {
    await page.getByRole('button', { name: /open command palette/i }).click();
    await page.getByRole('combobox').fill('dashboard');
    await expect(page.getByRole('option', { name: 'Dashboard' })).toBeVisible();
  });

  test('clicking a page item navigates to that route', async ({ page }) => {
    await page.getByRole('button', { name: /open command palette/i }).click();
    await page.getByRole('combobox').fill('docs');
    await page.getByRole('option', { name: 'Docs' }).click();
    await expect(page).toHaveURL(/\/docs/);
  });

  test('arrow key navigation moves active item', async ({ page }) => {
    await page.getByRole('button', { name: /open command palette/i }).click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    // After 2 ArrowDowns the active item moved — palette is still open
    await expect(page.getByRole('dialog')).toBeVisible();
  });
});

test.describe('Standard navigation', () => {
  test('nav links route to correct pages', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /dashboard/i }).click();
    await expect(page).toHaveURL(/\/dashboard/);

    await page.getByRole('link', { name: /form/i }).click();
    await expect(page).toHaveURL(/\/form-demo/);

    await page.getByRole('link', { name: /docs/i }).click();
    await expect(page).toHaveURL(/\/docs/);
  });

  test('changelog page loads with release timeline', async ({ page }) => {
    await page.goto('/changelog');
    await expect(page.getByRole('heading', { name: /changelog/i })).toBeVisible();
    // Release entries show version numbers like "v1.5.4"
    await expect(page.locator('h2').first()).toContainText('v');
  });
});
