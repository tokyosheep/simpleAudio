import * as React from "react";
import styled from "styled-components";
import {backToNextMusic,headToNextMusic} from "../../redux/actions/headNextMusix";
import {useSelector,useDispatch} from "react-redux";
import {centerPlaced} from "../../styles/abstract";
import {mainBlue,shineStyle} from "../../styles/commonColor"; 
import { ReduceType } from "../../redux/reducer";
const Circle = styled.div.attrs<{size?:number}>(props=>({
    size: props.size || 20,
}))<{size:number}>`
    width: ${props=> props.size}px;
    height: ${props=> props.size}px;
    position: relative;
    border-radius: 50%;
    ${shineStyle}
    cursor: pointer;
`;

const ArrowButton = styled.div<{size:number,x:number,add:string}>`
    ${centerPlaced}
    width: ${props=>props.size}px;
    height: ${props=>props.size}px;
    border-top: 1px solid ${mainBlue};
    border-right: 1px solid ${mainBlue};
    cursor: pointer;
`;

const SquareButton = styled.div`
    ${centerPlaced}
    width: 10px;
    height: 10px;
    border: 1px solid ${mainBlue};
    cursor: pointer;
`;

const PauseOfRectangle = styled.div`
    ${centerPlaced}
    width: 5px;
    height: 10px;
    border: 1px solid ${mainBlue};
`;

export const StopButton:(props:{func:()=>void})=>JSX.Element = ({func}) =>{
    return(
        <Circle size={30} onClick={func}>
            <SquareButton></SquareButton>
        </Circle>
    )
}


export const PlatyButton:(props:{func:()=>void,isPlay:boolean})=>JSX.Element = ({func,isPlay}) =>{
    const PauseRectangle = (
        <>
            <PauseOfRectangle x={-20}/>
            <PauseOfRectangle x={-80} />
        </>
    )
    return(
        <Circle size={30} onClick={func}>
            { isPlay ? PauseRectangle : <ArrowButton x={-70} add={"rotate(45deg)"} size={10}></ArrowButton>}
        </Circle>
    )
}

export const BackTrack = () =>{
    const dispatch = useDispatch();
    const currentMusic = useSelector((state:ReduceType)=>state.currentMusic);
    const musics = useSelector((state:ReduceType)=>state.musics);
    return(
        <Circle size={20} onClick={()=>dispatch(backToNextMusic(musics,currentMusic))}>
            <ArrowButton x={10} size={6} add={"rotate(-135deg)"} ></ArrowButton>
            <ArrowButton x={0} size={6} add={"rotate(-135deg)"} ></ArrowButton>
        </Circle>
    )
}

export const HeadTrack = () =>{
    const dispatch = useDispatch();
    const currentMusic = useSelector((state:ReduceType)=>state.currentMusic);
    const musics = useSelector((state:ReduceType)=>state.musics);
    return(
        <Circle size={20} onClick={()=>dispatch(headToNextMusic(musics,currentMusic))}>
            <ArrowButton x={-85} size={6} add={"rotate(45deg)"} ></ArrowButton>
            <ArrowButton x={-20} size={6} add={"rotate(45deg)"} ></ArrowButton>
        </Circle>
    )
}