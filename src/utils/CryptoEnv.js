import CryptoJS from "crypto-js";


const secretKey = import.meta.env.VITE_API_SECRET;

export const encrypt = (data) =>{
    return CryptoJS.AES.encrypt(data, secretKey).toString();
}



export const descrypData = (data) =>{
    const bytes = CryptoJS.AES.decrypt(data, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}



export const tokenEncrypt = (data) =>{
    const secretKey = import.meta.env.VITE_API_SECRET;
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}