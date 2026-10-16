const { test, expect } = require('@playwright/test');

test('Q3 - performance_glitch_user filter Z to A and buy', async ({ page }) => {
  test.setTimeout(120000); // this user is slow

  // login
  await page.goto('/');
  await page.locator('#user-name').fill('performance_glitch_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/inventory/);

  // reset app state
  await page.locator('#react-burger-menu-btn').click();
  await page.locator('#reset_sidebar_link').click();
  await page.locator('#react-burger-cross-btn').click();
  await page.reload();

  // filter by name Z to A
  await page.locator('.product_sort_container').selectOption('za');

  // save first product name and price
  const productName = await page.locator('.inventory_item_name').first().textContent();
  const priceText = await page.locator('.inventory_item_price').first().textContent();
  const price = parseFloat(priceText.replace('$', ''));
  console.log('First product:', productName, price);

  // add first product to cart
  await page.locator('.btn_inventory').first().click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // checkout
  await page.locator('.shopping_cart_link').click();
  await page.locator('#checkout').click();
  await page.locator('#first-name').fill('Shihab');
  await page.locator('#last-name').fill('Hossain');
  await page.locator('#postal-code').fill('4200');
  await page.locator('#continue').click();

  // check product name on final checkout page
  await expect(page.locator('.inventory_item_name')).toHaveText([productName]);

  // check total price (price + 8% tax)
  const tax = Number((price * 0.08).toFixed(2));
  const total = (price + tax).toFixed(2);
  await expect(page.locator('.summary_subtotal_label')).toHaveText('Item total: $' + price.toFixed(2));
  await expect(page.locator('.summary_total_label')).toHaveText('Total: $' + total);

  // finish order
  await page.locator('#finish').click();
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

  // reset app state again and logout
  await page.locator('#react-burger-menu-btn').click();
  await page.locator('#reset_sidebar_link').click();
  await page.locator('#logout_sidebar_link').click();
  await expect(page.locator('#login-button')).toBeVisible();
});
