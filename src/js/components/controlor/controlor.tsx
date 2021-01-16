import * as React from "react";
import {useMemo} from "react";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../redux/StateType";
import styled from "styled-components";
import { PlayButton } from "./buttons";
import MusicLength from "./progressBar";

import { containers } from "../../styles/containers";
const { ConrolWrapper } = containers;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content:space-around;
    align-items:center;
`;

const ControlorCompo = () =>{
    return(
        <ConrolWrapper>
            <ButtonWrapper>
                <PlayButton />
            </ButtonWrapper>
            <MusicLength />
        </ConrolWrapper>
    )
}

export default ControlorCompo;