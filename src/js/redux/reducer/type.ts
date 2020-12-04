export type MusicObject = {
    album:string,
    artist:string,
    title:string,
    trackNumber:string,
    year:string,
    imageBuffe?:Buffer|string,
    long:number,
    path:string,
    fileName:string,
    index:number
}

export type CurrentMusicType = MusicObject|null;