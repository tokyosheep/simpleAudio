import * as React from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../redux/StateType";
import { centerPlaced } from "../../styles/mixin";
import { volumeValue_set } from "../../redux/actions/dispatchAudio";
import { valumeHeight } from "../../styles/containers";

import { containers } from "../../styles/containers";
import {lighten,darken,rgba} from "polished";
const { VolumeWrapper } = containers;

const VolumeButtonBlock = styled.div`
    width: 15px;
    height: 15px;
    background: linear-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0.2));
    position: relative;
    border-radius: 2px;
    cursor: pointer;
    &:active{
        background: linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0.1));
    }
`;

const Horizontal = styled.div<{color:string}>`
    width: 60%;
    height: 1px;
    background: ${props=>props.color};
    box-shadow: 0px 0px 1px 1px ${props=> rgba(props.color,0.2)};
    ${centerPlaced}
    transition: .3s linear;
`;

const Vertical = styled.div<{color:string}>`
    height: 60%;
    width: 1px;
    background: ${props=>props.color};
    box-shadow: 0px 0px 1px 1px ${props=>rgba(props.color,0.2)};
    ${centerPlaced}
    transition: .3s linear;
`;

const rangeMargin = 5;
const barHeight = `${(valumeHeight - 30)-rangeMargin*2}px`;

const VolumeVarWrapper = styled.div`
    display: inline-block;
    height: ${barHeight};
    width: 15px;
    margin: ${rangeMargin}px 0px;
`;

const VolumeBar = styled.input<{color:string}>`
    //appearance: slider-vertical;
    appearance: none;
    border: none;
    width: ${barHeight};
    height: 2px;
    margin: 0;
    transform-origin: 41px 35px;
    transform:rotate(-90deg);
    box-sizing:border-box;
    vertical-align: middle ;
    cursor: pointer;
    &::-webkit-slider-runnable-track{
        background: ${props=> darken(0.4,props.color)};
        box-shadow: 0px 0px 4px 3px rgba(0,0,0,0.4) inset;
        border-radius: 5px;
        transition: .3s linear;
    }
    &::-webkit-slider-thumb{
        appearance: none;
        width: 20px;
        height: 10px;
        border-radius: 2px;
        background: linear-gradient(rgb(30,30,30),rgb(70,70,70),rgb(30,30,30));
    }
    &:focus{
        outline: none;
    }
`;

const BarWrapper = styled.div`
    width: 15px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: grid;
    justify-items:center;
`;


const ValuemeCompo = () =>{
    const dispatch = useDispatch();
    const uiColor = useSelector((state:StateType)=>state.uiColor);
    const volume = useSelector((state:StateType)=>state.volume);
    return(
        <VolumeWrapper>
            <BarWrapper>
                <VolumeButtonBlock onClick={()=>dispatch(volumeValue_set(volume+0.1))}>
                    <Vertical color={uiColor}></Vertical>
                    <Horizontal color={uiColor}></Horizontal>
                </VolumeButtonBlock>
                <VolumeVarWrapper>
                    <VolumeBar color={uiColor} type="range" step={0.1} min={0} max={1} value={volume} onChange={(e)=>dispatch(volumeValue_set(parseFloat(e.target.value)))} ></VolumeBar>
                </VolumeVarWrapper>
                <VolumeButtonBlock onClick={()=>dispatch(volumeValue_set(volume-0.1))}>
                    <Horizontal color={uiColor}></Horizontal>
                </VolumeButtonBlock>
            </BarWrapper>
        </VolumeWrapper>
    )
}

export default ValuemeCompo;