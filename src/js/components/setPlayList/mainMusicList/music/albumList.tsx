import * as React from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../../../redux/StateType";
import { MusicType , Albumtype } from "../../../../redux/reducer/musics";
import { playMusic_add } from "../../../../redux/actions/dispatchPlayList";
import { ItemType } from "../playListMain";
import { useDrag, DragSourceMonitor , DragObjectWithType } from 'react-dnd';
import { darken } from "polished";

const AlbumTitle = styled.tr<{color:string}>`
    background: ${props =>`linear-gradient(45deg ,${darken(0.4,props.color)},rgb(0,0,0))`};
    td{

    }
`;

const MusicWrapper = styled.tr`
    td{
        background: rgba(120,120,120,0.3);
    }
`;

const AlbumList:(props:{album:Albumtype})=>JSX.Element = ({album}) =>{
    const uiColor = useSelector((state:StateType)=>state.uiColor);
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
        return(
            <MusicWrapper key={i} ref={drag}>
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