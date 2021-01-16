import * as React from "react";
import styled from "styled-components";
import MusicData from "./musicData";
import MusicMenu from "./menu";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../redux/StateType";
import {DndProvider,DropTargetMonitor,useDrop} from "react-dnd";
import {HTML5Backend, NativeTypes} from "react-dnd-html5-backend";

import { containers } from "../../styles/containers";
import { DropFunc } from "./musicListContainer";
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

export const MusicList:(props:{onDrop:DropFunc})=>JSX.Element = props =>{
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
    const albumList = albums.map((album,index)=>{
        const musics = album.musics.map((music,i)=><MusicData key={i} title={music.title} artist={music.artist} duration={music.duration} index={i} albumIndex={index}/>);
        return(
        <tbody  key={album.name}>
            <tr>
                <td >
                    {album.name}
                </td>
                <td>

                </td>
                <td>
                    remove
                </td>
            </tr>
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
                {albumList}
            </ListWrapper>
        </MusicListWrapper>
    )
}

export default MusicList;