import * as React from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";

import {ReduceType} from "../../redux/reducer/index";
import {CurrentMusicType} from "../../redux/reducer/type";

import {DigiFont} from "../../styles/digiFont";
import {styleComponent} from "../../styles/containerStyle";
const SongDisplay = styleComponent.songDisplay;

const ShapeReflect = styled.div<{position:number,size:number}>`
    width: ${props=>props.size}px;
    height: 500%;
    background: rgba(255,255,255,0.1);
    position: absolute;
    left: ${props=>props.position}px;
    top: -100%;
    transform:rotate(25deg);
`;

const Reflct = styled.div`
    width: 100%;
    height: 90%;
    background: linear-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0));
    //border-radius: 20px;
`;

const SongDisplayCompo = () =>{
    const currentMusic = useSelector((state:ReduceType)=>state.currentMusic);
    console.log(currentMusic);
    return(
        <SongDisplay>
            <ShapeReflect position={25} size={10}></ShapeReflect>
            <ShapeReflect position={40} size={20}></ShapeReflect>
            <ShapeReflect position={70} size={40}></ShapeReflect>
            <Reflct>
                <DigiFont size={12}>{currentMusic?.title ?? "none" }</DigiFont>
            </Reflct>
        </SongDisplay>
    )
}

export default SongDisplayCompo;