import * as fs from "fs"
import * as path from "path";

export function writeCSV(data: string[][], deliveryDate: string): string {

  const header = ['Low', 'High', 'Last', 'Weight Avg'];
  const csvRows = [header, ...data];

  const csvContent = csvRows
  .map(row => row.join(', '))
  .join('\n');

  const outputDir = path.join(process.cwd(), 'output');

  // Create folder if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  const filePath = path.join(outputDir, `market-results-${deliveryDate}.csv`);

  fs.writeFileSync(filePath, csvContent);

  console.log(`CSV file created successfully: ${filePath}`)

  return filePath;
}