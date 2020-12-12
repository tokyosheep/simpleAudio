export type MusicObject = {
    album:string,
    artist:string,
    title:string,
    trackNumber:string,
    year:string,
    imageBuffe?:Buffer|string|null,
    long:number,
    path:string,
    fileName:string,
    index:number
}

export type CurrentMusicType = MusicObject|null;

export type MainColor = {
    [key:string]:boolean,
    blue:boolean,
    orange:boolean,
    green:boolean,
    yellow:boolean
}

export type SpectrumType = {
    [key:string]:boolean,
    square:boolean,
    circle:boolean
}

export interface PlayingOption {
    [key:string]:boolean;
    repeat:boolean,
    succession:boolean
    shuffle:boolean
}

export type SwitchMonitorType = {
    [key:string]:boolean;
    menu:boolean,
    loading:boolean
}
