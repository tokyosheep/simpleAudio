import { MusicType , Albumtype , CurrentMusicType , CurrentMusicAction , PlayListType } from "../reducer/musics";
import { currentMusic_set } from "./dispatchMusics";
import * as path from "path";

export const headToNextMusic:(albumList:Albumtype[],currentMusic:CurrentMusicType)=>CurrentMusicAction = (albumList,currentMusic) =>{
    return  currentMusic_set(getNextMusic(albumList,currentMusic));
}

export const backToNextMusic:(albumList:Albumtype[],currentMusic:CurrentMusicType)=>CurrentMusicAction = (albumList,currentMusic) =>{
    return  currentMusic_set(getBackMusic(albumList,currentMusic));
}

const getNextMusic:(albumList:Albumtype[],currentMusic:CurrentMusicType)=>MusicType = (albumList,currentMusic)=>{
    const currentAlbumIndex = albumList.findIndex(album=> album.path === path.dirname(currentMusic?.path ?? ""));
    console.log(path.dirname(currentMusic?.path ?? ""));
    const currentAlbum = albumList[currentAlbumIndex];
    if(currentMusic === null||currentAlbum === undefined)return albumList[0].musics[0];
    if(currentMusic.index+1 > currentAlbum.musics.length)return currentAlbumIndex+1 > albumList.length ? currentMusic : albumList[currentAlbumIndex+1].musics[0];
    return currentAlbum.musics[currentMusic.index+1];
}

const getBackMusic:(albumList:Albumtype[],currentMusic:CurrentMusicType)=>MusicType = (albumList,currentMusic)=>{
    const currentAlbumIndex = albumList.findIndex(album=> album.path === path.dirname(currentMusic?.path ?? ""));
    const currentAlbum = albumList[currentAlbumIndex];
    if(currentMusic === null||currentAlbum === undefined)return albumList[0].musics[0];
    if(currentMusic.index-1 < 0)return currentAlbumIndex-1 < 0 ? currentMusic : albumList[currentAlbumIndex-1].musics[albumList[currentAlbumIndex-1].musics.length];
    return currentAlbum.musics[currentMusic.index-1];
}

export const headNextPlayList:(playList:PlayListType[])=>[MusicType,number]|null = playList =>{
    const list = playList.find(p=> p.selected === true );
    if(list === undefined)return null;
    const listIndex = list.musics.length >= (list.currentMusicIndex + 1) ? list.currentMusicIndex + 1 : 0;
    return [list.musics[listIndex],listIndex];
}