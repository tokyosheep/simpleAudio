import * as React from "react";
import {useMemo} from "react";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../redux/StateType";
import styled from "styled-components";
import { PlayButton , StopButton , BackTrack , HeadTrack } from "./buttons";
import MusicLength from "./progressBar";
import useAudio from "./hooks/useAudio";
import OptionBars from "./optionBar/options";

import { containers } from "../../styles/containers";
const { ConrolWrapper } = containers;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content:space-around;
    align-items:center;
`;

const ControlorCompo = () =>{
    const currentMusic = useSelector((state:StateType)=>state.currentMusic);
    const [isPlayMusic, currentTime , playMusic , stopMusic , setMusic , setCurrentTime ] = useAudio();
    useMemo(()=>{
        setMusic(currentMusic?.path ?? "");
    },[currentMusic]);
    return(
        <ConrolWrapper>
            <OptionBars />
            <ButtonWrapper>
                <BackTrack />
                <PlayButton playMusic={playMusic}/>
                <StopButton func={stopMusic} />
                <HeadTrack />
            </ButtonWrapper>
            <MusicLength currentTime={currentTime} setCurrentTime={setCurrentTime}/>
        </ConrolWrapper>
    )
}

export default ControlorCompo;