import * as React from "react";
import { useCallback } from "react";
import styled from "styled-components";
import { centerPlaced } from "../../../styles/mixin";
import { useDispatch , useSelector } from "react-redux";
import {
    blur_set,
    contrast_set,
    curtain_set
} from "../../../redux/actions/dispatchFilter";

import StateType from "../../../redux/StateType";
import RangeSlider from "./rangeParts";

const FilterWrapper = styled.div`
    padding: 10px;
    border-radius: 5px;
    ul{
        list-style: none;
        padding: 0;
    }
`;

const FilterSliders = () =>{
    const dispatch = useDispatch();
    const filterData = useSelector((state:StateType)=>state.filterData);
    const handleSlider = useCallback((e,prop)=>{
        if(prop==="blur")dispatch(blur_set(parseFloat(e.target.value)));
        if(prop==="contrast")dispatch(contrast_set(parseFloat(e.target.value)));
        if(prop==="curtain")dispatch(curtain_set(parseFloat(e.target.value)));
    },[filterData]);
    const silders = Object.values(filterData).map((filter,index)=>{
        return(
            <li key={filter.name}>
                <RangeSlider value={filter.value} step={filter.step} color={filter.color} max={filter.max} name={filter.name} func={handleSlider}/>
            </li>
        )
    })
    return(
        <FilterWrapper>
            <ul>
                {silders}
            </ul>
        </FilterWrapper>
    )
}

export default FilterSliders;