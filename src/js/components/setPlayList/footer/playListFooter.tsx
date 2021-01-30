import * as React from "react";
import {useSelector,useDispatch} from "react-redux";
import styled from "styled-components";
import { playListContainer } from "../../../styles/containers";

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import FooterIcons from "./footerIcons";

const { Footer } = playListContainer;


const PlayListFooter = () =>{
    return(
        <Footer>
            <DndProvider backend={HTML5Backend} >
                <FooterIcons></FooterIcons>
            </DndProvider>
        </Footer>
    )
}

export default PlayListFooter;