import * as React from "react";
import styled from "styled-components";
import {mainBlue,shine} from "../../styles/commonColor"; 

import {setMinuteTime} from "../../fileSystem/timeConvert";


export const ProgressBar = styled.input`
    appearance: none;
    border: none;
    height: 1px;
    width: 80%;
    background: ${mainBlue};
    box-shadow:${shine};
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

export const MusicLength:(props:{current:number,end:number,handleRange:(time:number)=>void})=>JSX.Element = ({current,end,handleRange}) =>{ 
    const endTime = setMinuteTime(end);
    const currentTime = setMinuteTime(current);
    return(
        <BarWrapper>
            <TimeWrapper>
                <RangeValue>{currentTime}</RangeValue>
                <ProgressBar min={0} max={end} type="range" value={current} step={1} onChange={(e)=>handleRange(parseFloat(e.target.value))}></ProgressBar>
                <RangeValue>{endTime}</RangeValue>
            </TimeWrapper>
        </BarWrapper>
    )
}