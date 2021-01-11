import * as React from "react";
import styled from "styled-components";
import {useRef,useEffect} from "react";
import useAudioContext from "./audioContext";
import {mainBlue} from "../../styles/commonColor";
import { useSelector } from "react-redux";
import {ReduceType} from "../../redux/reducer/index";
import {renderCircle} from "./spectrumCircle";

const SpectrumS = styled.canvas`
    position: absolute;
    top: 140px;
    left: 20px;
    z-index: 6;
`;

const renderSquare:(spectrum:Uint8Array,canvas:HTMLCanvasElement|null)=>void = (spectrum,canvas) =>{
    console.log(canvas);
    if(canvas === null) return;
    const barWidth = Math.round(canvas.width/spectrum.length)*3;
    const canvasContext = canvas.getContext("2d");
    if(canvasContext === null)return;
    const gradient = canvasContext.createLinearGradient(0,0,0,canvas.height);
    gradient.addColorStop(1.0,"rgb(0,100,255)");
    gradient.addColorStop(0.0,"rgb(0,200,255)");
    canvasContext.fillStyle = gradient;
    canvasContext.clearRect(0,0,canvas.width,canvas.height);
    spectrum.forEach((s,i)=> canvasContext.fillRect((barWidth * i)*1.5,canvas.height,barWidth,-s/3));
}

const clearRender:(canvas:HTMLCanvasElement|null)=>void = canvas =>{
    if(canvas === null) return;
    const canvasContext = canvas.getContext("2d");
    if(canvasContext === null)return;
    canvasContext.clearRect(0,0,canvas.width,canvas.height);
}

const SpectrumSquare = () =>{
    const isPaused = useSelector((state:ReduceType)=>state.isPaused);
    const canvas = useRef(null);
    const [stopTimer,startTimer] = useAudioContext(renderSquare,canvas.current);
    if(canvas !== null && !isPaused)startTimer();
    if(canvas !== null && isPaused){
        stopTimer();
        clearRender(canvas.current);
    }
    return(
        <SpectrumS ref={canvas} width={200} height={60}></SpectrumS>
    )
}

export default SpectrumSquare;