import * as React from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../redux/StateType";

import { containers } from "../../styles/containers";
import CoverPicture from "./cover/coverPicture";
const { LabelWrapper } = containers;

const Curtain = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0,0,0,0.5);
    z-index: 1;
    backdrop-filter: blur(2px);
`;

const Label = () =>{
    const backimg = useSelector((state:StateType)=>state.background);
    return(
        <LabelWrapper img={backimg}>
            <CoverPicture />
            <Curtain></Curtain>
        </LabelWrapper>
    )
}

export default Label;