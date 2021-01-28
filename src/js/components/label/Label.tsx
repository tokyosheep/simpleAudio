import * as React from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../redux/StateType";

import { containers } from "../../styles/containers";
import CoverPicture from "./cover/coverPicture";
import SpectrumSquare from "./audioSpectrum/spectrum";
import VideoPlayer from "./video/video";
const { LabelWrapper } = containers;

const Curtain = styled.div<{blur:number,contrast:number,opacityRGB:number}>`
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0,0,0,${props=>props.opacityRGB});
    z-index: 2;
    backdrop-filter: blur(${props=>props.blur}px) contrast(${props=>props.contrast}%);
`;

const Label = () =>{
    const visualOption = useSelector((state:StateType)=>state.visualSetiing);
    const backimg = useSelector((state:StateType)=>state.background);
    const filters = useSelector((state:StateType)=>state.filterData);
    console.log(filters);
    return(
        <LabelWrapper img={backimg}>
            <VideoPlayer visible={visualOption.video}/>
            <CoverPicture />
            <SpectrumSquare />
            <Curtain opacityRGB={filters.curtain.value} blur={filters.blur.value} contrast={(filters.contrast.value*20)}></Curtain>
        </LabelWrapper>
    )
}

export default Label;