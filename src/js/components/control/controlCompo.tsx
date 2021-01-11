import * as React from "react";
import {useMemo,useEffect} from "react";
import {useSelector} from "react-redux";
import {ReduceType} from "../../redux/reducer/index";
import styled from "styled-components";

import IconWrapper from "./IconWrapper";
import {PlatyButton,StopButton,BackTrack,HeadTrack} from "./buttons"; 
import {MusicLength} from "./progressBar";

import {styleComponent} from "../../styles/containerStyle";
import useAudio from "./audiohooks";

const Control = styleComponent.control;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content:space-around;
    align-items:center;
`;


const ControlCompo = () =>{
    const currentMusic = useSelector((state:ReduceType)=>state.currentMusic);
    //const audio = useSelector((state:ReduceType)=>state.audioObjShare);
    const [isPlayMusic,currentTime,playMusic,stopMusic,setMusic,setCurrentTime] = useAudio();
    useEffect(()=>setMusic(currentMusic?.path ?? "" ),[currentMusic]);
    
    return(
        <Control>
            <IconWrapper></IconWrapper>
            <MusicLength current={currentTime} end={currentMusic?.long ?? 100} handleRange={setCurrentTime}></MusicLength>
            <ButtonWrapper>
                <BackTrack ></BackTrack>
                <PlatyButton isPlay={isPlayMusic} func={playMusic}></PlatyButton>
                <StopButton func={stopMusic}></StopButton>
                <HeadTrack></HeadTrack>
            </ButtonWrapper>
        </Control>
    )
}

export default ControlCompo;