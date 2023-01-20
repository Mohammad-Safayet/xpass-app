const { ipcRenderer } = require('electron');
const { 
    LOAD_KEYS_FROM_JSON_FILE, 
    SAVE_KEYS_FROM_JSON_FILE 
} = require('../src/utils/constants')

function loadKeys() {
    ipcRenderer.send(LOAD_KEYS_FROM_JSON_FILE, "items")
}

function saveKeys(item) {
    ipcRenderer.send(SAVE_KEYS_FROM_JSON_FILE, item)
}

module.exports = {
    loadKeys: loadKeys,
    saveKeys: saveKeys
}
