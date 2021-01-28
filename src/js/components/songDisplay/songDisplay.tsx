import * as React from "react";
import styled,{keyframes} from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../redux/StateType";

import { containers } from "../../styles/containers";
const { SongDisplayWrapper } = containers;
import { DigiFont } from "../../styles/digiFont";
import { centerPlaced } from "../../styles/mixin";

const TitleSign = styled(DigiFont)<{size:number}>`
    position: absolute;
    top: 50%;
    left: 0;
    transform:translateY(-50%);
    display: block;
    width: 100%;
    font-weight: 200;
    color: #fff;
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
    return(
        <SongDisplayWrapper>
            <TitleSign size={15}>title</TitleSign>
            <ShapeReflect position={25} size={10}></ShapeReflect>
            <ShapeReflect position={40} size={20}></ShapeReflect>
            <ShapeReflect position={70} size={40}></ShapeReflect>
            <Reflect></Reflect>
        </SongDisplayWrapper>
    )
}

export default SongDisplay;