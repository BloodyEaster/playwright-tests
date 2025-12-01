import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainPage';

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('Проверка отображения элементов навигации хедера', async ({ page }) => {
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
    await expect
      .soft(page.getByLabel('Main', { exact: true }).locator('b'))
      .toContainText('Playwright');
    await expect.soft(page.getByLabel('Main', { exact: true })).toContainText('Docs');
    await expect.soft(page.getByLabel('Main', { exact: true })).toContainText('API');
    await expect.soft(page.getByLabel('Main', { exact: true })).toContainText('Node.js');
    await expect.soft(page.getByLabel('Main', { exact: true })).toContainText('Community');
  });

  test('Проверка атрибута href', async ({ page }) => {
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
    await page.getByLabel('Switch between dark and light').click();
    await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.getByLabel('Switch between dark and light').click();
    await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('Проверка отображения и наполнения заголовка', async ({ page }) => {
    await expect
      .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
      .toBeVisible();
    await expect
      .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
      .toContainText('Playwright enables reliable end-to-end testing for modern web apps.');
  });

  test('Проверка кнопки Get started', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
    await expect
      .soft(page.getByRole('link', { name: 'Get started' }))
      .toHaveAttribute('href', '/docs/intro');
  });

  test('Проверка атрибута href 2', async ({ page }) => {
    const mainPage = new MainPage(page);
    const linksToCheck = [
      { name: 'Playwright logo Playwright', href: '/' },
      { name: 'Docs', href: '/docs/intro' },
      { name: 'API', href: '/docs/api/class-playwright' },
      { name: 'Community', href: '/community/welcome' },
      { name: 'GitHub repository', href: 'https://github.com/microsoft/playwright' },
      { name: 'Discord server', href: 'https://aka.ms/playwright/discord' },
    ];

    for (const { name, href } of linksToCheck) {
      await expect(mainPage.getLinksByName(name)).toHaveAttribute('href', href);
    }
  });

  test('Поиск и отображение текста на странице', async ({ page }) => {
    await page.goto('https://playwright.dev/docs/browsers/');
    // await page.getByRole('button', { name: 'Search (Ctrl+K)' }).click();
    // await page.getByRole('searchbox', { name: 'Search' }).fill('browsers');
    // await page.getByRole('searchbox', { name: 'Search' }).press('Enter');
    await expect(page.getByText('browsers').first()).toBeVisible();
    await expect(page.locator('h1')).toContainText('Browsers');
  });
});
