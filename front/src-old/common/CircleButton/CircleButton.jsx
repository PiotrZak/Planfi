import React from "react";
import {Icon} from "../Icon";

const CircleButton = ({iconName}) => (
    <div className="btn--small btn--regular btn--circle">
        <Icon name={iconName} fill="white" height="2.8rem" width="2.5rem"/>
    </div>
)

export default CircleButton;