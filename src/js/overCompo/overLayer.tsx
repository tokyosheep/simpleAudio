import * as React from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../redux/StateType";
import FillPlayListaName from "./fillPlayListName";

const OverWrapper = styled.div<{on:boolean}>`
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    z-index: 30;
    position: fixed;
    top: 0;
    left: 0;
    display: ${props=> props.on ? "block" : "none"};
`;

const OverLayer = () =>{
    const fillPlayListName = useSelector((state:StateType)=>state.modeWindow.fillPlayListName);
    return(
        <OverWrapper on={fillPlayListName}>
            <FillPlayListaName />
        </OverWrapper>
    )   
}

export default OverLayer;