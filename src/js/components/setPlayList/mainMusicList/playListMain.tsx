import * as React from "react";
import { useCallback } from "react";
import styled,{ css } from "styled-components";
import { playListContainer } from "../../../styles/containers";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../../redux/StateType";
import MusicList from "./music/musicList";
import PlayListCompo from "./playList/playListMusics";
import { playListTitle } from "../../../styles/mixin";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const { Main } = playListContainer;

export const ItemType = {
    MUSIC:"music",
    BOX:"box",
    LIST:"list"
}

export const BoxTitle = styled.h3<{color:string}>`
    ${playListTitle};
    font-size: 15px;
    margin: 5px;
`;

const PlayListMainCompo = () =>{
    return(
        <Main>
            <DndProvider backend={HTML5Backend}>
                <MusicList />
                <PlayListCompo />
            </DndProvider>
        </Main>
    )
}

export default PlayListMainCompo;