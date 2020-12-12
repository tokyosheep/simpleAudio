import * as React from "react";
import styled,{keyframes} from "styled-components";
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

const moving = keyframes`
    from{
        left: 100%;
    }
    to{
        left: -100%;
    }
`;

const TitleSign = styled(DigiFont)<{size:number,on:boolean}>`
    position: absolute;
    animation:${moving} ${props=> props.on ? 9.6 : 0}s linear infinite;
    top: 50%;
    left: -100%;
    transform:translateY(-50%);
    display: block;
    width: 100%;
    font-weight: 200;
`;

const SongDisplayCompo = () =>{
    const currentMusic = useSelector((state:ReduceType)=>state.currentMusic);
    const isPaused = useSelector((state:ReduceType)=>state.isPaused);
    /*
    オーディオオブジェクトはオブジェクト自体生成されてから再生成されるわけではないのでプロパティの更新を
    reduxが感知してくれない。なのでpausedプロパティだけ分離した。
    */
    return(
        <SongDisplay>
            <ShapeReflect position={25} size={10}></ShapeReflect>
            <ShapeReflect position={40} size={20}></ShapeReflect>
            <ShapeReflect position={70} size={40}></ShapeReflect>
            <Reflct>
                <TitleSign size={15} on={currentMusic !== null && isPaused === false}>{currentMusic?.title ?? "none" }</TitleSign>
            </Reflct>
        </SongDisplay>
    )
}

export default SongDisplayCompo;