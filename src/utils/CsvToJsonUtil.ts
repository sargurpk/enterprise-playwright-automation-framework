import * as fs from 'fs';
import path, { delimiter } from 'path';

const CSVtoJSON = (data, delimitter = ',') => {
    const titles = data.slice(0, data.indexOf('\n')).split(delimitter)
    return data
        .slice(data.indexOf('\n')+1)
        .split('\n')
        .map((value) => {
            const values = value.split(delimitter);
            return titles.reduce(
                (obj, title, index) => ((obj[title.trim()] = values[index].trim()), obj),
                {}
            );
        });
};

const currentDir = __dirname;
const srcDir = path.resolve(currentDir, '..');
const testDataDir = path.resolve(srcDir, 'testData');
const csvFilePath = `${testDataDir}`;

export const converCsvFileToJsonFile = (csvFileName, jsonFileName, delimitter = ',') => {
    try {
        // Read the CSV file
        const csvData = fs.readFileSync(`${testDataDir}\\${csvFileName}`, 'utf8');

        // Convert CSV to json
        const jsonData = CSVtoJSON(csvData, delimitter);

        // Write JSON data to a new file
        fs.writeFileSync(`${testDataDir}\\${jsonFileName}`, JSON.stringify(jsonData, null, 2));

        console.log(`Conversion completed. JSON data written to: ${testDataDir}\\${jsonFileName}`);

    } catch (error) {
        console.error(`Error converting CSV to JSON:`, error.message)
    }
}