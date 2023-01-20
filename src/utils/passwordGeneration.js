import randomWords from 'random-words'
import randomstring from "randomstring";
import { SHA3 } from "crypto-js";

export function words() {
    var passphrase = randomWords({
        exactly: getRandomInt(8, 10), 
        join: "%"
    })
    const replacements = { 'a': 'U','b': 'N','c': 'A','d': 'V','e': 'Z','f': 'Q','g': 'I','h': 'B','i': 'R','j': 'G','k': 'C','l': 'S','m': 'Y','n': 'T','o': 'X','p': 'M','q': 'E','r': 'O','s': 'W','t': 'D','u': 'J','v': 'L','w': 'P','x': 'H','y': 'F','z': 'K'}


    console.log(passphrase);
    passphrase = passphrase.replace(/[a-z]/g, char => replacements[char])
    passphrase = passphrase.replace(/[a-m]/g, char => replacements[char])
    passphrase = passphrase.replace(/[m-z]/g, char => replacements[char])
    
    const replacement2 = { 'a': '0','b': '3','c': '9','d': '5','e': '4','f': '6','g': '6','h': '0','i': '5','j': '5','k': '7','l': '7','m': '4','n': '4','o': '8','p': '+','q': '4','r': '7','s': '8','t': '5','u': '3','v': '9','w': '9','x': '89','y': '8','z': '3', '%': 'y', '+': '@'}
    
    passphrase = passphrase.replace(/[f-t]/g, char => replacement2[char])
    passphrase = randomstring.generate({
        length: 64,
        charset: "alphanumeric" 
    })
    console.log(passphrase);

    return passphrase
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
