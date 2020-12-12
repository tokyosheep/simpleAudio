import electron from "electron";
import {ipcRenderer} from "electron";

import {CurrentMusicType} from "../redux/reducer/type";

export const turnCoverImage:(currentMusic:CurrentMusicType)=>string = currentMusic =>{
    if(currentMusic === null || currentMusic.imageBuffe === undefined || currentMusic.imageBuffe === null)return `${ipcRenderer.sendSync("getAppPath")}/image/vinyl_600X600.jpg`;
    if(typeof currentMusic.imageBuffe === "string")return currentMusic.imageBuffe;
    const buffer = Buffer.from(currentMusic.imageBuffe);
    return `data:image/png;base64,${buffer.toString("base64")}`;
}