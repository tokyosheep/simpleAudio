import * as React from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../../redux/StateType";

import { PlayListData } from "../musicData";

const PlayListCompo = () =>{
    const playList = useSelector((state:StateType)=>state.playList);
    console.log(playList);
    const currentList = playList.find(p=> p.selected===true);
    const listRaws = currentList?.musics.map((m,i)=><PlayListData title={m.title} artist={m.artist} duration={m.duration} index={i} key={i}></PlayListData>) ?? <></>;

    return (
        <tbody>
            {listRaws}
        </tbody>
    );
}

export default PlayListCompo;