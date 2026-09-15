const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 393, height: 852 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();
  await page.goto('http://localhost:5050/', { waitUntil: 'networkidle' });

  const info = await page.evaluate(() => {
    const sidebar = document.querySelector('.sidebar');
    const main = document.querySelector('.main-content');
    const container = document.querySelector('.app-container');
    const header = document.querySelector('.top-header');

    return {
      windowWidth: window.innerWidth,
      sidebar: sidebar ? {
        display: getComputedStyle(sidebar).display,
        position: getComputedStyle(sidebar).position,
        width: getComputedStyle(sidebar).width,
        bounds: sidebar.getBoundingClientRect()
      } : null,
      main: main ? {
        display: getComputedStyle(main).display,
        width: getComputedStyle(main).width,
        marginLeft: getComputedStyle(main).marginLeft,
        paddingLeft: getComputedStyle(main).paddingLeft,
        bounds: main.getBoundingClientRect()
      } : null,
      container: container ? {
        display: getComputedStyle(container).display,
        flexDirection: getComputedStyle(container).flexDirection,
        bounds: container.getBoundingClientRect()
      } : null,
      header: header ? {
        display: getComputedStyle(header).display,
        bounds: header.getBoundingClientRect()
      } : null
    };
  });

  console.log("LAYOUT DEBUG INFO:", JSON.stringify(info, null, 2));
  await browser.close();
})();
