import * as React from "react";
import styled from "styled-components";
import {volumeHeight} from "../../styles/containerStyle";
import {mainBlue,shine} from "../../styles/commonColor"; 
import {centerPlaced} from "../../styles/abstract";
import {darken,rgba} from "polished";

import {styleComponent} from "../../styles/containerStyle";
const Volume = styleComponent.volume;

const VolumeButtonBlock = styled.div`
    width: 15px;
    height: 15px;
    background: linear-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0.2));
    position: relative;
    border-radius: 2px;
`;

const Horizontal = styled.div`
    width: 80%;
    height: 1px;
    background: ${mainBlue};
    box-shadow: 0px 0px 1px 1px ${rgba(mainBlue,0.2)};
    ${centerPlaced}
`;

const Vertical = styled.div`
    height: 80%;
    width: 1px;
    background: ${mainBlue};
    box-shadow: 0px 0px 1px 1px ${rgba(mainBlue,0.2)};
    ${centerPlaced}
`;


const VolumeBar = styled.input`
    appearance: none;
    border: none;
    height: ${(volumeHeight - 30)}px;
    width: 15px;
    background: white;
    background: #444;
    margin: 0;
    vertical-align: middle ;
    background: ${mainBlue};
    box-shadow: 0px 0px 5px 6px rgba(0,0,0,0.8) inset;
    &::-webkit-slider-thumb{
        appearance: none;
        width: 15px;
        height: 20px;
        border-radius: 1px;
        background: radial-gradient(rgb(20,20,20),rgb(70,70,70));
        position: relative;
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
`;

const VolumeCompo = () =>{
    return(
        <Volume>
            <BarWrapper>
                <VolumeButtonBlock>
                    <Vertical></Vertical>
                    <Horizontal></Horizontal>
                </VolumeButtonBlock>
                <VolumeBar type="range" min={0} max={100} value={5}></VolumeBar>
                <VolumeButtonBlock>
                    <Horizontal></Horizontal>
                </VolumeButtonBlock>
            </BarWrapper>
        </Volume>
    )
}

export default VolumeCompo;