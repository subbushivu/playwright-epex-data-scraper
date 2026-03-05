const { chromium } = require('playwright')
/**
 * Scrapes Low, High, Last and Weight Avg columns
 * from the given EPEX market results URL.
 */

export async function scrapeMarketData(page, url: string): Promise<string[][]> {
    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForSelector('table');
  
      const rows = page.locator('table tbody tr');
      const rowCount = await rows.count();
  
      const extractedData: string[][] = [];
  
      for (let i = 0; i < rowCount; i++) {
        const cells = rows.nth(i).locator('td');
        const cellCount = await cells.count();
  
        // Skip invalid rows
        if (cellCount < 4) continue;
  
        const rowData: string[] = [];
  
        // Extract only first 4 required columns
        for (let j = 0; j < 4; j++) {
          const text = (await cells.nth(j).innerText()).trim();
          rowData.push(text);
        }
  
        // Skip rows that contain only "-"
        const isValidRow = rowData.some(value => value !== '-');
  
        if (isValidRow) {
          extractedData.push(rowData);
        }
      }
  
      return extractedData;
  
    } catch (error) {
      console.error('Error while scraping market data:', error);
      throw error;
    }
  }