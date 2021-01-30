import * as React from "react";
import { useCallback } from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import { windowMode_set } from "../../redux/actions/dispatchWIndow";
import StateType from "../../redux/StateType";
import { GoChevronRight } from "react-icons/go";

import BackgroundCompo from "./background/background";
import ColorList from "./colorList/colorList";
import FilterSliders from "./filter/filterSlider";
import { rgba } from "polished";
import { shineSVG } from "../../styles/mixin";


const OffIcon = styled(GoChevronRight)<{color:string}>`
    ${shineSVG}
    position: absolute;
    top: 5%;
    left: 80%;
    width: 40px;
    height: 40px;
    transition: .3s linear;
`;

const SettingWrapper = styled.div<{windowWidth:number}>`
    width: 300px;
    height: 100%;
    padding: 15px;
    background: #1f1f1f;
    position: fixed;
    z-index: 25;
    top: 0;
    left: ${props=> props.windowWidth-300}px;
    box-sizing:border-box;
    transition: .3s linear;
`;

const SettingTitle = styled.h1<{color:string}>`
    font-size: 20px;
    font-weight: 400;
    color: ${props=>props.color};
    text-shadow:0px 0px 5px ${props=>rgba(props.color,0.8)};
    transition: .3s linear;
`;

const SettingCompo = () =>{
    const dispatch = useDispatch();
    const uiColor = useSelector((state:StateType)=>state.uiColor);
    const windowSize = useSelector((state:StateType)=>state.windowSize);
    const modeWindow = useSelector((state:StateType)=>state.modeWindow);
    const handleSetWindow = useCallback(()=>dispatch(windowMode_set(false,"setting")),[modeWindow]);
    return(
        <SettingWrapper windowWidth={(modeWindow.setting ? windowSize[0] : windowSize[0]+300)}>
            <OffIcon color={uiColor} onClick={handleSetWindow}></OffIcon>
            <SettingTitle color={uiColor}>Setting</SettingTitle>
            <BackgroundCompo />
            <ColorList />
            <FilterSliders />
        </SettingWrapper>
    )
}

export default SettingCompo;