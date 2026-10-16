const { test, expect } = require('@playwright/test');

test('Q1 - locked_out_user login error', async ({ page }) => {
  await page.goto('/');

  await page.locator('#user-name').fill('locked_out_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // check the error message
  const error = page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  await expect(error).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});
