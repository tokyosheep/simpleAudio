import * as React from "react";
import { useCallback } from "react";
import styled from "styled-components";
import { useDispatch , useSelector } from "react-redux";
import StateType from "../../../redux/StateType";
import { uiColor_set } from "../../../redux/actions/dispatchUI";
import { ColorBUttonType } from "./colorButton";

import ColorButton from "./colorButton";

const ColorListWrapper = styled.div`
    padding: 10px;
    border-radius: 5px;
`;

const ColorsWrapper = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: space-around;
`;

class ColorType{
    constructor(public name:string,public color:string){

    }
}

const colors = [
    new ColorType("blue","#559ae0"),
    new ColorType("green","#55e065"),
    new ColorType("orange","#f38831")
];

const ColorList = () =>{
    const dispatch = useDispatch();
    const uiColor = useSelector((state:StateType)=>state.uiColor);
    const playList = useSelector((state:StateType)=>state.playList);
    const currentList = playList.find(p => p.selected === true);
    const handleColorButton:ColorBUttonType = useCallback((color)=>dispatch(uiColor_set(color)),[uiColor]);
    const colorButtons = colors.map((color)=><li key={color.name}><ColorButton name={color.name} color={color.color} func={handleColorButton}/></li>);
    return(
        <ColorListWrapper>
            <ColorsWrapper>
                {colorButtons}
            </ColorsWrapper>
        </ColorListWrapper>
    )
}

export default ColorList;