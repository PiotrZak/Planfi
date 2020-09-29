import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import Icon from "../src/common/Icon"
import Spacer from "../src/common/Spacer"
import { userContext, LanguageContext } from './App';

const currentUser = JSON.parse((localStorage.getItem('user')));

const getUsersRoute = () => {
    if (currentUser.role == "Admin") {
        return "/users"
    }
    if (currentUser.role == "Owner") {
        return "/organizationusers"
    }
    if (currentUser.role == "Trainer") {
        return "/organizationclients"
    }
    if (currentUser.role == "User") {
        return "/organizationclients"
    }
}

const routes = {
    categories: "/categories",
    plans: "/plans",
    myProfile: "/myprofile"
}

const Menu = () => {

    const [currentUrl, setCurrentUrl] = useState()
    const { lang } = useContext(LanguageContext)
    const { user } = useContext(userContext)

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
                    to={getUsersRoute()}
                    activeClassName="active"
                >
                    <div className="navigation__menu__icon"><Icon name="list-ul" fill={currentUrl === "/organizationusers".substring(1) ? "white" : "#666674"} width={"28px"} /></div>
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
                    to={`${routes.myProfile}/${user.userId}`}
                    activeClassName="active"
                >
                    <div className="navigation__menu__icon"><Icon name="user-circle" fill={currentUrl === routes.myProfile.substring(1) ? "white" : "#666674"} width={"28px"} /></div>
                </NavLink>
            </div>
        </div>
    );
}

export default withRouter(Menu);