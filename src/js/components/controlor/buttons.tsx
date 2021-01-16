import * as React from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../redux/StateType";

import { shineStyle , centerPlaced } from "../../styles/mixin";

interface CircleShape {size?:number,color:string};

const Circle = styled.div.attrs<CircleShape>(props=>({
    size: props.size || 20,
    color: props.color
}))<{size:number,color:string}>`
    width: ${props=> props.size}px;
    height: ${props=> props.size}px;
    position: relative;
    border-radius: 50%;
    ${shineStyle}
    cursor: pointer;
`;

const ArrowButton = styled.div<{size:number,x:number,add:string,color:string}>`
    ${centerPlaced}
    width: ${props=>props.size}px;
    height: ${props=>props.size}px;
    border-top: 1px solid ${props=>props.color};
    border-right: 1px solid ${props=>props.color};
    cursor: pointer;
`;

export const PlayButton = () =>{
    const color = useSelector((state:StateType)=> state.uiColor);
    const audio = useSelector((state:StateType)=>state.audioObject);
    console.log(audio);
    return(
        <Circle size={30} color={color} onClick={()=>audio.playMusic()}>
            <ArrowButton x={-70} add={"rotate(45deg)"} size={10} color={color}></ArrowButton>
        </Circle>
    )
} 