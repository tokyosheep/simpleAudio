import {  VolumeAction , AudioAction , PausedAction , PlayingOption , PlayOptionAction } from "../reducer/audio";

export const volumeValue_set:(volume:number)=>VolumeAction = volume =>{
    return{type:"volume_set",volume:volume};
}

export const audioStatus_set:(audio:HTMLAudioElement)=>AudioAction = audio =>{
    return{type:"audio_set",audio:audio}
}

export const paused_set:(paused:boolean)=>PausedAction = paused =>{
    return{type:"paused_set",paused:paused}
}

export const playOptions_set:(prop:string,value:boolean)=>PlayOptionAction = (prop,value) =>{
    return {type:"playOption_set",prop:prop,value:value};
}