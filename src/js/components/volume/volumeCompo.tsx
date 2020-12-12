import * as React from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import {setVolumeValue} from "../../redux/actions/mapDispatchToProps";
import {ReduceType} from "../../redux/reducer/index";
import {volumeHeight} from "../../styles/containerStyle";
import {mainBlue,shine} from "../../styles/commonColor"; 
import {centerPlaced} from "../../styles/abstract";
import {lighten,darken,rgba} from "polished";

import {styleComponent} from "../../styles/containerStyle";
const Volume = styleComponent.volume;

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

const Horizontal = styled.div`
    width: 60%;
    height: 1px;
    background: ${mainBlue};
    box-shadow: 0px 0px 1px 1px ${rgba(mainBlue,0.2)};
    ${centerPlaced}
`;

const Vertical = styled.div`
    height: 60%;
    width: 1px;
    background: ${mainBlue};
    box-shadow: 0px 0px 1px 1px ${rgba(mainBlue,0.2)};
    ${centerPlaced}
`;

const rangeMargin = 5;
const barHeight = `${(volumeHeight - 30)-rangeMargin*2}px`;

const VolumeVarWrapper = styled.div`
    display: inline-block;
    height: ${barHeight};
    width: 15px;
    margin: ${rangeMargin}px 0px;
`;

const VolumeBar = styled.input`
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
        background: ${darken(0.4,mainBlue)};
        box-shadow: 0px 0px 4px 3px rgba(0,0,0,0.4) inset;
        border-radius: 5px;
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

const VolumeCompo = () =>{
    const volume = useSelector((state:ReduceType)=>state.volume);
    console.log(volume);
    const dispatch = useDispatch();
    return(
        <Volume>
            <BarWrapper>
                <VolumeButtonBlock onClick={()=>dispatch(setVolumeValue(volume+0.1))}>
                    <Vertical></Vertical>
                    <Horizontal></Horizontal>
                </VolumeButtonBlock>
                <VolumeVarWrapper>
                    <VolumeBar type="range" step={0.1} min={0} max={1} value={volume} onChange={(e)=>dispatch(setVolumeValue(parseFloat(e.target.value)))} ></VolumeBar>
                </VolumeVarWrapper>
                <VolumeButtonBlock onClick={()=>dispatch(setVolumeValue(volume-0.1))}>
                    <Horizontal></Horizontal>
                </VolumeButtonBlock>
            </BarWrapper>
        </Volume>
    )
}

export default VolumeCompo;