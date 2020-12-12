import * as React from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import {ReduceType} from "../../redux/reducer/index";
import {textShadow} from "../../styles/commonColor";
import ColorSettingRadios from "./settingParts/colorRadios";
import SpectrumButtons from "./settingParts/spectrumButtons";
import BackGroundForm from "./settingParts/setBackGround";

const SettingContainer = styled.div<{on:boolean}>`
    z-index: 20;
    height: 400px;
    width: 600px;
    position: fixed;
    top: 0;
    left: ${props => props.on ? 0 : 100}%;
    background: rgba(0,0,0,0.5);
    backdrop-filter:blur(5px);
    transition: left .4s linear;
`;

const Title = styled.h2`
    color: white;
    text-shadow:${textShadow("#fff")};
    margin: 5px;
    font-size: 18px;
`;

const Setting = () =>{
    const isMenuAppeared = useSelector((state:ReduceType)=>state.settingsMonitor.menu);
    return(
        <SettingContainer on={isMenuAppeared}>
            <Title>visual setting</Title>
            <BackGroundForm></BackGroundForm>
            <ColorSettingRadios></ColorSettingRadios>
            <SpectrumButtons></SpectrumButtons>
        </SettingContainer>
    )
}

export default Setting;