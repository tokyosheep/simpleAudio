import * as React from "react";
import styled,{keyframes} from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../redux/StateType";

import { containers } from "../../styles/containers";
const { SongDisplayWrapper } = containers;
import { DigiFont } from "../../styles/digiFont";

const TitleSign = styled(DigiFont)<{size:number}>`
    position: absolute;
    top: 50%;
    left: -100%;
    transform:translateY(-50%);
    display: block;
    width: 100%;
    font-weight: 200;
`;

const SongDisplay = () =>{
    return(
        <SongDisplayWrapper>
            <TitleSign size={15}>title</TitleSign>
        </SongDisplayWrapper>
    )
}

export default SongDisplay;