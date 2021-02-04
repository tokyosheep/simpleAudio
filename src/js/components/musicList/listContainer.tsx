import * as React from "react";
import { useCallback } from "react";
import styled from "styled-components";
import MusicData from "./musicData";
import MusicMenu from "./menu";
import PlayListCompo from "./playListMusics/playList";
import {useSelector,useDispatch} from "react-redux";
import { album_remove } from "../../redux/actions/dispatchMusics";
import StateType from "../../redux/StateType";
import { useDrop } from "react-dnd";
import { NativeTypes} from "react-dnd-html5-backend";

import { containers } from "../../styles/containers";
import { DropFunc } from "./musicListContainer";
import { darken , lighten } from "polished";
const { MusicListWrapper } = containers;

const ListWrapper = styled.table`
    padding: 0;
    width: 100%;
    overflow: scroll;
    th{
        font-size: 10px;
        font-weight: 200;
    } 
`;

const TableHeader = styled.tr`
    width: 100%;
    background: rgb(50,50,50);
    th{
        color: #ffffff;
    }
`;

const AlbumTitle = styled.tr<{color:string}>`
    color: #fff;
    font-weight: 200;
    font-size: 12px;
    background: ${props =>`linear-gradient(45deg ,${darken(0.4,props.color)},rgb(0,0,0))`};
    td{
        background: rgba(30,30,30,0.1);
        cursor: pointer;
        &:hover{
            background: rgba(200,200,200,0.2);
        }
    }
`;

export const MusicList:(props:{onDrop:DropFunc})=>JSX.Element = props =>{
    const dispatch = useDispatch();
    const uiColor = useSelector((state:StateType)=>state.uiColor);
    const modeMusic = useSelector((state:StateType)=>state.modeWindow.playlist);
    const { onDrop } = props;
    const [{canDrop,isOver},drop] = useDrop({
        accept:[NativeTypes.FILE],
        drop(item,monitor){
            if(onDrop){
                onDrop(monitor);
            }
        },
        collect:monitor=>({
            isOver:monitor.isOver(),
            canDrop:monitor.canDrop()
        })
    });
    const albums = useSelector((state:StateType)=>state.albumList);
    const removeAlbum = useCallback((index)=>dispatch(album_remove(index)),[albums]);
    const albumList = albums.map((album,index)=>{
        const musics = album.musics.map((music,i)=><MusicData key={i} title={music.title} artist={music.artist} duration={music.duration} index={i} albumIndex={index}/>);
        return(
        <tbody  key={album.name}>
            <AlbumTitle color={uiColor}>
                <td >
                    {album.name}
                </td>
                <td>

                </td>
                <td onClick={()=>removeAlbum(index)}>
                    remove
                </td>
            </AlbumTitle>
            {musics}
        </tbody>
        );
    });
    const isActive = canDrop && isOver;
    return(
        <MusicListWrapper ref={drop} isDrop={isActive}>
            <MusicMenu></MusicMenu>
            <ListWrapper>
                <thead>
                    <TableHeader>
                        <th>title</th>
                        <th>artist</th>
                        <th>duration</th>
                    </TableHeader>
                </thead>
                {
                    modeMusic 
                    ?
                        <PlayListCompo />
                    :
                    albumList
                    
                }
            </ListWrapper>
        </MusicListWrapper>
    )
}

export default MusicList;