import * as React from "react";
import { useCallback } from "react";
import styled from "styled-components";
import { useSelector , useDispatch } from "react-redux";
import StateType from "../../../redux/StateType";
import { rgba , lighten } from "polished";
import { centerPlaced } from "../../../styles/mixin";

const ButtonBorder = styled.div<{color:string}>`
    box-shadow:0px 0px 3px 3px ${props=>rgba(props.color,0.2)};
    border: 1px solid ${props=> props.color};
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    padding: 3px;
    width: 50px;
    height: 20px;
    transition: .3s linear;
    span{
        display: block;
        ${centerPlaced}
        font-weight: 200;
        color: ${props=> props.color};
        transition: .3s linear;
    }
    &:hover{
        //background: rgba(255,255,255,0.2);
        border: 1px solid ${props=> lighten(0.2,props.color)};
        span{
            color: ${props=> lighten(0.2,props.color)};
        }
    }
`;

export type ColorBUttonType = (color:string)=>void;

const ColorButton:(props:{name:string,color:string,func:ColorBUttonType})=>JSX.Element = ({name,func,color}) =>{
    return(
        <ButtonBorder color={color} onClick={()=>func(color)}>
            <span>{name}</span>
        </ButtonBorder>
    )
}

export default ColorButton;