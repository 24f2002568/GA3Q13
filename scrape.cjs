const { chromium } = require('playwright');

const seeds = [81,82,83,84,85,86,87,88,89,90];
const BASE = 'https://sanand0.github.io/tdsdata/playwright/';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let total = 0;

  for (const seed of seeds) {
    await page.goto(`${BASE}?seed=${seed}`);

    const numbers = await page.$$eval('table td', tds =>
      tds
        .map(td => td.innerText.trim())
        .filter(x => /^-?\d+(\.\d+)?$/.test(x))
        .map(Number)
    );

    total += numbers.reduce((a, b) => a + b, 0);
  }

  console.log('Sum =', total);

  await browser.close();
})();
