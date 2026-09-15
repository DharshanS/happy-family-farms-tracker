const { chromium } = require('playwright');
const path = require('path');

(async () => {
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 393, height: 852 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true
    });
    const page = await context.newPage();
    
    console.log("Navigating to http://localhost:5050/...");
    await page.goto('http://localhost:5050/', { waitUntil: 'networkidle' });
    
    const artifactDir = '/home/dharshan/.gemini/antigravity/brain/dea2e8d0-83eb-49c6-8632-eede0122f240';
    
    // Screenshot Dashboard
    await page.screenshot({ path: path.join(artifactDir, 'iphone16_dashboard.png'), fullPage: false });
    console.log("Saved iphone16_dashboard.png");

    // Click Customers tab
    await page.click('.mobile-nav-item[data-tab="customers"]');
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(artifactDir, 'iphone16_customers.png'), fullPage: false });
    console.log("Saved iphone16_customers.png");

    // Click Daily Entry tab
    await page.click('.mobile-nav-item[data-tab="daily-entry"]');
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(artifactDir, 'iphone16_daily_entry.png'), fullPage: false });
    console.log("Saved iphone16_daily_entry.png");

    // Click Expenses tab
    await page.click('.mobile-nav-item[data-tab="expenses"]');
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(artifactDir, 'iphone16_expenses.png'), fullPage: false });
    console.log("Saved iphone16_expenses.png");

    // Click Records tab
    await page.click('.mobile-nav-item[data-tab="records"]');
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(artifactDir, 'iphone16_records.png'), fullPage: false });
    console.log("Saved iphone16_records.png");

    // Click Settings tab
    await page.click('.mobile-nav-item[data-tab="settings"]');
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(artifactDir, 'iphone16_settings.png'), fullPage: false });
    console.log("Saved iphone16_settings.png");

    await browser.close();
    console.log("SUCCESS: All mobile screenshots captured!");
  } catch (err) {
    console.error("Playwright Execution Error:", err);
    process.exit(1);
  }
})();
