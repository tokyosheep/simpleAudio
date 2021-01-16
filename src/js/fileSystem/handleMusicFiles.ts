
import {ipcRenderer} from "electron";
import * as fs from "fs";
import * as path from "path";
import NodeID3 from "node-id3";
import { MusicType , Albumtype , MusicData , AlubumData } from "../redux/reducer/musics";

const musicExts = [".mp3"];
const imageExts = [".jpg",".jpeg",".png"];

const getmusicFiles:(folder:string)=>Promise<{folder:string,files:string[]}> = async folder =>{
    const files = await fs.promises.readdir(folder);
    const musics = files.filter(f => musicExts.some(e => e === path.extname(f).toLowerCase()));
    return {folder:folder,files:musics.map(f => `${folder}/${f}`)};
}

export const getMusics:()=>Promise<false|{folder:string,files:string[]}> = async() =>{
    const folder = await ipcRenderer.invoke("getDirectoryPath");
    console.log(folder);
    if(folder.canceled)return false;
    return getmusicFiles(folder.filePaths[0]);
}

export const getMusicData:(file:string,index:number)=>Promise<MusicType> = (file,index) =>{
    return new Promise(resolve=>{
        const f = NodeID3.read(file);
        console.log(f);
        const audio = new Audio();
        audio.src = file;
        audio.load();
        audio.addEventListener('loadedmetadata',e=>{
            console.log(audio);
            console.log(audio.duration);//曲の長さ
            const musicObj = new MusicData(
                f.album ?? "",
                f.artist ?? "",
                f.title ?? "",
                f.trackNumber ?? "",
                f.year ?? "",
                Math.floor(audio.duration),
                file,
                path.basename(file),
                index,
                turnedBuffer(f.image)
            )
            resolve(musicObj);
        });
    });
}

type imageType = string | {
    mime: string;
    type: {
        id: number;
        name: string;
    };
    description: string;
    imageBuffer: Buffer;
} | undefined

const turnedBuffer:(obj:imageType|null)=>null|string|Buffer = obj =>{
    if(typeof obj === "string")return obj;
    if(obj === null || obj === undefined || obj.imageBuffer === undefined)return null;
    return obj.imageBuffer;
}

const isFolder:(folder:string)=>Promise<false|{folder:string,files:string[]}> = async folder =>{
    const state = await fs.promises.stat(folder);
    return state.isDirectory() ? await getmusicFiles(folder) : false ;
}

export const getAlbumAndMusics:(folder?:string)=>Promise<Albumtype|false> = async folder =>{
    const musics = folder === undefined ? await getMusics() : await isFolder(folder);
    if(!musics||musics.files.length === 0)return false;
    const promises = await Promise.allSettled(musics.files.map(async(music,index)=>{
        try{
            const musicObj = await getMusicData(music,index);
            return musicObj;
        }catch(e){
            alert(e);
            return null;
        }
    }));
    const musicData = promises.filter(m=> m.status === "fulfilled").map((r:any) => r.value);
    return new AlubumData(musicData,musics.folder,path.basename(musics.folder));
}