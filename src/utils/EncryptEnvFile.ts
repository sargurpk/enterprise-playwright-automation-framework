import CryptoJsUtil from 'crypto-js'
import fs from 'fs'
import path from 'path'

const SALT = process.env.SALT || 'defaultSalt';
const currentDir = __dirname;

const srcDir = path.resolve(currentDir, '..')

const configDir = path.resolve(srcDir, 'config');
const envFilePath = `${configDir}\\.env`;
if(process.env.NODE_ENV){
    const envFilePath = `${configDir}\\.env.${process.env.NODE_ENV}`
}

console.log(envFilePath)

export function encryptEnvFile() {
    //Read the .env file
    const envFileContent = fs.readFileSync(envFilePath, 'utf8');
    const envLines = envFileContent.split('\n')

    //Encrypt values and update the array
    const encryptedLines = envLines.map((line) => {
        const [key, value] = line.split('=');

        if(value) {
            const encryptedValue = CryptoJsUtil.AES.encrypt(value, SALT).toString();
            return `${key}=${encryptedValue}`;
        }

        return line;
    });

    // Join the lines and write back to the .env file
    const updatedEnvContent = encryptedLines.join('\n')
    fs.writeFileSync(envFilePath, updatedEnvContent, 'utf8')

    console.log('Encryption completed! Updated .env file')

}

export function decryptEnvFile() {
    //Read .env file
    const envFileContent = fs.readFileSync(envFilePath, 'utf8')
    const envLines = envFileContent.split('\n')

    //Decrypt values
    const decryptedLines = envLines.map((line) => {
        const [key, value] = line.split('=');

        if (value) {
            const decryptedValue = CryptoJsUtil.AES.decrypt(value, SALT).toString(CryptoJsUtil.enc.Utf8);
            return `${key}=${decryptedValue}`
        }

        return line
    });

    //Join the lines and write back to the .env file
    const updatedEncContent = decryptedLines.join('\n')
    fs.writeFileSync(envFilePath, updatedEncContent, 'utf8')

    console.log('Decryption completed! Updated .env file')
}