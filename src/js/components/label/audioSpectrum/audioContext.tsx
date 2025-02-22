import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import StateType from "../../../redux/StateType";

const useAudioContext:(render:(spectrumArray:Uint8Array,canvas:HTMLCanvasElement|null)=>void,canvas:HTMLCanvasElement|null)=>[()=>void|null,()=>void] = (render,canvas) =>{
    const audio = useSelector((state:StateType)=>state.audioObject);
    console.log(audio);
        let analyzerNode:null|AnalyserNode = null;
        const [audioContext,setAudioContext] = useState<AudioContext>(new AudioContext());
        const [intervalId,setIntervalId] = useState<number|null>(null);
        let audioSourceNode:null|MediaElementAudioSourceNode = null;
        const stopTimer = () => {
            if(audio.currentTime !== 0)return;
            if(audioSourceNode !== null){
                audioSourceNode.disconnect();
            }
            if(analyzerNode !== null){
                analyzerNode.disconnect();
            }
            intervalId !== null ? clearInterval(intervalId) : null;
        }
        const startTimer = () =>{
            try{
                if(audioSourceNode)audioSourceNode.disconnect();
                if(audio.src !== undefined && audio.src !== null && audio.src !== ""){
                    if(analyzerNode === null){
                        analyzerNode = audioContext.createAnalyser();
                        analyzerNode.fftSize = 128;
                    }
                    const spectrumArray = new Uint8Array(analyzerNode.frequencyBinCount);
                    if(audioSourceNode === null){
                        audioSourceNode = audioContext.createMediaElementSource(audio);
                        audioSourceNode.connect(analyzerNode);
                        analyzerNode.connect(audioContext.destination);
                    }
                    const Id = setInterval(event=>{
                        if(analyzerNode!==null)analyzerNode.getByteFrequencyData(spectrumArray);
                        render(spectrumArray,canvas);
                    },1/60);
                    setIntervalId(Id);
                }
            }catch(e){
                console.log(e);
            }
        }
    return [stopTimer,startTimer];
}

export default useAudioContext;