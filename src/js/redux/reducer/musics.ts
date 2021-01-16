export interface MusicType{
    album:string,
    artist:string,
    title:string,
    trackNumber:string,
    year:string,
    duration:number,
    path:string,
    fileName:string,
    index:number,
    imageBuffer?:Buffer|string|null,
}

export class MusicData implements MusicType{
    constructor(
        public album:string,
        public artist:string,
        public title:string,
        public trackNumber:string,
        public year:string,
        public duration:number,
        public path:string,
        public fileName:string,
        public index:number,
        public imageBuffer?:Buffer|string|null
        ){
        
    }
}

export interface Albumtype{
    musics:MusicType[]
    path:string,
    name:string,
}

export class AlubumData implements Albumtype{
    constructor(
        public musics:MusicType[],
        public path:string,
        public name:string
    ){

    }
}

const initAlbums:Albumtype[] = [];

export type AlbumAction = {type:"album_add",album:Albumtype[]}|{type:"album_remove",index:number};
type AlbumReducer = (state:Albumtype[],action:AlbumAction)=>Albumtype[];

export const albumList:AlbumReducer = (state=initAlbums,action) =>{
    switch(action.type){
        case "album_add":
            const albums = [...state,...action.album];
            return albums;

        case "album_remove":
            const removed = state.filter((a,i)=> i===action.index);
            return removed;

        default:
            return state;
    }
}

export type CurrentMusicType = MusicType|null;
const initCurrentMusic:CurrentMusicType = null;
export type CurrentMusicAction = {type:"currentMusic_set",music:CurrentMusicType};
type CurrentMusicReducer = (state:CurrentMusicType,action:CurrentMusicAction)=>CurrentMusicType;

export const currentMusic:CurrentMusicReducer = (state=initCurrentMusic,action)=>{
    switch(action.type){
        case "currentMusic_set":
            return action.music;

        default:
            return state;
    }
}