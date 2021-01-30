import * as React from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";

import StateType from "../../../redux/StateType";
import { MusicType } from "../../../redux/reducer/musics";
import { playMusic_remove } from "../../../redux/actions/dispatchPlayList";
import { GoTrashcan } from "react-icons/go";
import { ItemType } from "../mainMusicList/playListMain";
import { lighten  ,rgba} from "polished";

import { useDrop } from 'react-dnd';

const Bin = styled(GoTrashcan)<{color:string,overdrop:string}>`
    filter: drop-shadow(0px 0px 3px 3px ${props=>rgba(props.color,0.4)});
    stroke:${props=> props.overdrop === "true" ?  lighten(0.3,props.color) : props.color};
`;

const BinWrapper = styled.div``;

const IconWrapper = styled.div`
    display: flex;
    justify-content:flex-start;
`;

const FooterIcons = () =>{
    const dispatch = useDispatch();
    const uiColor = useSelector((state:StateType)=>state.uiColor);
    const [{canDrop , isOver },drop] = useDrop({
        accept:[ItemType.LIST],
        drop:(item:{type:string,music:MusicType,index:number},monitor)=>{
            console.log(item);
            if(item.type==="list"){
                console.log("List");
                console.log(item);
                dispatch(playMusic_remove(item.index));
            }
        },
        collect:(monitor)=>({
            isOver:monitor.isOver(),
            canDrop:monitor.canDrop(),
        }),
    });
    const isActive = canDrop && isOver;
    return(
        <IconWrapper>
            <BinWrapper ref={drop}>
                <Bin color={uiColor} overdrop={isActive.toString()}></Bin>
            </BinWrapper>
        </IconWrapper>
    )
}

export default FooterIcons;