import * as React from "react";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../../redux/StateType";
import {useState,useEffect} from "react";

import { playList_setMusicIndex } from "../../../redux/actions/dispatchPlayList";
import { audioStatus_set , paused_set } from "../../../redux/actions/dispatchAudio";
import { currentMusic_set , album_setIndex } from "../../../redux/actions/dispatchMusics";
import { headToNextMusic , headNextPlayList , headNextMusicIndex } from "../../../redux/actions/moveNextMusic";

const randomNum:(length:number)=>number = length =>{
    return Math.floor(Math.random()*length);
}

const useAudio:()=>[boolean,number,()=>void,()=>void,(url:string)=>void,(time:number)=>void] = () =>{
    const dispatch = useDispatch();
    const volume = useSelector((state:StateType)=>state.volume);
    const currentMusic = useSelector((state:StateType)=>state.currentMusic);
    const options = useSelector((state:StateType)=>state.playOptions);
    const albumList = useSelector((state:StateType)=>state.albumList);
    const pauseStatus = useSelector((state:StateType)=>state.isPaused);

    const playList = useSelector((state:StateType)=>state.playList);
    const isPlayList = useSelector((state:StateType)=>state.modeWindow.playlist);
    const [audio,setAudio] = useState(new Audio());
    dispatch(audioStatus_set(audio));
    const [, _forceUpdate] = useState(false);
    const forceUpdate = () => _forceUpdate(prevState=> !prevState);

    //audioメソッドは事前にthisを束縛しないといけない
    const play = () => audio.play.bind(audio);
    const pause = () =>audio.pause.bind(audio);
    const nextMusic = () =>{
        if(isPlayList){
            const playData = headNextPlayList(playList);
            if(playData === null)return;
            dispatch(playList_setMusicIndex(playData[1]));
            dispatch(currentMusic_set(playData[0]));
        }else{
            const indexes = headNextMusicIndex(albumList,currentMusic);
            dispatch(album_setIndex(indexes[0],indexes[1]));
            dispatch(currentMusic_set(albumList[indexes[0]].musics[indexes[1]]));
        }
    }
    const shuffleMusic = () =>{
        if(isPlayList){
            const currentList = playList.find(p=> p.selected === true);
            const shuffledNumber = randomNum(currentList?.musics.length ?? 0);
            dispatch(playList_setMusicIndex(shuffledNumber));
            dispatch(currentMusic_set(currentList?.musics[shuffledNumber] ?? currentMusic));
        }else{
            const randomAlbum = randomNum(albumList.length);
            const randomMusic = randomNum(albumList[randomAlbum].musics.length);
            dispatch(album_setIndex(randomAlbum,randomMusic));
            dispatch(currentMusic_set(albumList[randomAlbum].musics[randomMusic]));
        }
    }
    const switchMusic = () =>{
        console.log("end");
        if(options.repeat)audio.currentTime=0;
        if(options.succession)nextMusic();
        if(options.shuffle)shuffleMusic();
        if(options.noOption === false){
            play()()
        }else{
            pause()();
        }
        forceUpdate();
    }
    useEffect(()=>{
        audio.addEventListener("play", forceUpdate);
        audio.addEventListener("pause", forceUpdate);
        audio.addEventListener("ended",switchMusic);
        audio.addEventListener("timeupdate", ()=>{
            audio.removeEventListener("ended",forceUpdate);
            audio.addEventListener("ended",switchMusic);//endedイベントの関数は常に更新し続けないとredux変数も更新されない
            forceUpdate();
        });
    },[options,albumList,currentMusic]);

    const playMusic = () =>{
        if(audio.paused){
            //audio.src = currentMusic?.path ?? "";
            play()();
        }else{
            pause()();
        }
        dispatch(paused_set(audio.paused));
    }
    const stopMusic = () =>{
        audio.currentTime = 0;
        pause()();
        audio.src = "";
        const newAudio = new Audio();
        setAudio(newAudio);
        dispatch(audioStatus_set(newAudio));
        dispatch(paused_set(audio.paused));
    }

    const setMusic:(url:string)=>void = url => {
        const newAudio = new Audio();
        try{
            newAudio.src = url;//html input fileの場合、ファイルタイプの変換が必要だがlocalのパスを取得できる環境下では不要　
        }catch(e){
            alert(e);
        }finally{
            newAudio.currentTime = 0;
        }
        setAudio(newAudio);
        dispatch(audioStatus_set(newAudio));
        dispatch(paused_set(newAudio.paused));
    };
    const setCurrentTime:(time:number)=>void = time => audio.currentTime = time;
    audio.volume = volume;
    return [!audio.paused, audio.currentTime,playMusic,stopMusic,setMusic,setCurrentTime];
}

export default useAudio;