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
    const whichWindow = () => {
        const mode = Object.entries(modeWIndow).find(([key,value])=> value===true) ?? "";
        console.log(mode);
        const type = mode[0] ?? "";
        switch(type){
            case "fillPlayListName":
                return <FillPlayListName />;

            case "loading":
                return <Loading />;

            default:
                return <FillPlayListName />;
        }
    }
    return(
        <OverWrapper on={isOverWindow}>
            {whichWindow()}
        </OverWrapper>
    )   
}

export default OverLayer;