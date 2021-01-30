import { AlbumAction , Albumtype , CurrentMusicAction , CurrentMusicType , PlayListType } from "../reducer/musics";

export const album_add:(album:Albumtype[])=>AlbumAction = album =>{
    return{type:"album_add",album:album};
}

export const album_remove:(index:number)=>AlbumAction = index =>{
    return{type:"album_remove",index:index};
}

export const currentMusic_set:(current:CurrentMusicType)=>CurrentMusicAction = current =>{
    return{type:"currentMusic_set",music:current};
}

export const album_setIndex:(albumIndex:number,musicIndex:number)=>AlbumAction = (albumIndex,musicIndex) =>{
    return{type:"album_setIndex",albumIndex:albumIndex,musicIndex:musicIndex};
}

