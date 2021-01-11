import * as React from "react";
import { useSelector } from "react-redux";
import {ReduceType} from "../../redux/reducer/index";
import styled from "styled-components";
import {useRef} from "react";
import useAudioContext from "./audioContext";

const SpectrumC = styled.canvas`
    top: 30px;
    left: 170px;
    position: absolute;
    z-index: 5;
`;

export const renderCircle:(spectrum:Uint8Array,canvas:HTMLCanvasElement|null)=>void = (spectrum,canvas) =>{
    if(canvas === null)return;

    const canvasContext = canvas.getContext("2d");
    if(canvasContext === null)return;

    const center = {x:Math.round(canvas.width/2),y:Math.round(canvas.height/2)};
    const barRad = 2*Math.PI / spectrum.length;

    const innerRadius = 10;
    const outerRadius = 80;
    const diffRadius = outerRadius - innerRadius;

    canvasContext.clearRect(0,0,canvas.width,canvas.height);

    for(let i=0;i<spectrum.length;i++){

        const barDegree = barRad * i * 180 / Math.PI;
        canvasContext.fillStyle = `hsl(${barDegree},80%,60%)`;

        const startRad = barRad * i;
        const endRad = barRad * (i+0.5);

        const startX = center.x + innerRadius * Math.cos(startRad);
        const startY = center.y + innerRadius * Math.sin(startRad);
        const endX = center.x + innerRadius * Math.cos(endRad);
        const endY = center.y + innerRadius * Math.sin(endRad);

        const normalizedSpectrum = spectrum[i]/255;
        const barRadius = normalizedSpectrum * diffRadius + innerRadius;

        canvasContext.beginPath();

        canvasContext.arc(center.x,center.y,innerRadius,startRad,endRad);

        canvasContext.moveTo(startX,startY);
        canvasContext.lineTo(barRadius * Math.cos(startRad) + center.x, barRadius * Math.sin(startRad) + center.y);
        canvasContext.lineTo(barRadius * Math.cos(endRad) + center.x, barRadius * Math.sin(endRad) + center.y);
        canvasContext.lineTo(endX,endY);

        canvasContext.fill();
    }
}

const clearRender:(canvas:HTMLCanvasElement|null)=>void = canvas =>{
    if(canvas === null) return;
    const canvasContext = canvas.getContext("2d");
    if(canvasContext === null)return;
    canvasContext.clearRect(0,0,canvas.width,canvas.height);
}

const SpectrumCircle = () =>{
    const isPaused = useSelector((state:ReduceType)=>state.isPaused);
    const canvas = useRef(null);
    const [stopTimer,startTimer] = useAudioContext(renderCircle,canvas.current);
    if(canvas !== null && !isPaused)startTimer();
    if(canvas !== null && isPaused){
        try{
            stopTimer();
            clearRender(canvas.current);
        }catch(e){
            console.log(e);
        }
    }
    return(
        <SpectrumC ref={canvas} width={150} height={150}></SpectrumC>
    )
}

export default SpectrumCircle;
