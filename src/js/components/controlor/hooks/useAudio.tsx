import * as React from "react";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../../redux/StateType";
import {useState,useEffect} from "react";

import { audioStatus_set , paused_set } from "../../../redux/actions/dispatchAudio";
import { currentMusic_set } from "../../../redux/actions/dispatchMusics";
import { headToNextMusic } from "../../../redux/actions/moveNextMusic";

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
    const [audio,setAudio] = useState(new Audio());
    dispatch(audioStatus_set(audio));
    const [, _forceUpdate] = useState(false);
    const forceUpdate = () => _forceUpdate(prevState=> !prevState);

    //audioメソッドは事前にthisを束縛しないといけない
    const play = () => audio.play.bind(audio);
    const pause = () =>audio.pause.bind(audio);
    const switchMusic = () =>{
        if(options.repeat)audio.currentTime=0;
        if(options.succession)dispatch(headToNextMusic(albumList,currentMusic));
        if(options.shuffle){
            const randomAlbum = albumList[randomNum(albumList.length)]
            dispatch(currentMusic_set(randomAlbum.musics[randomNum(randomAlbum.musics.length)]));
        }
        if(Object.values(options).some(o=> o===true))play()();//何かのオプションがオンだったら続けて再生
        forceUpdate();
    }
    useEffect(()=>{
        audio.addEventListener("play", forceUpdate);
        audio.addEventListener("pause", forceUpdate);
        audio.addEventListener("ended",switchMusic);
        audio.addEventListener("timeupdate", ()=>{
            audio.removeEventListener("ended", forceUpdate);
            audio.addEventListener("ended",switchMusic);//endedイベントの関数は常に更新し続けないとredux変数も更新されない
            forceUpdate();
        });
        //pause()();
    },[options,albumList,currentMusic,pauseStatus]);

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
    const playMusic = () =>{
        if(currentMusic === null)return;
        if(audio.paused){
            audio.src = currentMusic.path;
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
    const setCurrentTime:(time:number)=>void = time => audio.currentTime = time;
    audio.volume = volume;
    return [!audio.paused, audio.currentTime,playMusic,stopMusic,setMusic,setCurrentTime];
}

export default useAudio;