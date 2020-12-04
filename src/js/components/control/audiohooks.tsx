import * as React from "react";
import {useState,useEffect} from "react";

const useAudio = () =>{
    const [audio] = useState(new Audio());
    const [, _forceUpdate] = useState(false);
    const forceUpdate = () => _forceUpdate(prevState=> !prevState);

    const play = () => audio.play();
    const pause = () =>audio.pause();
    const jump:(value:number)=>void = value => (audio.currentTime += value);
    const setMusic:(url:string)=>void = url => {
        audio.src = url 
        audio.currentTime = 0;
    };
    return [!audio.paused, audio.currentTime,play,pause,jump,setMusic];
}

export default useAudio;