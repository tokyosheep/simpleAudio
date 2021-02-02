import * as React from "react";
import { useCallback } from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../redux/StateType";
import { rgba } from "polished";

import {setMinuteTime} from "../../fileSystem/timeConvert";


export const ProgressBar = styled.input<{color:string}>`
    appearance: none;
    border: none;
    height: 1px;
    width: 80%;
    background: ${props=>props.color};
    box-shadow:0px 0px 3px 3px ${props=>rgba(props.color,0.4)};
    border-radius: 3px;
    vertical-align: middle;
    transition: .3s linear;
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

export const MusicLength:(props:{currentTime:number,setCurrentTime:(time:number)=>void})=>JSX.Element = ({currentTime,setCurrentTime}) =>{ 
    const uiColor = useSelector((state:StateType)=>state.uiColor);
    const currentMusic = useSelector((state:StateType)=>state.currentMusic);
    console.log(currentTime);
    return(
        <BarWrapper>
            <TimeWrapper>
                <RangeValue>{setMinuteTime(currentTime)}</RangeValue>
                <ProgressBar color={uiColor} min={0} max={(currentMusic?.duration ?? 100)} type="range" value={currentTime} step={1} onChange={(e)=>setCurrentTime(parseFloat(e.target.value))}></ProgressBar>
                <RangeValue>{setMinuteTime(currentMusic?.duration ?? 0)}</RangeValue>
            </TimeWrapper>
        </BarWrapper>
    )
}

export default MusicLength;