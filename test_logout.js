const { chromium } = require('playwright');

(async () => {
  console.log('Testing Sign Out functionality in Headless Chrome...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5050/', { waitUntil: 'networkidle' });

  // 1. Log in as admin using quickLogin
  await page.evaluate(() => window.quickLogin('admin'));
  await page.waitForTimeout(300);

  // Check login modal is hidden
  const isModalVisibleBefore = await page.$eval('#loginModal', el => el.style.display !== 'none' && el.classList.contains('active'));
  console.log('Is Login Modal visible after login?', isModalVisibleBefore); // Should be false

  // 2. Click Sign Out
  await page.evaluate(() => window.logoutUser());
  await page.waitForTimeout(300);

  // Check login modal is now visible
  const isModalVisibleAfter = await page.$eval('#loginModal', el => el.style.display === 'flex' && el.classList.contains('active'));
  console.log('Is Login Modal visible after logout?', isModalVisibleAfter); // Should be true

  const currentUserInStorage = await page.evaluate(() => localStorage.getItem('farm_user'));
  console.log('User in localStorage after logout:', currentUserInStorage); // Should be null

  await browser.close();

  if (!isModalVisibleBefore && isModalVisibleAfter && currentUserInStorage === null) {
    console.log('✅ SIGN OUT TEST PASSED PERFECTLY!');
  } else {
    console.error('❌ SIGN OUT TEST FAILED!');
    process.exit(1);
  }
})();
