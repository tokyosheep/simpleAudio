import { MusicType , PlayListAction , PlayListType } from "../reducer/musics";

export const playList_set:(list:PlayListType[])=>PlayListAction = list => ({type:"playList_set",list:list});

export const playList_add:(name:string)=>PlayListAction = name => ({type: "playList_add",name:name});

export const playMusic_remove:(musicIndex:number)=>PlayListAction = musicIndex=>{
    return {type:"playMusic_remove",musicIndex:musicIndex};
}

export const playMusic_add:(music: MusicType,musicIndex:number)=>PlayListAction = (music,musicIndex)=>{
    return{type:"playMusic_add",music:music,musicIndex:musicIndex};
}

export const playList_remove:()=>PlayListAction = () =>({type:"playList_remove"});

export const playList_select:(index:number)=>PlayListAction = index =>({type:"playList_selected",index:index});

export const playMusic_switch:(target:number,replace:number)=>PlayListAction = (target,replace)=>{
    return { type:"playMusic_switch",target:target,replace:replace};
};

export const playList_setMusicIndex:(musicIndex:number)=>PlayListAction = musicIndex =>{
    return{type:"playMusic_setIndex",musicIndex:musicIndex};
};