import * as React from "react";
import { useCallback } from "react";
import styled,{ css } from "styled-components";
import { smallTitle } from "../../../styles/mixin";

const Title = styled.h3<{color:string}>`
    ${smallTitle}
`;

const RangeWrapper = styled.div`
    width: 80%;
    height: 30px;
    position: relative;
`;

const ProgressStyle = css`
    height: 5px;
    position: absolute;
    border-radius: 5px;
`;

const Progress = styled.div<{value:number,color:string}>`
    ${ProgressStyle};
    width: ${props=> props.value}%;
    background: ${props=> props.color};
    z-index: 3;
`;

const ProgressBack = styled.div`
    ${ProgressStyle};
    width: 100%;
    z-index: 2;
    background: #2e2e2e;
`;

const RangeBar = styled.input`
    appearance: none;
    border:  solid 1px #999;
    background: rgba(0,0,0,0);
    box-sizing:border-box;
    vertical-align: middle;
    transition: .3s linear;
    width: 100%;
    height: 5px;
    border-radius: 5px;
    position: absolute;
    z-index: 4;
    margin: 0;
    &::-webkit-slider-runnable-track{
        background: rgba(0,0,0,0);
    }
    &::-webkit-slider-thumb{
        appearance: none;
        width: 8px;
        height: 14px;
        border: 1px solid #000;
        background: linear-gradient(rgb(70,70,70),rgb(120,120,120),rgb(70,70,70));
        cursor: pointer;
    }
    &:focus{
        outline: none;
    }
`;

export type SliderProps = {
    value:number,
    color:string,
    max:number,
    step:number,
    func:(e:React.ChangeEvent<HTMLInputElement>,name:string)=>void
    name:string
}

const RangeSlider:(props:SliderProps)=>JSX.Element = ({value,color,max,func,name,step}) =>{
    return(
        <RangeWrapper>
            <Title color={color}>{name}</Title>
            <RangeBar type="range" value={value} min={0} max={max} onChange={(e)=>func(e,name)} step={step} ></RangeBar>
            <Progress color={color} value={(value/max)*100}></Progress>
            <ProgressBack></ProgressBack>
        </RangeWrapper>
    )
}

export default RangeSlider;