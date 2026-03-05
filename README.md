# Playwright EPEX Market Data Scraper

This project implements an automation task using **Playwright** to scrape market data from the EPEX Spot website and export selected columns into a CSV file.

## Task Objective

The script performs the following steps:

1. Visits the EPEX Spot Market Results page
2. Scrapes the following columns from the results table:
   - Low
   - High
   - Last
   - Weight Avg
3. Writes the extracted data into a CSV file

If the page does not load data, the script automatically adjusts the URL using **yesterday's date** in ISO format.

---

## Tech Stack

- Playwright
- TypeScript
- Node.js

---

## Project Structure

brady-epex-task
│
├── tests
│ └── scrapeMarketResults.spec.ts
│
├── utils
│ ├── csvWriter.ts
│ ├── dateUtils.ts
│ └── scrapeMarketData.ts
│
├── output
│ └── market-results-YYYY-MM-DD.csv
│
├── package.json
└── playwright.config.ts
└── README.md

---

## Features

- Dynamic **yesterday date generation**
- **Reusable scraping logic**
- **CSV export**
- **Error handling with try/catch**
- **File validation**
- Clean modular structure

---

## Installation

Clone the repository:

    git clone https://github.com/subbushivu/playwright-epex-data-scraper.git

Install dependencies:
   
    npm install

---

## Run the Test

    npx playwright test

---

## Output

The script generates a CSV file inside the **output** folder.

Example:

output/market-results-2026-03-04.csv

Example CSV:

Low, High, Last, Weight Avg
70.96, 132.40, 94.00, 98.57
88.45, 108.03, 95.01, 98.52
95.00, 112.23, 110.03, 101.52

---

## Notes

- The URL is parameterized using yesterday's date in ISO format.
- Table scraping is implemented using Playwright locators for robustness.
- CSV writing is implemented using Node.js `fs` module.
- The scraping logic is implemented as reusable utilities to keep the test clean and maintainable, following the separation of concerns principle.