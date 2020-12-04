import {MusicObject,CurrentMusicType} from "../reducer/type";
import {MusicAction,currentMusicAction} from "../reducer/index";

export const setMusicSets:(musics:MusicObject[])=>MusicAction = musics =>{
    return{type:"musics_set",musics:musics}
}

export const setCurrentMusic:(music:MusicObject)=>currentMusicAction = music =>{
    return{type:"currentMusic_set",music:music}
}