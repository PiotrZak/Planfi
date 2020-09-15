import React from 'react';
import Icon from "./Icon"

export const Search = ({ callBack }) => {
    return (
        <div className="search-box">
            <input onChange={callBack} className="search-txt" type="text" placeholder="What are you looking for?" />
            <a className="search-btn" href="#">
                <div className="search-box__icon"><Icon name={"search"} fill={"#5E4AE3"} width={"24px"} height={"24px"} /></div>
            </a>
        </div>
    )
}