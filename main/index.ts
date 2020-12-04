
import electron,{ ipcMain , dialog} from "electron";
import {initIpcEvent} from "./ipcCmmut";
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;


let mainWindow;
const debug = true
initIpcEvent();

app.on("ready",()=>{
    mainWindow = new BrowserWindow({width:600 + (debug ? 200 : 0),height:400,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    if(debug)mainWindow.webContents.openDevTools();
    mainWindow.on("closed",()=>{
        mainWindow = null;
    });

});