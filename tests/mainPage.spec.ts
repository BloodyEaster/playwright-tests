import { test, expect } from '@playwright/test';

test('Проверка отображения элементов навигации хедера', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect.soft(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'Docs' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'API' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Node.js' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'Community' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'GitHub repository' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'Discord server' })).toBeVisible();
  await expect
    .soft(page.getByRole('button', { name: 'Switch between dark and light' }))
    .toBeVisible();
});
test('Проверка названий элементов хедера', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect
    .soft(page.getByLabel('Main', { exact: true }).locator('b'))
    .toContainText('Playwright');
  await expect.soft(page.getByLabel('Main', { exact: true })).toContainText('Docs');
  await expect.soft(page.getByLabel('Main', { exact: true })).toContainText('API');
  await expect.soft(page.getByLabel('Main', { exact: true })).toContainText('Node.js');
  await expect.soft(page.getByLabel('Main', { exact: true })).toContainText('Community');
});
test('Проверка атрибута href', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toHaveAttribute(
    'href',
    '/',
  );
  await expect
    .soft(page.getByRole('link', { name: 'Docs' }))
    .toHaveAttribute('href', '/docs/intro');
  await expect
    .soft(page.getByRole('link', { name: 'API' }))
    .toHaveAttribute('href', '/docs/api/class-playwright');
  await expect
    .soft(page.getByRole('link', { name: 'Community' }))
    .toHaveAttribute('href', '/community/welcome');
  await expect
    .soft(page.getByRole('link', { name: 'GitHub repository' }))
    .toHaveAttribute('href', 'https://github.com/microsoft/playwright');
  await expect
    .soft(page.getByRole('link', { name: 'Discord server' }))
    .toHaveAttribute('href', 'https://aka.ms/playwright/discord');
});
test('Проверка переключения лайт мода', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByLabel('Switch between dark and light').click();
  await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByLabel('Switch between dark and light').click();
  await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});
test('Проверка отображения и наполнения заголовка', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect
    .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
    .toBeVisible();
  await expect
    .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
    .toContainText('Playwright enables reliable end-to-end testing for modern web apps.');
});
test('Проверка кнопки Get started', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
  await expect
    .soft(page.getByRole('link', { name: 'Get started' }))
    .toHaveAttribute('href', '/docs/intro');
});
