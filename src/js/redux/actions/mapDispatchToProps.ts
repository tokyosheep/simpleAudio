import {MusicObject,CurrentMusicType} from "../reducer/type";
import {MusicAction,currentMusicAction,VolumeAction,PlayOptionType,PausedType,AudioSetType,MainColorType,BackGroundValue,SpectrumValue,SetSettngProp} from "../reducer/index";

export const setMusicSets:(musics:MusicObject[])=>MusicAction = musics =>{
    return{type:"musics_set",musics:musics}
}

export const setCurrentMusic:(music:MusicObject)=>currentMusicAction = music =>{
    return{type:"currentMusic_set",music:music}
}

export const setVolumeValue:(volume:number)=>VolumeAction = volume =>{
    return{type:"volume_set",volume:volume};
}

export const setOptions:(prop:string,value:boolean)=>PlayOptionType = (prop,value)=>{
    return{type:"playOptions_set",prop:prop,value:value}
}

export const setAudioStatus:(audio:HTMLAudioElement)=>AudioSetType = audio =>{
    return{type:"audioObectShare",audio:audio}
}

export const setPaused:(paused:boolean)=>PausedType = paused =>{
    return{type:"paused_set",paused:paused}
}

export const setMainColor:(prop:string,checked:boolean)=>MainColorType =(prop,checked)=>{
    return{type:"mainColor_set",prop:prop,checked:checked}
} 

export const setBackGround:(path:string)=>BackGroundValue = path =>{
    return{type:"background_set",path:path}
}

export const setSpectrum:(prop:string,checked:boolean)=>SpectrumValue = (prop,checked)=>{
    return{type:"spectrum_set",prop:prop,checked:checked}
}

export const setSwitchMonitor:(prop:string,checked:boolean)=>SetSettngProp = (prop,checked)=>{
    return{type:"settingMonitor_set",prop:prop,checked:checked}
}