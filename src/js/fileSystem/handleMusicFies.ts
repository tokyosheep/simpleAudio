import {ipcRenderer} from "electron";
import * as fs from "fs";
import * as path from "path";
import NodeID3 from "node-id3";

import {MusicObject} from "../redux/reducer/type";

const musicExts = [".mp3"];

export const getMusics:()=>Promise<false|string[]> = async() =>{
    const folder = await ipcRenderer.invoke("getDirectoryPath");
    if(folder.canceled)return false;
    console.log(folder);
    const files = await fs.promises.readdir(folder.filePaths[0]);
    const musics = files.filter(f => musicExts.some(e => e === path.extname(f).toLowerCase()));
    return musics.map(f => `${folder.filePaths[0]}/${f}`);
}

export const getMusicData:(file:string,index:number)=>Promise<MusicObject> = (file,index) =>{
    return new Promise(resolve=>{
        const f = NodeID3.read(file);
        console.log(f);
        const audio = new Audio();
        audio.src = file;
        audio.load();
        audio.addEventListener('loadedmetadata',e=>{
            console.log(audio);
            console.log(audio.duration);//曲の長さ
            const musicObj:MusicObject = {
                album:f.album ?? "",
                artist:f.artist ?? "",
                title:f.title ?? "",
                trackNumber:f.trackNumber ?? "",
                year:f.year ?? "",
                long:Math.floor(audio.duration),
                path:file,
                fileName:path.basename(file),
                index:index
            }
            resolve(musicObj);
        });
    });
}