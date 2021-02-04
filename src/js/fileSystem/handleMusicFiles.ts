
import {ipcRenderer} from "electron";
import * as fs from "fs";
import * as path from "path";
import * as mm from "music-metadata";
import { MusicType , Albumtype , MusicData , AlubumData , PlayListType, playList } from "../redux/reducer/musics";

const musicExts = [".mp3",".m4a",".wave"];
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

const getMusicData:(file:string,index:number)=>Promise<MusicType> = (file,index) =>{
    return new Promise(resolve=>{
        const audio = new Audio();
        audio.src = file;
        audio.load();
        audio.addEventListener("loadedmetadata",async e=>{
            const musicData = await mm.parseFile(file);
            const musicObj = new MusicData(
                musicData.common?.album ?? "",
                musicData.common?.artist ?? "",
                musicData.common?.title ?? path.basename(file,path.extname(file)),
                index.toString(),
                musicData.common?.year?.toString() ?? "",
                Math.floor(audio.duration),
                file,
                path.basename(file),
                index,
                musicData.common?.picture?.[0].data ?? null
            );
            resolve(musicObj);
        });
    })
};


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

/* データベースのデータを読み込み直す */

export const tuenSavedAlbums:(albums:Albumtype[])=>Promise<Albumtype[]> = async albums =>{
    const promises = await Promise.allSettled(albums.map(async(album,index)=>{
        album.musics = await getSavedMusics(album.musics);
        return album;
    }));
    const albumList = promises.filter(m=> m.status === "fulfilled").map((r:any) => r.value);
    return albumList;
}

export const turnSavedList:(list:PlayListType[])=>Promise<PlayListType[]> = async lists =>{
    const promises = await Promise.allSettled(lists.map(async(list,index)=>{
        const musics = await getSavedMusics(list.musics);
        list.musics = musics;
        return list;
    }));
    const playLists = promises.filter(m=> m.status === "fulfilled").map((r:any) => r.value);
    return playLists;
}


/* 音楽データ読みこみ */
const getSavedMusics:(musics:MusicType[])=>Promise<MusicType[]> = async musics =>{
        const promises = await Promise.allSettled(musics.map(async(music,index)=>{
            try{
                const musicObj = await getMusicData(music.path,index);
                return musicObj;
            }catch(e){
                alert(e);
                return null;
            }
        }));
        const musicData = promises.filter(m=> m.status === "fulfilled").map((r:any) => r.value);
        return musicData;
}