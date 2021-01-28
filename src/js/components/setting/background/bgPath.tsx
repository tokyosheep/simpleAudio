import * as React from "react";
import { useCallback } from "react";
import styled from "styled-components";
import { centerPlaced } from "../../../styles/mixin";
import { useDispatch , useSelector } from "react-redux";
import StateType from "../../../redux/StateType";
import { visualSetting_set } from "../../../redux/actions/dispatchVisual";
const RadioInput = styled.input`
    display: none;
`;

const RadioLabel = styled.label`
    display: block;
    cursor: pointer;
`;

const RadioDisplay = styled.div`
    width: 20px;
    height: 20px;
    background: linear-gradient(rgb(50,50,50),rgb(90,90,90));
    border: 1px solid #222;
    position: relative;
    border-radius: 50%;
`;

const RadioMark = styled.div<{on:boolean}>`
    width: ${props=>props.on ? "10px" : "0px" };
    height: ${props=>props.on ? "10px" : "0px" };
    background: #1fc235;
    transition: .3s linear;
    ${centerPlaced}
    border-radius: 50%;
`;

export type MouseFunc = (e:React.FormEvent<HTMLDivElement>,name:string)=>void;

const VisualRadioButton:(props:{checked:boolean,name:string})=>JSX.Element = props =>{
    const dispatch = useDispatch();
    const visualOption = useSelector((state:StateType)=>state.visualSetiing);
    console.log(props);
    const handleRadioButton =useCallback((e,name)=>dispatch(visualSetting_set(name,e.target.checked)),[props.checked]);
    return(
        <RadioLabel>
            <RadioInput type="radio" checked={props.checked} onChange={(e)=>handleRadioButton(e,props.name)} ></RadioInput>
            <RadioDisplay>
                <RadioMark on={props.checked}></RadioMark>
            </RadioDisplay>
        </RadioLabel>
    )
};

const BackPathWrapper = styled.div<{checked:boolean}>`
    width: 95%;
    height: 50px;
    border-radius: 10px;
    background: linear-gradient(rgb(30,30,30),rgb(50,50,50));
    border: 1px solid #000;
    display: flex;
    justify-content:space-around;
    margin-bottom: 10px;
    padding: 10px;
    box-sizing:border-box;
`;

const PathBlock = styled.div`
    width: 70%;
    height: 20px;
    overflow: scroll;
    color: #ffffff;
    font-size: 12px;
    font-weight: 300;
    padding: 5px;
    background: linear-gradient(rgb(30,30,30),rgb(0,0,0));
    border-radius: 5px;
    cursor: pointer;
    &:hover{
        background: linear-gradient(rgb(50,50,50),rgb(10,10,10));
    }
`;

const BackgroundPath:(props:{path:string,checked:boolean,name:string,func:()=>void})=>JSX.Element = props =>{
    return(
        <BackPathWrapper checked={props.checked}>
            <PathBlock onClick={props.func} >{props.path}</PathBlock >
            <VisualRadioButton checked={props.checked} name={props.name}></VisualRadioButton>
        </BackPathWrapper>
    )
}

export default BackgroundPath;