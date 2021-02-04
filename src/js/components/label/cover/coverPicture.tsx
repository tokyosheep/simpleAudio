import * as React from "react";
import { useState , useMemo , Suspense } from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../../redux/StateType";
import { SuspoendLoading , wrapPromise } from "./suspend";
import {ipcRenderer} from "electron";

import { CurrentMusicType } from "../../../redux/reducer/musics";

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

const coverImage:(currentMusic:CurrentMusicType)=>{read:()=>string} = currentMusic =>{
    const promise:Promise<string> = new Promise(resolve=>{
            try{
                if(currentMusic === null || currentMusic.imageBuffer === undefined || currentMusic.imageBuffer === null){ 
                    ipcRenderer.invoke("getAppPath").then(n=>resolve(`${n}/image/vinyl_600X600.jpg`));
                }else if(typeof currentMusic.imageBuffer === "string"){
                    resolve(currentMusic.imageBuffer);
                }else{
                    const buffer = Buffer.from(currentMusic.imageBuffer);
                    resolve(`data:image/png;base64,${buffer.toString("base64")}`);
                }
            }catch(e){
                ipcRenderer.invoke("getAppPath").then(n=>resolve(`${n}/image/vinyl_600X600.jpg`));
            }
        
    });
    return wrapPromise(promise);
}

const CoverPicture = () =>{
    const currentMusic = useSelector((state:StateType)=>state.currentMusic);
    const [imageSource , setImageSource] = useState(coverImage(currentMusic));
    useMemo(()=>setImageSource(coverImage(currentMusic)),[currentMusic?.imageBuffer]);
    const ImageSrc = () => <Image src={imageSource.read()}></Image>;
    return(
        <CoverWrapper>
            <Suspense fallback={<SuspoendLoading />}>
                <ImageSrc />
            </Suspense>
        </CoverWrapper>
    )
}

export default CoverPicture;