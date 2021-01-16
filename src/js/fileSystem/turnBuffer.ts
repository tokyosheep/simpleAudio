import electron from "electron";
import {ipcRenderer} from "electron";

import {CurrentMusicType} from "../redux/reducer/musics";

export const turnCoverImage:(currentMusic:CurrentMusicType)=>string = currentMusic =>{
    if(currentMusic === null || currentMusic.imageBuffer === undefined || currentMusic.imageBuffer === null)return `${ipcRenderer.sendSync("getAppPath")}/image/vinyl_600X600.jpg`;
    if(typeof currentMusic.imageBuffer === "string")return currentMusic.imageBuffer;
    const buffer = Buffer.from(currentMusic.imageBuffer);
    return `data:image/png;base64,${buffer.toString("base64")}`;
}