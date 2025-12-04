import { test, expect } from '@playwright/test';
import { MainPage } from '../models/MainPage';
// import { MainPage } from '../pages/mainPage';

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async () => {
    // await page.goto('https://playwright.dev/');
  });

  test('Проверка отображения элементов навигации хедера', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.openMainPage();
    await mainPage.checkElementsVisability();
  });

  test('Проверка названий элементов хедера', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.openMainPage();
    await mainPage.checkElementsText();
  });

  test('Проверка атрибута href', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.openMainPage();
    await mainPage.checkElementsHrefAttribute();
  });

  test('Проверка переключения лайт мода', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.openMainPage();
    await mainPage.clickSwitchLightModeIcon();
    await mainPage.checkDataThemeAttributeValueLigth();
    await mainPage.clickSwitchLightModeIcon();
    await mainPage.checkDataThemeAttributeValueDark();
    await mainPage.clickSwitchLightModeIcon();
    await mainPage.checkDataThemeAttributeValueSystem();
  });

  //не выносил в класс, т.к. тест занимает меньше строк
  const lightMods = ['light', 'dark', 'system'];

  lightMods.forEach((value) => {
    test(`Проверка стилей активного ${value} мода`, async ({ page }) => {
      await page.evaluate((value) => {
        document.querySelector('html')?.setAttribute('data-theme-choice', value);
      }, value);
      await expect(page).toHaveScreenshot(`pageWith${value}Mode.png`);
    });
  });

  lightMods.forEach((value) => {
    test(`Проверка стилей активного ${value} мода 2`, async ({ page }) => {
      const mainPage = new MainPage(page);
      await mainPage.openMainPage();
      await mainPage.changeMode(value);
      await expect(page).toHaveScreenshot(`pageWith${value}Mode.png`);
    });
  });

  lightMods.forEach((value) => {
    test(`Проверка стилей активного ${value} мода 3`, async ({ page }) => {
      const mainPage = new MainPage(page);
      await mainPage.openMainPage();
      await mainPage.changeAttribute('data-theme', value);
      await expect(page).toHaveScreenshot(`pageWith${value}Mode.png`);
    });
  });

  // test('Проверка атрибута href 2', async ({ page }) => {
  //   const mainPage = new MainPage(page);
  //   const linksToCheck = [
  //     { name: 'Playwright logo Playwright', href: '/' },
  //     { name: 'Docs', href: '/docs/intro' },
  //     { name: 'API', href: '/docs/api/class-playwright' },
  //     { name: 'Community', href: '/community/welcome' },
  //     { name: 'GitHub repository', href: 'https://github.com/microsoft/playwright' },
  //     { name: 'Discord server', href: 'https://aka.ms/playwright/discord' },
  //   ];

  //   for (const { name, href } of linksToCheck) {
  //     await expect(mainPage.getLinksByName(name)).toHaveAttribute('href', href);
  //   }
  // });
});
