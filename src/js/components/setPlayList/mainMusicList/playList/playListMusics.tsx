import * as React from "react";
import { useCallback , useRef } from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../../../redux/StateType";
import { MusicType , Albumtype } from "../../../../redux/reducer/musics";
import { playMusic_add , playMusic_switch , playList_setMusicIndex } from "../../../../redux/actions/dispatchPlayList";
import { BoxTitle } from "../playListMain";
import { useDrop , useDrag } from 'react-dnd';
import { ItemType } from "../playListMain";

const PlayListMusicsWrapper = styled.div<{drop:boolean}>`
    width: 50%;
    overflow: scroll;
    background: ${props=> props.drop ? "#2a2a2a" : "#050505"};
`;

const TableWrapper = styled.table`
    width: 100%;
    list-style: none;
    padding: 0;
    tr{
        font-size: 12px;
        color: #fff;
        font-weight: 200;
    }
`;

const TableHeader = styled.thead`
    tr{
        th{
            background: rgb(40,40,40);
        }
    }
`;

const TableMusicList = styled.tbody`
    tr{
        td{
            background: rgba(40,40,40,0.3);
        }
    }
`;

const MusicDataRaw = styled.tr<{isOver:boolean}>`
    background: ${props=> props.isOver ? "rgb(60,60,60)" : "rgb(0,0,0)"};
    cursor: pointer;
    &:hover{
        background: "rgb(30,30,30)";
    }
`;

const MusicRaws:(props:{music:MusicType,index:number})=>JSX.Element = ({music,index}) =>{
    const dispatch = useDispatch();
    const playList = useSelector((state:StateType)=>state.playList);
    const currentList = playList.find(p=> p.selected === true);
    const handleDragOnMusic = useCallback((music)=>{
        if(currentList===undefined)return;
        dispatch(playMusic_add(music,index));
    },[currentList]);
    const handleSwitchMusic = useCallback((target,replace)=>{
        dispatch(playMusic_switch(target,replace));
    },[currentList]);
    const ref = useRef(null);
    const [prop, drag] = useDrag({
        item: { music:music, type: ItemType.LIST , index:index },
        end:(item,monitor)=>{
            console.log(item);
            console.log(monitor);
            console.log(music);
            const dropResult = monitor.getDropResult();
            console.log(dropResult);
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [{canDrop , isOver },drop] = useDrop({
        accept:[ItemType.MUSIC,ItemType.LIST],
        drop:(item:{type:string,music:MusicType,index:number},monitor)=>{
            console.log(item);
            if(item.type==="music"){
                handleDragOnMusic(item.music);
            }
            if(item.type==="list"){
                console.log("List");
                handleSwitchMusic(item.index,index);
            }
        },
        collect:(monitor)=>({
            isOver:monitor.isOver(),
            canDrop:monitor.canDrop(),
        }),
    });
    const isActive = (canDrop && isOver) || index === currentList?.currentMusicIndex;
    drag(drop(ref));
    console.log(index);
    const handleClickRaw = useCallback(()=>dispatch(playList_setMusicIndex(index)),[currentList]);
    return(
        <MusicDataRaw ref={ref} isOver={isActive} onClick={handleClickRaw} >
            <td>{music.title}</td>
            <td>{music.artist}</td>
        </MusicDataRaw>
    )
}

const PlatListMusicCompo = () =>{
    const dispatch = useDispatch();
    const playListData = useSelector((state:StateType)=>state.playList);
    const currentList = playListData.find(p=> p.selected===true);
    const handleAddList = useCallback((m)=>{
        if(currentList===undefined)return;
        dispatch(playMusic_add(m,currentList.musics.length))
    },[currentList]);
    const [{canDrop , isOver } , drop] = useDrop({
        accept:ItemType.MUSIC,
        drop:(item:any,monitor)=>{
            console.log(item,monitor);
            handleAddList(item.music);
        },
        collect:(monitor)=>({
            isOver:monitor.isOver(),
            canDrop:monitor.canDrop(),
        }),
    });
    const isActive = canDrop && isOver;
    const uiColor = useSelector((state:StateType)=>state.uiColor);
    const musicList = currentList?.musics.map((music,index)=>{
        return(
            <MusicRaws key={index} music={music} index={index}/>
        );
    }) ?? [];
    return(
        <PlayListMusicsWrapper drop={isActive}>
            <BoxTitle color={uiColor} ref={drop} >{currentList?.name ?? "" }</BoxTitle>
            <TableWrapper>
                <TableHeader>
                    <tr>
                        <th>title</th>
                        <th>artist</th>
                    </tr>
                </TableHeader>
                <TableMusicList>
                    {musicList}
                </TableMusicList>
            </TableWrapper>
        </PlayListMusicsWrapper>
    )
}

export default PlatListMusicCompo;