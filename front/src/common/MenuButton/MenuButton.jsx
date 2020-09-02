import React from "react";
import Checkbox from "./checkbox/Checkbox";
import CircleButton from "../CircleButton/CircleButton";

const Button = ({
                    headline,
                    subline,
                    avatar,
                    checkbox,
                    secondaryMenu

                }) => {

    return (
        <div className="rectangleButton">
            <div className="rectangleButton__wrapper">
                {checkbox && <Checkbox/> }
                {avatar && <div className="menuButton__avatar-empty"/> }

                <div className="rectangleButton-info">
                    <h3 className="rectangleButton-info__headline">{headline}</h3>
                    <p className="rectangleButton-info__subline">{subline}</p>
                </div>

            </div>

            <div className="rectangleButton__menu">
                <CircleButton iconName="ellipsis-h"/>
                {secondaryMenu && <CircleButton iconName="draggabledots"/>}
            </div>
        </div>
    )
}

export default Button;