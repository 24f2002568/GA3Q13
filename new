(async function() {
  let totalSum = 0;
  
  for (let seed = 29; seed <= 38; seed++) {
    // Open each seed in same tab
    window.location.href = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    
    // Wait for page to load
    await new Promise(r => setTimeout(r, 2000));
    
    // Calculate sum
    let pageSum = 0;
    document.querySelectorAll('table td').forEach(cell => {
      let num = parseInt(cell.textContent.trim(), 10);
      if (!isNaN(num)) pageSum += num;
    });
    
    console.log(`Seed ${seed}: ${pageSum}`);
    totalSum += pageSum;
  }
  
  console.log('TOTAL SUM:', totalSum);
})();
