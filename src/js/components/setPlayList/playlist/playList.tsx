import * as React from "react";
import { useCallback } from "react";
import styled from "styled-components";
import { playListContainer } from "../../../styles/containers";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../../redux/StateType";
import { playList_select } from "../../../redux/actions/dispatchPlayList";
import { playListTitle } from "../../../styles/mixin";

const { PlayList } = playListContainer;

const ListTitle = styled.h2<{color:string}>`
    font-size: 15px;
    margin-left: 5px;
    ${playListTitle};
`;

const ListWrapper = styled.ul`
    list-style: none;
    padding: 0;
`;

const ListRows = styled.li<{selected:boolean}>`
    font-size: 12px;
    color: #fff;
    font-weight: 200;
    border-bottom: 1px solid #999;
    padding: 5px 3px;
    cursor: pointer;
    background: ${props=> props.selected ? "rgba(100,100,100,0.5)" : "rgba(0,0,0,0)"};
    transition: .3s linear;
`;


const PlayListCompo = () =>{
    const dispatch = useDispatch();
    const uiColor = useSelector((state:StateType)=>state.uiColor);
    const playList = useSelector((state:StateType)=>state.playList);
    const selectedIndex = playList.findIndex(m=> m.selected);
    const handleClickList = useCallback((index:number)=>dispatch(playList_select(index)),[playList]);
    const playlistData = playList.map((list,i)=>{
        return(
            <ListRows key={i} selected={i===selectedIndex} onClick={()=>handleClickList(i)} >
                {list.name}
            </ListRows>
        )
    })
    return(
        <PlayList>
            <ListTitle color={uiColor}>yourList</ListTitle>
            <ListWrapper>
                {playlistData}
            </ListWrapper>
        </PlayList>
    )
}

export default PlayListCompo;