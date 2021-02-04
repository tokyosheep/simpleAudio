
import electron,{ ipcMain , dialog} from "electron";
import {initIpcEvent} from "./ipcCmmut";
import {initDataBaseEvent} from "./DataBase";
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;


let mainWindow;
const debug = true
initIpcEvent();
initDataBaseEvent();
app.on("ready",()=>{
    mainWindow = new BrowserWindow({width:800 + (debug ? 200 : 0),height:500,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    //if(debug)mainWindow.webContents.openDevTools();
    mainWindow.on("closed",()=>{
        mainWindow = null;
    });

});