import * as React from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import { backToNextMusic , headToNextMusic } from "../../redux/actions/moveNextMusic";
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
    background: linear-gradient(rgb(20,20,20),rgb(50,50,50));
`;

const ArrowButton = styled.div<{size:number,x:number,add:string,color:string}>`
    ${centerPlaced}
    width: ${props=>props.size}px;
    height: ${props=>props.size}px;
    border-top: 1px solid ${props=>props.color};
    border-right: 1px solid ${props=>props.color};
    cursor: pointer;
    transition: .3s linear;
`;

const SquareButton = styled.div<{color:string}>`
    ${centerPlaced}
    width: 10px;
    height: 10px;
    border: 1px solid ${props=>props.color};
    cursor: pointer;
    transition: .3s linear;
`;

const PauseOfRectangle = styled.div<{color:string,x:number}>`
    ${centerPlaced}
    width: 5px;
    height: 10px;
    border: 1px solid ${props=>props.color};
    transition: .3s linear;
`;

export const StopButton:(props:{func:()=>void})=>JSX.Element = ({func}) =>{
    const color = useSelector((state:StateType)=> state.uiColor);
    return(
        <Circle color={color} size={40} onClick={func}>
            <SquareButton color={color}></SquareButton>
        </Circle>
    )
}

export const PlayButton = ({playMusic}:{playMusic:()=>void}) =>{
    const color = useSelector((state:StateType)=> state.uiColor);
    const isPaused = useSelector((state:StateType)=>state.isPaused);
    const PauseRectangle = (
        <>
            <PauseOfRectangle color={color} x={-20}/>
            <PauseOfRectangle color={color} x={-80} />
        </>
    )
    return(
        <Circle size={40} color={color} onClick={playMusic}>
            {(isPaused ? <ArrowButton x={-70} add={"rotate(45deg)"} size={10} color={color}></ArrowButton> : PauseRectangle)}
        </Circle>
    )
} 

export const BackTrack = () =>{
    const dispatch = useDispatch();
    const color = useSelector((state:StateType)=>state.uiColor);
    const currentMusic = useSelector((state:StateType)=>state.currentMusic);
    const albumList = useSelector((state:StateType)=>state.albumList);
    return(
        <Circle color={color} size={30} onClick={()=>dispatch(backToNextMusic(albumList,currentMusic))}>
            <ArrowButton color={color} x={10} size={6} add={"rotate(-135deg)"} ></ArrowButton>
            <ArrowButton color={color} x={0} size={6} add={"rotate(-135deg)"} ></ArrowButton>
        </Circle>
    )
}

export const HeadTrack = () =>{
    const dispatch = useDispatch();
    const color = useSelector((state:StateType)=>state.uiColor);
    const currentMusic = useSelector((state:StateType)=>state.currentMusic);
    const albumList = useSelector((state:StateType)=>state.albumList);
    return(
        <Circle color={color} size={30} onClick={()=>dispatch(headToNextMusic(albumList,currentMusic))}>
            <ArrowButton color={color} x={-85} size={6} add={"rotate(45deg)"} ></ArrowButton>
            <ArrowButton color={color} x={-20} size={6} add={"rotate(45deg)"} ></ArrowButton>
        </Circle>
    )
}