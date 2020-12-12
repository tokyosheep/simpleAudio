import * as React from "react";
import {useSelector,useDispatch} from "react-redux";
import {ReduceType} from "../../redux/reducer/index";

import styled from "styled-components";

import MusicData from "./musicData";
import {styleComponent} from "../../styles/containerStyle";
import {mainBlue,shine} from "../../styles/commonColor";

const MusicListWrapper = styleComponent.musicList;

const ListWrapper = styled.table`
    padding: 0;
    width: auto;
    overflow: scroll;
    th{
        font-size: 10px;
        font-weight: 200;
    } 
`;

const TableHeader = styled.tr`
    background: rgb(50,50,50);
    th{
        color: #ffffff;
    }
`

const MusicList = () =>{
    const musics = useSelector((state:ReduceType)=> state.musics);
    console.log(musics);
    const musicList = musics.map((m,i)=> <MusicData key={i} title={m.title} artist={m.artist} long={m.long} index={i}></MusicData>);
    return(
        <MusicListWrapper>
            <ListWrapper>
                <thead>
                    <TableHeader>
                        <th>title</th>
                        <th>artist</th>
                        <th>length</th>
                    </TableHeader>
                </thead>
                <tbody>
                    {musicList}
                </tbody>
            </ListWrapper>
        </MusicListWrapper>
    )
}

export default MusicList;