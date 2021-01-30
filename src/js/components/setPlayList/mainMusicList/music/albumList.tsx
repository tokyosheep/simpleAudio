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

import { isCurrentMusic } from "../../../musicList/musicData";

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



const AlbumList:(props:{album:Albumtype,albumIndex:number})=>JSX.Element = ({album,albumIndex}) =>{
    const dispatch = useDispatch();
    const uiColor = useSelector((state:StateType)=>state.uiColor);
    const albumList = useSelector((state:StateType)=>state.albumList);
    const currentMusic = useSelector((state:StateType)=>state.currentMusic);
    const musics = album.musics.map((m,i)=>{
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
        console.log(prop);
        /*albums[props.albumIndex].musics[props.index],currentMusicData) */
        console.log(albumList[albumIndex].musics[i]);
        const clickOnList = useCallback(()=>dispatch(currentMusic_set(albumList[albumIndex].musics[i])),[currentMusic]);
        
        return(
            <MusicWrapper key={i} ref={drag} isOver={isCurrentMusic(albumList[albumIndex].musics[i],currentMusic)} onClick={clickOnList} >
                <td>{m.title}</td>
                <td>{m.artist}</td>
            </MusicWrapper>
        );
    })
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