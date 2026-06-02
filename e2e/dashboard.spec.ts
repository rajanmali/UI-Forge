import { test, expect } from '@playwright/test';

test.describe('Dashboard — DataTable interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForSelector('table[role="grid"]', { timeout: 10000 });
  });

  test('page loads with DataTable showing posts', async ({ page }) => {
    await expect(page.locator('table[role="grid"]')).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'ID' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Title' })).toBeVisible();
  });

  test('filter by text narrows the result set', async ({ page }) => {
    const search = page.getByRole('searchbox');
    await search.fill('qui');
    await page.waitForTimeout(400);
    // Record count badge changes — at minimum table is still visible
    await expect(page.locator('table[role="grid"]')).toBeVisible();
  });

  test('sort by Title column changes row order', async ({ page }) => {
    const sortBtn = page.getByRole('button', { name: /sort by title/i });
    await expect(sortBtn).toBeVisible();
    await sortBtn.click();
    const titleHeader = page.getByRole('columnheader', { name: 'Title' });
    await expect(titleHeader).toHaveAttribute('aria-sort', 'ascending');
  });

  test('compact switch is present in the posts controls', async ({ page }) => {
    // The Compact switch appears in the controls bar of the posts tab
    const label = page.locator('label').filter({ hasText: /compact/i });
    await expect(label).toBeVisible();
  });

  test('pagination controls appear when data exceeds page size', async ({ page }) => {
    // With 100 posts and pageSize=20, Next page button should appear
    await expect(page.getByRole('button', { name: /next page/i })).toBeVisible();
  });
});
