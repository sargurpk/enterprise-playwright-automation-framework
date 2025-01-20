import { faker } from '@faker-js/faker';
import * as fs from 'fs';
import * as createCsvWriter from 'csv-writer';
import path from 'path';

// Define the type for the user data
interface UserData {
    name: string;
    email: string;
    username: string;
    phone: string;
    age: number;
    address: string;
}

//Function to generate fake user data
const generateUserData = (): UserData => {
    return {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        username: faker.internet.username(),
        phone: faker.phone.number({ style: 'national'}),
        age: faker.number.int({ min: 18, max:99 }),
        address: faker.location.country()
    };
};

//Function to generate an array of fake user data
export const generateTestData = (numberRecords: number): UserData[] => {
    const testData: UserData[] = faker.helpers.multiple(generateUserData, { 
        count: numberRecords });
    return testData;
};

const currentDir = __dirname
const srcDir = path.resolve(currentDir, '..')
const testDataDir = path.resolve(srcDir, 'testData')

// Function to export data to JSON file
export const exportToJson = (data: UserData[], fileName: string) => {
    fs.writeFileSync(`${testDataDir}\\${fileName}`, JSON.stringify(data, null, 2));
    console.log(`Data exported to JSON file: ${testDataDir}\\${fileName}`)
}

// Function to export data to CSV file
export const exportToCSV = (data: UserData[], fileName: string) => {
    const csvWriter = createCsvWriter.createObjectCsvWriter({
        path: `${testDataDir}\\${fileName}`,
        header: [
            { id: 'name', title: 'Name' },
            { id: 'email', title: 'Email' },
            { id: 'username', title: 'UserName' },
            { id: 'phone', title: 'Phone' },
            { id: 'age', title: 'Age' },
            { id: 'address', title: 'Address' },
        ],
    });

    csvWriter.writeRecords(data).then(() => {
        console.log(`Data exported to CSV file: ${testDataDir}\\${fileName}`)
    });
}

export let demoOutput = faker.person.fullName();