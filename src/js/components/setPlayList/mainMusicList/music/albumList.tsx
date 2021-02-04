import * as React from "react";
import { useCallback } from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../../../redux/StateType";
import { MusicType , Albumtype } from "../../../../redux/reducer/musics";
import { currentMusic_set , album_setIndex } from "../../../../redux/actions/dispatchMusics";
import { playMusic_add } from "../../../../redux/actions/dispatchPlayList";
import { ItemType } from "../playListMain";
import { useDrag } from 'react-dnd';
import { darken } from "polished";

const AlbumTitle = styled.tr<{color:string}>`
    background: ${props =>`linear-gradient(45deg ,${darken(0.4,props.color)},rgb(0,0,0))`};
    td{

    }
`;

const MusicWrapper = styled.tr<{isOver:boolean}>`
    td{
        background: ${props => props.isOver ? "rgba(120,120,120,0.5)" : "rgba(120,120,120,0.3)" };
    }
    &:hover{
        background: rgba(120,120,120,0.6);
    }
    cursor: pointer;
`;

const DragRow:(props:{m:MusicType,i:number,albumIndex:number})=>JSX.Element = ({m,i,albumIndex}) =>{
    const dispatch = useDispatch();
    const [prop, drag] = useDrag({
        item: { music:m, type: ItemType.MUSIC },
        end:(item,monitor)=>{
            console.log(item);
            console.log(monitor);
            console.log(m);
            const dropResult = monitor.getDropResult();
            console.log(dropResult);
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const clickOnList:(i:number)=>void = i =>dispatch(album_setIndex(albumIndex,i));
    return(
        <MusicWrapper ref={drag} isOver={m.selected} onClick={()=>clickOnList(i)} >
            <td>{m.title}</td>
            <td>{m.artist}</td>
        </MusicWrapper>
    );
    
}

const AlbumList:(props:{album:Albumtype,albumIndex:number})=>JSX.Element = ({album,albumIndex}) =>{
    const uiColor = useSelector((state:StateType)=>state.uiColor);
    const musics = album.musics.map((m,i)=><DragRow key={i} i={i} m={m} albumIndex={albumIndex} />);
    return(
        <tbody>
            <AlbumTitle color={uiColor}>
                <td>{album.name}</td>
                <td></td>
            </AlbumTitle>
            {musics}
        </tbody>
    );
}

export default  AlbumList;