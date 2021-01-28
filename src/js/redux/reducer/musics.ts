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

export interface PlayListType {
    name:string;
    index:number;
    musics:MusicType[];
    selected:boolean;
    currentMusicIndex:number;
    addMusic:(music:MusicType,index:number)=>void;
    removeMusic:(index:number)=>void;
    setSelected:(on:boolean)=>void;
    setMusicIndex:(index:number)=>void;
}

class PlayListClass implements PlayListType{
    constructor(
        public name:string,
        public index:number,
        public musics:MusicType[],
        public selected:boolean = false,
        public currentMusicIndex:number = 0
    ){}
    addMusic(music:MusicType,index:number){
        this.musics.splice(index,0,music);
    }
    removeMusic(index:number){
        this.musics = this.musics.filter((m,i)=> i!==index);
    }
    setSelected(on:boolean){
        this.selected = on;
    }
    setMusicIndex(index:number){
        this.currentMusicIndex = index;
    }
}

const initPlayList:PlayListType[] = [new PlayListClass("playlist",0,[]),new PlayListClass("playlistTwo",1,[]),new PlayListClass("playlistThree",2,[])];
initPlayList[0].setSelected(true);
export type PlayListAction = {type:"playMusic_add",music:MusicType,musicIndex:number,listIndex:number}
                            |{type:"playMusic_remove",musicIndex:number,listIndex:number}
                            |{type:"playList_add",name:string}
                            |{type:"playList_remove",index:number}
                            |{type:"playList_selected",index:number}
                            |{type:"playMusic_switch",target:number,replace:number}
                            |{type:"playMusic_setIndex",musicIndex:number};

type PlayListReducer = (state:PlayListType[],action:PlayListAction)=>PlayListType[];

export const playList:PlayListReducer = (state=initPlayList,action)=>{
    switch(action.type){
        case "playList_add":
            return [...state,new PlayListClass(action.name,state.length+1,[])];

        case "playList_remove":
            return state.filter((p,i)=> i !== action.index);

        case "playMusic_add":
            const newList =state[action.listIndex];
            console.log(newList);
            newList.addMusic(action.music,action.musicIndex);
            state[action.listIndex] = newList;
            return [...state];

        case "playMusic_remove":
            const nextList = {...state[action.listIndex]};
            nextList.removeMusic(action.musicIndex);
            state[action.listIndex] = nextList;
            return [...state];

        case "playList_selected":
            state.forEach(s=> s.setSelected(false));
            state[action.index].setSelected(true);
            return[...state];

        case "playMusic_switch":
            const current = state.find(p=> p.selected);
            const switchMusic = current?.musics.find((v,i)=> i===action.target) ?? null;
            if(switchMusic === null || switchMusic === undefined || current === undefined)return state;
            const musics = current?.musics ?? null;
            if(musics===null)return state;
            const after:any[] = musics.map((v,i)=> {
                if(i===action.target)return null;
                return v;
            }).reduce((acc:(MusicType|null)[],current:MusicType|null,index)=>{
                if(index===action.replace)return [...acc,current,switchMusic];
                return [...acc,current];
            },[]).filter(v => v !== null);
            state[current.index].musics = after;
            return [...state];

        case "playMusic_setIndex":
            state.forEach(v=> {
                if(v.selected)v.setMusicIndex(action.musicIndex);
            });
            return [...state];

        default:
            return state;
    }
}
