import axios from "axios";
import { SHA512, AES, enc, lib } from "crypto-js";
import pbkdf2 from "pbkdf2";

export async function hashPassword(password) {
    var salt = await generateSalt("master-password-salt")

    return SHA512(password, salt)
}


async function generateSalt(keyName) {
    var getSaltFromJson = await (await axios.get(`http://localhost:3001/read?id=${keyName}`)).data

    var salt
    if (getSaltFromJson.id !== null) {
        salt = getSaltFromJson.value
    } else {
        salt = lib.WordArray.random(128/8).toString();
        let result = await axios.post(`http://localhost:3001/write?id=${keyName}&value=${salt}`)
        console.log(result.data);
    }
            
    return salt
}

export async function generateAuthKey(email, masterPassword) {
    var salt = await generateSalt("auth-salt")

    var text = email + salt + masterPassword + salt

    var key = pbkdf2.pbkdf2Sync(text, salt, 100001, 64, 'sha512')
    console.log(`${text} ${salt} => ${key} : ${JSON.stringify(key).toString('Utf8')}`);

    return key
}

export async function generateVaultKey(email, masterPassword) {
    var authKey = await generateAuthKey(email, masterPassword)
    var salt = await generateSalt("vault-salt")

    authKey = authKey + salt + email + masterPassword

    var vaultKey = pbkdf2.pbkdf2Sync(authKey, salt, 10000, 64, 'sha512')

    return vaultKey
}

export async function generateVaultNumber(authKey) {
    var number = await SHA512(authKey)
    console.log(number)

    return number
}

export async function encryptVaultItem(item, key){
    console.log(item, key);
    var ciphertext = AES.encrypt(
        JSON.stringify(item), 
        key
    ).toString()
    console.log("1: " + ciphertext)

    return ciphertext
}


export async function decryptVaultItem(ciphertext, key) {    
    var data  = AES.decrypt(ciphertext, key).toString(enc.Utf8)
    var decryptedData = JSON.parse(data)

    return decryptedData
}