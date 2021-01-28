import * as React from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../../redux/StateType";
import { playListContainer } from "../../../styles/containers";
import { playListTitle } from "../../../styles/mixin";
import PlayHeaderButtons from "./buttons/playButtons";

const { Header } = playListContainer;

const HeadTitle = styled.h1<{color:string}>`
    font-size: 20px;
    ${playListTitle};
`;

const PlayListHeader = () =>{
    const uiColor = useSelector((state:StateType)=>state.uiColor);
    return(
        <Header>
            <HeadTitle color={uiColor}>play list</HeadTitle>
            <PlayHeaderButtons />
        </Header>
    )
}

export default PlayListHeader;