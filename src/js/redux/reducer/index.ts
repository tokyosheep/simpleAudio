import {MusicObject,CurrentMusicType} from "./type";

const initMusics:MusicObject[] = [];

export type MusicAction = {type:string,musics:MusicObject[]};
type MusicsReduce = (state:MusicObject[],action:MusicAction)=>MusicObject[];

export const musics:MusicsReduce = (state=initMusics,action) =>{
    switch(action.type){
        case "musics_set":
            return action.musics;

        default:
            return state;
    }
}

const initVolume = 5;
type VolumeType = (state:number,action:{type:string,volume:number})=>number;

export const volume:VolumeType = (state=initVolume,action)=>{
    switch(action.type){
        case "volume_set":
            return action.volume;

        default:
            return state;
    }
}


const initCurrentMusic:CurrentMusicType = null;
export type currentMusicAction = {type:string,music:CurrentMusicType};
type CurrentMusicFunc = (state:CurrentMusicType,action:currentMusicAction)=>CurrentMusicType;

export const currentMusic:CurrentMusicFunc = (state=initCurrentMusic,action)=>{
    switch(action.type){
        case"currentMusic_set":
            return action.music;

        default:
            return state;
    }
}

export type ReduceType = {
    musics:MusicObject[],
    volume:number,
    currentMusic:CurrentMusicType
}