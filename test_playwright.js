const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = '/home/dharshan/.gemini/antigravity/brain/dea2e8d0-83eb-49c6-8632-eede0122f240';

(async () => {
  console.log('Launching Playwright Chromium Audit...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const viewports = [
    { name: 'desktop_1280', width: 1280, height: 800 },
    { name: 'tablet_768', width: 768, height: 1024 },
    { name: 'iphone16_393', width: 393, height: 852 },
    { name: 'iphone16promax_440', width: 440, height: 956 }
  ];

  const tabs = ['dashboard', 'customers', 'expenses', 'daily-entry', 'records', 'settings'];

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1
    });

    const page = await context.newPage();
    await page.goto('http://localhost:5050/', { waitUntil: 'networkidle' });

    for (const tab of tabs) {
      const selector = vp.width <= 1024 
        ? `.mobile-nav-item[data-tab="${tab}"]`
        : `.nav-item[data-tab="${tab}"]`;

      if (await page.$(selector)) {
        await page.click(selector);
        await page.waitForTimeout(300);
      }

      const imgPath = path.join(ARTIFACT_DIR, `audit_${vp.name}_${tab}.png`);
      await page.screenshot({ path: imgPath, fullPage: false });
      console.log(`Saved screenshot: ${imgPath}`);
    }

    await context.close();
  }

  await browser.close();
  console.log('Playwright Audit Completed Successfully!');
})();
