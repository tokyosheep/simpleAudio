import * as React from "react";
import {useSelector,useDispatch} from "react-redux";
import {ReduceType} from "../../redux/reducer/index";
import {MusicObject} from "../../redux/reducer/type";

import styled from "styled-components";

import MusicData from "./musicData";
import {styleComponent} from "../../styles/containerStyle";

const MusicListWrapper = styleComponent.musicList;

const ListWrapper = styled.table`
    padding: 0;
    width: auto;
    overflow: scroll;
    font-size: 10px;
    font-weight: 200;
    color: #ffffff;
`;

const TableHeader = styled.tr`
    background: rgb(50,50,50);
`

const MusicList = () =>{
    const musics = useSelector((state:ReduceType)=> state.musics);
    console.log(musics);
    const musicList = musics.map((m,i)=> <MusicData key={i} title={m.title} artist={m.artist} long={m.long} index={i}></MusicData>);
    return(
        <MusicListWrapper>
            <ListWrapper>
                <TableHeader>
                    <th>title</th>
                    <th>artist</th>
                    <th>length</th>
                </TableHeader>
                {musicList}
            </ListWrapper>
        </MusicListWrapper>
    )
}

export default MusicList;