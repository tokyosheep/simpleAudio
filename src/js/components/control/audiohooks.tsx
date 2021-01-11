import * as React from "react";
import {useSelector,useDispatch} from "react-redux";
import {headToNextMusic} from "../../redux/actions/headNextMusix";
import {ReduceType} from "../../redux/reducer/index";
import {setCurrentMusic,setAudioStatus,setPaused} from "../../redux/actions/mapDispatchToProps";
import {useState,useEffect,useMemo} from "react";

const randomNum:(length:number)=>number = length =>{
    return Math.floor(Math.random()*length);
}

const useAudio:()=>[boolean,number,()=>void,()=>void,(url:string)=>void,(time:number)=>void] = () =>{
    const dispatch = useDispatch();
    const volume = useSelector((state:ReduceType)=>state.volume);
    const currentMusic = useSelector((state:ReduceType)=>state.currentMusic);
    const options = useSelector((state:ReduceType)=>state.playOptions);
    const musics = useSelector((state:ReduceType)=>state.musics);
    const [audio,setAudio] = useState(new Audio());
    dispatch(setAudioStatus(audio));
    const [, _forceUpdate] = useState(false);
    const forceUpdate = () => _forceUpdate(prevState=> !prevState);
    

    //audioメソッドは事前にthisを束縛しないといけない
    const play = () => audio.play.bind(audio);
    const pause = () =>audio.pause.bind(audio);
    const switchMusic = () =>{
        console.log("end");
        if(options.repeat)audio.currentTime=0;
        if(options.succession)dispatch(headToNextMusic(musics,currentMusic));
        if(options.shuffle)dispatch(setCurrentMusic(musics[randomNum(musics.length)]));
        if(Object.values(options).some(o=> o===true))play()();//何かのオプションがオンだったら続けて再生
        forceUpdate();
    }
    useEffect(()=>{
        audio.addEventListener("play", forceUpdate);
        audio.addEventListener("pause", forceUpdate);
        audio.addEventListener("ended",switchMusic);
        audio.addEventListener("suspend",()=>{
            console.log("suspended");
            audio.currentTime = 0;
            audio.src = "";
            setAudio(new Audio());
            dispatch(setPaused(audio.paused));
        });
        audio.addEventListener("timeupdate", ()=>{
            console.log(audio.currentTime);
            audio.removeEventListener("ended", forceUpdate);
            audio.addEventListener("ended",switchMusic);//endedイベントの関数は常に更新し続けないとredux変数も更新されない
            forceUpdate();
        });
        
    },[options,musics,currentMusic]);

    const setMusic:(url:string)=>void = url => {
        try{
            audio.src = url;//html input fileの場合、ファイルタイプの変換が必要だがlocalのパスを取得できる環境下では不要　
        }catch(e){
            alert(e);
        }finally{
            audio.currentTime = 0;
        }
        dispatch(setPaused(audio.paused));
    };
    const playMusic = () =>{
        if(currentMusic === null)return;
        if(audio.paused){
            audio.src = currentMusic.path;
            play()();
        }else{
            pause()();
        }
        dispatch(setPaused(audio.paused));
    }
    const stopMusic = () =>{
        audio.currentTime = 0;
        pause()();
        audio.src = "";
        setAudio(new Audio());
        dispatch(setPaused(audio.paused));
    }
    const setCurrentTime:(time:number)=>void = time => audio.currentTime = time;
    audio.volume = volume;
    return [!audio.paused, audio.currentTime,playMusic,stopMusic,setMusic,setCurrentTime];
}

export default useAudio;