import { test, expect } from '@playwright/test';
import { getYesterdayDate } from '../utils/dateUtils'
import { scrapeMarketData } from '../utils/scrapeMarketData';
import { writeCSV } from '../utils/csvWriter';
import fs from 'fs'

test('Scrape EPEX data and generate CSV', async ({ page }) => {

  // Parameterized url
  const deliveryDate = getYesterdayDate()

  const baseUrl = 'https://www.epexspot.com/en/market-results';

  const url = `${baseUrl}?market_area=GB&delivery_date=${deliveryDate}&modality=Continuous&data_mode=table`;

  // Call reusable function

  try {

    console.log("Opening EPEX market results page...")

    const data = await scrapeMarketData(page,url)

    if (!data || data.length === 0) {
        throw new Error("No data scraped")
    }

console.log(`Scraped ${data.length} rows of market data`)

console.log("Writing data to CSV file...")

const filePath = writeCSV(data, deliveryDate)

const fileStats = fs.statSync(filePath)

expect(fileStats.size).toBeGreaterThan(0)

} catch (error) {

    console.error("Test failed:", error)
    throw error

}
});