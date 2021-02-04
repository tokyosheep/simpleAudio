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
    ipcMain.handle("getImagePath",event=>{
        const image = dialog.showOpenDialog({
            properties:["openFile"],
            filters:[
                {name:"image",extensions:["jpg","jpeg","png"]}
            ]
        });
        return image;
    });
    ipcMain.handle("getVideoPath",event=>{
        const video = dialog.showOpenDialog({
            properties:["openFile"],
            filters:[
                {name:"image",extensions:["mp4","mov","avi"]}
            ]
        });
        return video;
    })
    ipcMain.handle("getAppPath",event=>{
        return app.getAppPath();
    });
}