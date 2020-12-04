import * as React from "react";
import styled, { css } from 'styled-components';

import MenuCompo from "../components/menu/menuCompo";
import VolumeCompo from "../components/volume/volumeCompo";
import ControlCompo from "../components/control/controlCompo";
import SongDisplayCompo from "../components/songDisplay/songDisplayCompo";
import LabelCompo from "../components/label/labelCompo";
import MusicList from "../components/musicList/musicList";

import {styleComponent} from "../styles/containerStyle";
const Container = styleComponent.container;

const AudioContainer = () =>{
    return(
        <Container>
            <LabelCompo />
            <SongDisplayCompo />
            <ControlCompo />
            <VolumeCompo />
            <MusicList />
        </Container>
    )
}

export default AudioContainer;