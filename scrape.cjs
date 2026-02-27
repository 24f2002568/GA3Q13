const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  let totalSum = 0;
  
  // Loop through seeds 81 to 90
  for (let seed = 81; seed <= 90; seed++) {
    // Replace with actual URL pattern from case study
    await page.goto(`https://ds.study.iitm.ac.in/static/seed-${seed}.html`);
    
    // Extract all numbers from tables
    const numbers = await page.$$eval('table td', cells => 
      cells.map(cell => parseFloat(cell.textContent) || 0)
    );
    
    const pageSum = numbers.reduce((a, b) => a + b, 0);
    totalSum += pageSum;
    
    console.log(`Seed ${seed} sum: ${pageSum}`);
  }
  
  console.log(`FINAL TOTAL SUM: ${totalSum}`);
  
  await browser.close();
})();
