const { test, expect } = require('@playwright/test');

test('Q2 - standard_user buy 3 items', async ({ page }) => {
  // login
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/inventory/);

  // reset app state from menu
  await page.locator('#react-burger-menu-btn').click();
  await page.locator('#reset_sidebar_link').click();
  await page.locator('#react-burger-cross-btn').click();
  await page.reload(); // page buttons do not update after reset, so reload

  // add 3 items
  await page.locator('#add-to-cart-sauce-labs-backpack').click();
  await page.locator('#add-to-cart-sauce-labs-bike-light').click();
  await page.locator('#add-to-cart-sauce-labs-bolt-t-shirt').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

  // go to cart and checkout
  await page.locator('.shopping_cart_link').click();
  await page.locator('#checkout').click();
  await page.locator('#first-name').fill('Shihab');
  await page.locator('#last-name').fill('Hossain');
  await page.locator('#postal-code').fill('4200');
  await page.locator('#continue').click();

  // final checkout page - check product names
  await expect(page.locator('.inventory_item_name')).toHaveText([
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
  ]);

  // check total price
  // 29.99 + 9.99 + 15.99 = 55.97, tax 8% = 4.48, total = 60.45
  await expect(page.locator('.summary_subtotal_label')).toHaveText('Item total: $55.97');
  await expect(page.locator('.summary_tax_label')).toHaveText('Tax: $4.48');
  await expect(page.locator('.summary_total_label')).toHaveText('Total: $60.45');

  // finish order
  await page.locator('#finish').click();
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

  // reset app state again
  await page.locator('#react-burger-menu-btn').click();
  await page.locator('#reset_sidebar_link').click();

  // logout
  await page.locator('#logout_sidebar_link').click();
  await expect(page.locator('#login-button')).toBeVisible();
});
