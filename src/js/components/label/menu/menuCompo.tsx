import * as React from "react";
import styled from "styled-components";

const MenuButton = styled.ul`
    width: 20px;
    height: 15px;
    top: 0;
    left: 90%;
    position: relative;
    list-style:none;
    padding: 0;
    cursor: pointer;
    li{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 2px;
        border-radius: 5px;
        background: #fff;
        box-shadow: 0px 0px 3px 3px rgba(255,255,255,0.2);
    }
    li:nth-child(2){
        top: 13px;
    }
    li:nth-child(3){
        top:50%;
        transform: translateY(-50%);
    }
`;

const MenuCompo = () =>{
    return(
        <MenuButton>
            <li></li>
            <li></li>
            <li></li>
        </MenuButton>
    )
}

export default MenuCompo;