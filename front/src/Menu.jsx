import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import Icon from "../src/common/Icon"
import Spacer from "../src/common/Spacer"


const Menu = () => {
    return (
        <div className="navigation">
            <div className="navigation__menu">
                <NavLink
                    exact
                    to="/exercises"
                    activeClassName="active"
                >
                    {/* <Icon iconName="dumbbell" fill="#666674" /> */}
                    <div className="navigation__menu__icon"><Icon name="dumbbell" fill="white" /></div>
                </NavLink>
                <Spacer h={20} />
                <NavLink
                    to="/plans"
                    activeClassName="active"
                >
                    <div className="navigation__menu__icon"><Icon name="clipboard-notes" fill="white" /></div>
                </NavLink>
                <NavLink
                    to="/users"
                    activeClassName="active"
                >
                    <div className="navigation__menu__icon"><Icon name="user" fill="white" /></div>
                </NavLink>
            </div>
        </div>
    );
}

export default withRouter(Menu);