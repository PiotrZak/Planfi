import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import Icon from "../src/common/Icon"
import Spacer from "../src/common/Spacer"

const routes = {
    categories: "/categories",
    plans: "/plans",
    users: "/users",
}

const Menu = () => {

    const [currentUrl, setCurrentUrl] = useState()

    useEffect(() => {
        const currentUrl = window.location.href.split('/')
        setCurrentUrl(currentUrl[3])
    }, [window.location.href]);


    return (
        <div className="navigation">
            <div className="navigation__menu">
                <NavLink
                    exact
                    to={routes.categories}
                    activeClassName="active"
                >
                    <div className="navigation__menu__icon"><Icon name="dumbbell" fill={currentUrl === routes.categories.substring(1) ? "white" : "#666674"} width={"28px"} /></div>
                </NavLink>
                <Spacer h={20} />
                <NavLink
                    to={routes.plans}
                    activeClassName="active"
                >
                    <div className="navigation__menu__icon"><Icon name="clipboard-notes" fill={currentUrl === routes.plans.substring(1) ? "white" : "#666674"} width={"28px"} /></div>
                </NavLink>
                <Spacer h={20} />
                <NavLink
                    to={routes.users}
                    activeClassName="active"
                >
                    <div className="navigation__menu__icon"><Icon name="user" fill={currentUrl === routes.users.substring(1) ? "white" : "#666674"} width={"28px"} /></div>
                </NavLink>
            </div>
        </div>
    );
}

export default withRouter(Menu);