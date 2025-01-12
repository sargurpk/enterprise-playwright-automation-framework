import CryptoJsUtil from 'crypto-js'

const SALT = process.env.SALT || 'defaultSalt';

export function encrypt(text: string){
    const cipherText = CryptoJsUtil.AES.encrypt(text, SALT).toString();
    return cipherText;
}

export function decrypt(cipherText: string){
    const bytes = CryptoJsUtil.AES.decrypt(cipherText, SALT);
    const originalText = bytes.toString(CryptoJsUtil.enc.Utf8);
    return originalText;
}