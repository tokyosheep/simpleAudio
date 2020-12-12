import * as React from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import {ReduceType} from "../../../redux/reducer/index";
import {turnCoverImage} from "../../../fileSystem/turnBuffer";

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
    const currentMusic = useSelector((state:ReduceType)=>state.currentMusic);
    const image = turnCoverImage(currentMusic);
    console.log(image);
    return(
        <CoverWrapper >
            <Image src={image}></Image>
        </CoverWrapper>
    )
}

export default CoverPicture;