import * as React from "react";
import MenuCompo from "./menu/menuCompo";

import {styleComponent} from "../../styles/containerStyle";
const LabelData = styleComponent.labelData;

const LabelCompo = () =>{
    return(
        <LabelData>
            <MenuCompo></MenuCompo>
        </LabelData>
    )
}

export default LabelCompo;