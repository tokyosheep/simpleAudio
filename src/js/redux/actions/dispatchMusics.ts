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
