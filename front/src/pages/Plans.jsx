import React, { useState, useEffect } from 'react';
import Icon from "./../../src/common/Icon"
import { NavLink } from 'react-router-dom';
import Return from "./../common/Return"


export const Plans = () => {

    return (
        <div className="container">
            <div className="container__title">
                <Return />
                <h2>Plans</h2>
                <NavLink
                    exact
                    to="/add-plan"
                    activeClassName="active"
                >
                    <Icon name={"plus"} fill={"#5E4AE3"} />
                </NavLink>
            </div>

            <div className="users">
            </div>
        </div>
    );
}
