import React from "react";
import PropTypes from "prop-types";

const Button = ({type, buttonFunction, size, onClick, icon, children, disabled}) => {

    const btnClass = `btn btn--${type} btn--${size}`;
    const imgURL = `/../../../${icon}.svg`

    return <>
        {
            icon ? (
                <button type={buttonFunction} className={btnClass} disabled={disabled} onClick={onClick}>
                    <img src={imgURL} alt="icon" className="btn--icon"/>
                    {children}
                </button>
            ) : (
                <button type={buttonFunction} className={btnClass} disabled={disabled} onClick={onClick}>
                    {children}
                </button>
            )
        }
    </>

};

Button.propTypes = {
    type: PropTypes.string.isRequired,
    buttonFunction: PropTypes.string,
    size: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    icon: PropTypes.string,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool

}

Button.defaultProps = {
    buttonFunction: "button",
    type: "primary",
    size: "sm",
}

export default Button;