import * as React from "react";
import styled from "styled-components";
import {useRef} from "react";
import useAudioContext from "./audioContext";
import {mainBlue} from "../../styles/commonColor";

const SpectrumC = styled.canvas`
    top: 30px;
    left: 170px;
    position: absolute;
    z-index: 5;
`;

const renderCircle:(spectrum:Uint8Array,canvas:HTMLCanvasElement|null)=>void = (spectrum,canvas) =>{
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

const SpectrumCircle = () =>{
    const canvas = useRef(null);
    if(canvas !== null)useAudioContext(renderCircle,canvas.current);
    return(
        <SpectrumC ref={canvas} width={150} height={150}></SpectrumC>
    )
}

export default SpectrumCircle;
