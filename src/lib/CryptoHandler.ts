import CryptoJS from 'crypto-js';

export default class CryptoHandler {
    
    static encode(data: object) {
        return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.JWT_SECRET as string).toString();
    }

    static decode<T>(encoded: string) {
        return JSON.parse(CryptoJS.AES.decrypt(encoded, process.env.JWT_SECRET as string).toString(CryptoJS.enc.Utf8)) as T;
    }
};