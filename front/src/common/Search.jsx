import React from 'react';
import Icon from "./Icon"

export const Search = ({ callBack }) => {
    return (
        <div class="search-box">
            <input onChange={callBack} class="search-txt" type="text" placeholder="What are you looking for?" />
            <a class="search-btn" href="#">
                <div className="search-box__icon"><Icon name={"search"} fill={"#5E4AE3"} width={"24px"} height={"24px"} /></div>
            </a>
        </div>
    )
}