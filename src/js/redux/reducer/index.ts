import {MusicObject,CurrentMusicType,PlayingOption,MainColor,SpectrumType,SwitchMonitorType} from "./type";

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

const initVolume = 0.2;
export type VolumeAction = {type:string,volume:number};
type VolumeType = (state:number,action:VolumeAction)=>number;

const setMinAndMaxValue :(num:number)=>number = num => num > 1 ? 1.0 : num < 0 ? 0.0 : num;

export const volume:VolumeType = (state=initVolume,action)=>{
    switch(action.type){
        case "volume_set":
            return setMinAndMaxValue(action.volume);

        default:
            return state;
    }
}


const initCurrentMusic:CurrentMusicType = null;
export type currentMusicAction = {type:string,music:CurrentMusicType};
type CurrentMusicFunc = (state:CurrentMusicType,action:currentMusicAction)=>CurrentMusicType;

export const currentMusic:CurrentMusicFunc = (state=initCurrentMusic,action)=>{
    console.log(action);
    switch(action.type){
        case"currentMusic_set":
            return action.music;

        default:
            return state;
    }
}

const initOption:PlayingOption = {
    repeat:false,
    succession:true,
    shuffle:false
}
export type PlayOptionType = {type:string,prop:string,value:boolean}
export type PlayOptionFunc = (state:PlayingOption,action:PlayOptionType)=>PlayingOption;

export const playOptions:PlayOptionFunc = (state=initOption,action) =>{
    switch(action.type){
        case"playOptions_set":
            const options = {...state};
            Object.keys(options).forEach(key=> options[key] = false);
            options[action.prop] = action.value;
            return options;

        default:
            return state;
    }
}
const initAudio = new Audio();
export type AudioSetType = {type:string,audio:HTMLAudioElement};
export type AudioSetFunc = (state:HTMLAudioElement,action:AudioSetType)=>HTMLAudioElement;

export const audioObjShare:AudioSetFunc = (state=initAudio,action)=>{
    switch(action.type){
        case"audioObectShare":
            return action.audio;

        default:
            return state;
    }
}

const initPaued = true;
export type PausedType = {type:string,paused:boolean};
export type PausedFunc = (state:boolean,action:PausedType)=>boolean;

export const isPaused:PausedFunc = (state=initPaued,action)=>{
    switch(action.type){
        case "paused_set":
            return action.paused;

        default:
            return state;
    }
}

const initMainColor:MainColor = {
    blue:true,
    orange:false,
    green:false,
    yellow:false
}

export type MainColorType = {type:string,prop:string,checked:boolean};
export type MainColorFunc = (state:MainColor,action:MainColorType)=>MainColor;
export const mainColor:MainColorFunc = (state=initMainColor,action)=>{
    switch(action.type){
        case "mainColor_set":
            const color = {...state};
            Object.keys(color).forEach(key=> color[key] = false);
            color[action.prop] = action.checked;
            return color;

            default:
                return state;
    }
}

const initBackGround = "./image/convert.jpg";

export type BackGroundValue = {type:string,path:string};
export type BackGroundFunc = (state:string,action:BackGroundValue)=>string;
export const backGroundPath:BackGroundFunc = (state=initBackGround,action)=>{
    switch(action.type){
        case "background_set":
            return action.path;

        default:
            return state;
    }
}

const initSpectrum:SpectrumType = {
    square:true,
    circle:false
}

export type SpectrumValue = {type:string,prop:string,checked:boolean};
export type SpectrumFunc = (state:SpectrumType,action:SpectrumValue)=>SpectrumType;
export const spectrumType:SpectrumFunc = (state=initSpectrum,action)=>{
    switch(action.type){
        case "spectrum_set":
            const kinds = {...state};
            Object.keys(kinds).forEach(key=> kinds[key] = false);
            kinds[action.prop] = action.checked;
            return kinds;

        default:
            return state;
    }
}
const initMonitorSetting:SwitchMonitorType = {loading:false,menu:false};
export type SetSettngProp = {type:string,prop:string,checked:boolean};
export type SetSettingFunc = (state:SwitchMonitorType,action:SetSettngProp)=>SwitchMonitorType;
export const settingsMonitor:SetSettingFunc = (state=initMonitorSetting,action)=>{
    switch(action.type){
        case"settingMonitor_set":
            const status = {...state};
            status[action.prop] = action.checked;
            return status;

        default:
            return state;
    }
}

export type ReduceType = {
    musics:MusicObject[],
    volume:number,
    currentMusic:CurrentMusicType,
    playOptions:PlayingOption,
    audioObjShare:HTMLAudioElement,
    isPaused:boolean,
    mainColor:MainColor,
    backGroundPath:string,
    spectrumType:SpectrumType,
    settingsMonitor:SwitchMonitorType
}