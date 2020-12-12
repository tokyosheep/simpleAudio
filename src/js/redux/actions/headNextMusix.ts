import {currentMusicAction} from "../reducer/index";
import {MusicObject,CurrentMusicType} from "../reducer/type";
import {setCurrentMusic} from "./mapDispatchToProps";

export const headToNextMusic:(musicis:MusicObject[],currentMusic:CurrentMusicType)=>currentMusicAction = (musics,currentMusic) =>{
    return  setCurrentMusic(getNextMusic(musics,currentMusic));
}

export const backToNextMusic:(musicis:MusicObject[],currentMusic:CurrentMusicType)=>currentMusicAction = (musics,currentMusic) =>{
    return  setCurrentMusic(getBackMusic(musics,currentMusic));
}

const getNextMusic:(musicis:MusicObject[],currentMusic:CurrentMusicType)=>MusicObject = (musics,currentMusic)=>{
    if(currentMusic === null||currentMusic.index+1 >= musics.length)return musics[0];
    return musics[currentMusic.index+1];
}

const getBackMusic:(musicis:MusicObject[],currentMusic:CurrentMusicType)=>MusicObject = (musics,currentMusic)=>{
    if(currentMusic === null||currentMusic.index-1 < 0)return musics[0];
    return musics[currentMusic.index-1];
}

