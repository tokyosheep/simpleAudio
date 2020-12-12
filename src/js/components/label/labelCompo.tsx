import * as React from "react";
import {useState} from "react";
import {useSelector,useDispatch} from "react-redux";
import {ReduceType} from "../../redux/reducer/index";
import styled from "styled-components";
import MenuCompo from "./menu/menuCompo";
import CoverPicture from "./cover/coverPicture";
import SpectrumSquare from "../audioSpectrum/spectrum";
import SpectrumCircle from "../audioSpectrum/spectrumCircle";

import {styleComponent} from "../../styles/containerStyle";
import { type } from "os";
const LabelData = styleComponent.labelData;

const Curtain = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0,0,0,0.5);
    z-index: 1;
    backdrop-filter: blur(2px);
`;

const LabelCompo = () =>{
    const backImage = useSelector((state:ReduceType)=>state.backGroundPath);
    const typeOfSpectrum = useSelector((state:ReduceType)=>state.spectrumType);
    console.log(typeOfSpectrum);
    return(
        <LabelData img={backImage}>
            <CoverPicture></CoverPicture>
            <MenuCompo></MenuCompo>
            <Curtain></Curtain>
            {(typeOfSpectrum.square ? <SpectrumSquare></SpectrumSquare> : <SpectrumCircle></SpectrumCircle>)}
        </LabelData>
    )
}

export default LabelCompo;