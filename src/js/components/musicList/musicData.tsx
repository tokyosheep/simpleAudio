import * as React from "react";
import {useCallback} from "react";
import {useSelector,useDispatch} from "react-redux";
import {setCurrentMusic} from "../../redux/actions/mapDispatchToProps";
import {ReduceType} from "../../redux/reducer/index";
import {CurrentMusicType} from "../../redux/reducer/type";
import styled from "styled-components";

const MusicWrapper = styled.tr<{on:boolean}>`
    width: 100%;
    height: 20px;
    background: ${props=> props.on  ? "rgb(90,90,90)" : "rgb(20,20,20)"};
    cursor: pointer;
    &:hover{
        background: rgb(40,40,40);
    }
`;

const isCurrentMusic:(index:number,current:CurrentMusicType)=>boolean = (index,current) => current?.index === index ?? false;

const MusicData:(props:{title:string,artist:string,index:number,long:number})=>JSX.Element = (props) =>{
    const dispatch = useDispatch();
    const currentMusic = useSelector((state:ReduceType)=>state.currentMusic);
    const musicList = useSelector((state:ReduceType)=>state.musics);
    const clickOnList = useCallback(()=>{
        console.log("click");
        dispatch(setCurrentMusic(musicList[props.index]));
    },[currentMusic]);
    console.log(currentMusic);
    return(
        <MusicWrapper onClick={clickOnList} on={isCurrentMusic(props.index,currentMusic)}>
            <th>{props.title}</th>
            <th>{props.artist}</th>
            <th>{props.long}</th>
        </MusicWrapper>
    )
}

export default MusicData;