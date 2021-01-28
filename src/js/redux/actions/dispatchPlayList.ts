import { MusicType , PlayListAction } from "../reducer/musics";

export const playList_add:(name:string)=>PlayListAction = name => ({type: "playList_add",name:name});

export const playList_remove:(musicIndex:number,listIndex:number)=>PlayListAction = (musicIndex,listIndex)=>{
    return {type:"playMusic_remove",musicIndex:musicIndex,listIndex:listIndex};
}

export const playMusic_add:(music: MusicType,musicIndex:number,listIndex:number)=>PlayListAction = (music,musicIndex,listIndex)=>{
    return{type:"playMusic_add",music:music,musicIndex:musicIndex,listIndex:listIndex};
}

export const playMusic_remove:(index:number)=>PlayListAction = index =>({type:"playList_remove",index:index});

export const playList_select:(index:number)=>PlayListAction = index =>({type:"playList_selected",index:index});

export const playMusic_switch:(target:number,replace:number)=>PlayListAction = (target,replace)=>{
    return { type:"playMusic_switch",target:target,replace:replace};
};

export const plsyList_setMusicIndex:(musicIndex:number)=>PlayListAction = musicIndex =>{
    return{type:"playMusic_setIndex",musicIndex:musicIndex};
}