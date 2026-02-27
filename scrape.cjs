const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  let totalSum = 0;
  
  // Correct base URL from the case study
  const baseUrl = 'https://sanand0.github.io/tdsdata/js_table/?seed=';
  
  for (let seed = 81; seed <= 90; seed++) {
    try {
      const url = `${baseUrl}${seed}`;
      console.log(`Navigating to: ${url}`);
      
      await page.goto(url, { waitUntil: 'networkidle' });
      
      // Wait for the table to be present
      await page.waitForSelector('table', { timeout: 10000 });
      
      // Get all numbers from all table cells (td elements)
      const numbers = await page.$$eval('table td', cells => 
        cells.map(cell => {
          const text = cell.textContent.trim();
          // Parse as integer (all numbers in the table are integers)
          const num = parseInt(text, 10);
          return isNaN(num) ? 0 : num;
        })
      );
      
      const pageSum = numbers.reduce((a, b) => a + b, 0);
      totalSum += pageSum;
      
      console.log(`Seed ${seed} sum: ${pageSum} (from ${numbers.length} numbers)`);
      
      // Optional: Add a small delay to be gentle on the server
      await page.waitForTimeout(1000);
      
    } catch (error) {
      console.log(`Error on seed ${seed}: ${error.message}`);
    }
  }
  
  console.log(`\n🎉 FINAL TOTAL SUM FOR SEEDS 81-90: ${totalSum}`);
  
  await browser.close();
})();
