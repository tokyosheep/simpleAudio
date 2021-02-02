import * as React from "react";
import styled,{keyframes} from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../redux/StateType";

import { containers } from "../../styles/containers";
const { SongDisplayWrapper } = containers;
import { DigiFont } from "../../styles/digiFont";
import { centerPlaced } from "../../styles/mixin";
import { rgba } from "polished";

const moving = keyframes`
    from{
        left: 100%;
    }
    to{
        left: -100%;
    }
`;

const TitleSign = styled(DigiFont)<{size:number,on:boolean,color:string}>`
    position: absolute;
    top: 50%;
    left: 0;
    animation:${moving} ${props=> props.on ? 9.6 : 0}s linear infinite;
    transform:translateY(-50%);
    display: block;
    width: 100%;
    font-weight: 200;
    color: ${props=> props.color};
    text-shadow:0px 0px 5px ${props=>rgba(props.color,0.8)};
    z-index: 3;
`;

const Reflect = styled.div`
    width: 98%;
    height: 70%;
    ${centerPlaced}
    background: linear-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0.3));
    border-radius: 5px;
    z-index: 5;
    opacity: 0.4;
`;

const ShapeReflect = styled.div<{position:number,size:number}>`
    width: ${props=>props.size}px;
    height: 500%;
    background: linear-gradient(rgba(255,255,255,0.1),rgba(0,0,0,0));
    position: absolute;
    left: ${props=>props.position}px;
    top: -100%;
    transform:rotate(25deg);
    z-index: 10;
`;


const SongDisplay = () =>{
    const pauseStatus = useSelector((state:StateType)=>state.isPaused);
    const currentMusic = useSelector((state:StateType)=>state.currentMusic);
    const uiColor = useSelector((state:StateType)=>state.uiColor);
    return(
        <SongDisplayWrapper>
            <TitleSign size={15} color={uiColor} on={!pauseStatus}>{`${currentMusic?.title ?? ""} : ${currentMusic?.artist ?? ""}`}</TitleSign>
            <ShapeReflect position={25} size={10}></ShapeReflect>
            <ShapeReflect position={40} size={20}></ShapeReflect>
            <ShapeReflect position={70} size={40}></ShapeReflect>
            <Reflect></Reflect>
        </SongDisplayWrapper>
    )
}

export default SongDisplay;