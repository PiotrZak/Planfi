import React from "react";

const Button = ({type, buttonFunction, size, onClick, icon, value, disabled}) => {

    const btnClass = `btn btn--${type} btn--${size}`;

    let jsx =
        <button type={buttonFunction} className={btnClass} disabled={disabled} onClick={onClick}>
            {value}
        </button>

    if(icon){
        //error with file path
        const imgURL = `/../../../${icon}.svg`;
        jsx =
            <button type={buttonFunction} className={btnClass} disabled={disabled} onClick={onClick}>
                <img src={imgURL} alt="icon" className="btn--icon" />
                {value}
            </button>
    }

    return jsx;
}

Button.defaultProps = {
    buttonFunction: "button",
}

export default Button;