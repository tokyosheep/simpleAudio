import * as React from "react";
import { useCallback } from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../redux/StateType";
import { shineStyle } from "../../styles/mixin";

import {setMinuteTime} from "../../fileSystem/timeConvert";


export const ProgressBar = styled.input<{color:string}>`
    appearance: none;
    border: none;
    height: 1px;
    width: 80%;
    background: ${props=>props.color};
    ${shineStyle}
    border-radius: 3px;
    vertical-align: middle;
    &::-webkit-slider-thumb{
        appearance: none;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgb(255,255,255);
    }
    &:focus{
        outline: none;
    }
`;

const RangeValue = styled.div`
    color: white;
    font-size: 12px;
    font-family: DSEG7-Classic;
`;

const BarWrapper = styled.div`
    display: block;
    width: 100%;
    height: 100%;
`;

const TimeWrapper = styled.div`
    display: flex;
    justify-content:space-between;
    width: 100%;
    padding: 0px 10px;
    margin: 10px 0px;
    box-sizing:border-box;
`;

export const MusicLength:()=>JSX.Element = () =>{ 
    const uiColor = useSelector((state:StateType)=>state.uiColor);
    const audioObj = useSelector((state:StateType)=>state.audioObject);
    const handleRange = useCallback(e=>{
        audioObj.currentTime = parseFloat(e.target.value);
    },[audioObj.currentTime]);
    console.log(audioObj);
    console.log(audioObj.currentTime);
    return(
        <BarWrapper>
            <TimeWrapper>
                <RangeValue>{setMinuteTime(audioObj.currentTime)}</RangeValue>
                <ProgressBar color={uiColor} min={0} max={(isNaN(audioObj.duration) ? 0 : audioObj.duration)} type="range" value={audioObj.currentTime} step={1} onChange={(e)=>handleRange(e)}></ProgressBar>
                <RangeValue>{setMinuteTime(audioObj.duration)}</RangeValue>
            </TimeWrapper>
        </BarWrapper>
    )
}

export default MusicLength;