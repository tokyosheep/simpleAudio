import * as React from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../../../redux/StateType";
import  AlbumList from "./albumList";
import { BoxTitle } from "../playListMain";


const MusicListWrapper = styled.div`
    width: 50%;
    overflow: scroll;
    background: linear-gradient(rgb(0,0,0),rgb(30,30,30));
    font-size: 12px;
    color: #fff;
    font-weight: 200;
`;

const TableWrapper = styled.table`
    width:100%;
`;

const TableHeader = styled.thead`
    tr{
        th{
            background: #444444;
        }
    }
`;

const MusicList = () =>{
    const uiColor = useSelector((state:StateType)=>state.uiColor);
    const albumList = useSelector((state:StateType)=>state.albumList);
    const albums = albumList.map((m,i)=>{
        return(
                <AlbumList album={m} key={i} albumIndex={i}/>
        )
    })
    return(
        <MusicListWrapper>
            <BoxTitle color={uiColor}>music list</BoxTitle>
            <TableWrapper>
                <TableHeader>
                    <tr>
                        <th>title</th>
                        <th>artist</th>
                    </tr>
                </TableHeader>
                {albums}
            </TableWrapper>
        </MusicListWrapper>
    )
}

export default MusicList;