
const electron = require("electron");
const { ipcMain } = require("electron");
const { dialog } = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;


let mainWindow;
app.on("ready",()=>{
    mainWindow = new BrowserWindow({width:900,height:600,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.webContents.openDevTools();
    mainWindow.on("closed",()=>{
        mainWindow = null;
    });
});