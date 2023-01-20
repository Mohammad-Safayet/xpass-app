const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url');
const fs = require('fs');
const isDev = require('electron-is-dev')

const { 
  LOAD_KEYS_FROM_JSON_FILE, 
  SAVE_KEYS_FROM_JSON_FILE, 
  HANDLE_LOAD_KEYS_FROM_JSON_FILE, 
  HANDLE_SAVE_KEYS_FROM_JSON_FILE 
} = require('../src/utils/constants')


// require('@electron/remote/main').initialize()
// require("electron-reloader")(module)
let win

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1250,
    height: 900,
    titleBarStyle: "hiddenInset",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: __dirname + '/preload.js',
      contextIsolation: false,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true
    }
  })

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : url.format({
          pathname: path.join(__dirname, 'index.html'),
          protocol: 'file:',
          slashes: true
        })
  )

  // win.webContents.openDevTools();

  // win.loadURL("http://localhost:3000")
}

app.on('ready',createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

ipcMain.on(LOAD_KEYS_FROM_JSON_FILE, (event, message) => {
  console.log(`${message}`);
  win.on(HANDLE_LOAD_KEYS_FROM_JSON_FILE, {
    success: true,
    message: message
  })
})

ipcMain.on(SAVE_KEYS_FROM_JSON_FILE, (event, message) => {
  console.log(`${message}`);
  win.on(HANDLE_SAVE_KEYS_FROM_JSON_FILE, {
    success: true,
    message: message
  })
})
