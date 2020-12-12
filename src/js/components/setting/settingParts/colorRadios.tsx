import * as React from "react";
import {useCallback} from "react";
import styled,{css,StyledComponent} from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import {setMainColor} from "../../../redux/actions/mapDispatchToProps";
import {ReduceType} from "../../../redux/reducer/index";
import {ShineRadio} from "../../parts/radio";

import {Head} from "./commonTitle";

const ColorSettingCOntainer = styled.div`
    width: 100%;
    padding: 10px;
`;



const ColorSetWrapper = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    justify-content:space-around;
`;


const ColorSettingRadios = () =>{
    const dispatch = useDispatch();
    const colors = useSelector((state:ReduceType)=>state.mainColor);
    const handleClickRadio = useCallback((e,arg)=>dispatch(setMainColor(e.target.name,e.target.checked)),[colors]);
    const radios = Object.entries(colors).map(([key,value])=> <li key={key}><ShineRadio name={key} checked={value} func={handleClickRadio} /></li>)
    return(
        <ColorSettingCOntainer>
            <Head>set color</Head>
            <ColorSetWrapper>
                {radios}
            </ColorSetWrapper>
        </ColorSettingCOntainer>
    )
}

export default ColorSettingRadios;