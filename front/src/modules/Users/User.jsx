import React, { useState, useEffect, useContext } from 'react';
import { userService } from "services/userServices";
import Icon from 'components/atoms/Icon';
import BackTopNav from 'components/molecules/BackTopNav';
import styled from 'styled-components';
import "react-multi-carousel/lib/styles.css";
import { UserInfo } from "components/molecules/UserInfo"
import { isMobile } from "react-device-detect";
import GlobalTemplate, { Nav as NavI } from "../../templates/GlobalTemplate"
import { useThemeContext } from 'support/context/ThemeContext';
import { Navs } from '../MyProfile/MyProfile';

import { TrainerClients } from "./UserProfile/TrainerClients"
import { TrainerPlans } from "./UserProfile/TrainerPlans"
import { UserPlans } from "./UserProfile/UserPlans"
import { ClientTrainers } from "./UserProfile/ClientTrainers"

const IconWrapper = styled.div`
    margin-top: .4rem;
`;


const TabsContainer = styled.div`
    display:flex;
    width:100%;
    margin:3.2rem 0 0 0;
    text-align:center;
`;

var ReactBottomsheet = require('react-bottomsheet');

const assignTrainerToUserNotification = "";
const assignPlanText = "";
const assignToTrainerText = "";
const assignToMe = "";

export const User = (props) => {

    const { theme } = useThemeContext();
    const currentUser = JSON.parse((localStorage.getItem('user')));
    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [activeItem, setActiveItem] = useState('TrainerClients');
    useEffect(() => {
        getUserById()
    }, []);

    const { match } = props;
    let id = match.params;

    const getUserById = () => {
        userService
            .getUserById(id.id)
            .then((data) => {
                setUser(data);
                setIsLoading(false)
            })
            .catch((error) => {
            });
    }

    let sections = [];

    if (user.role === "Trainer") {
        sections = ['Trainer Clients', 'Trainer Plans']
    }
    else {
        sections = ['User Plans', 'Client Trainers']
    }

    return (
        <GlobalTemplate>
            <NavI>
                <BackTopNav />
            </NavI>
            {user && <UserInfo user={user} />}
            <TabsContainer>
                {sections.map((title, i) => (
                    <Navs
                        title={title}
                        setActiveItem={setActiveItem}
                        activeItem={activeItem}
                    />
                ))}
            </TabsContainer>
            {user.role === "Trainer"
                ?
                <>
                    {activeItem == 'Trainer Clients' && <TrainerClients id={user.userId} />}
                    {activeItem == 'Trainer Plans' && <TrainerPlans id={user.userId} />}
                </>
                :
                <>
                    {activeItem == 'User Plans' && <UserPlans id={user.userId} />}
                    {activeItem == 'Client Trainers' && <ClientTrainers id={user.userId} />}
                </>
            }
        </GlobalTemplate>
    );
}



export default User;