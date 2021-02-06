import * as React from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../redux/StateType";
import FillPlayListName from "./fillPlayListName";
import Loading from "./loading";

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
    const modeWIndow = useSelector((state:StateType)=>state.modeWindow);
    const fillPlayListName = modeWIndow.fillPlayListName;
    const loadingOver = modeWIndow.loading;
    const isOverWindow = fillPlayListName || loadingOver;
    return(
        <OverWrapper on={isOverWindow}>
            {(fillPlayListName ? <FillPlayListName /> : <Loading />)}
        </OverWrapper>
    )   
}

export default OverLayer;