import electron from "electron";
import { ipcMain } from "electron"
import { dialog } from "electron";
const app = electron.app;

//const DataStore = require("nedb");

export const initIpcEvent = () =>{
    ipcMain.handle("getDirectoryPath",event=>{
        const folder = dialog.showOpenDialog({properties:["openDirectory"]});
        return folder;
    });
}