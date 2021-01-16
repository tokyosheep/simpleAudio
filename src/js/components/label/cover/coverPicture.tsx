import * as React from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../../redux/StateType";

import { turnCoverImage } from "../../../fileSystem/turnBuffer";

const CoverWrapper = styled.div`
    top: 20px;
    left: 20px;
    width: 100px;
    height: 100px;
    z-index: 3;
    position: absolute;
`;

const Image = styled.img`
    height: 100px;
    width: 100px;
`; 

const CoverPicture = () =>{
    const currentMusic = useSelector((state:StateType)=>state.currentMusic);
    const image = turnCoverImage(currentMusic);
    return(
        <CoverWrapper >
            <Image src={image}></Image>
        </CoverWrapper>
    )
}

export default CoverPicture;