import React, { useState, useContext, useEffect } from 'react';
import Icon from 'components/atoms/Icon';
import styled from 'styled-components';
import "react-multi-carousel/lib/styles.css";
import { UserInfo } from "components/molecules/UserInfo"
import GlobalTemplate, { Nav as NavI } from "../../templates/GlobalTemplate"
import BackTopNav from 'components/molecules/BackTopNav';
import { translate } from 'utils/Translation';
import { useThemeContext } from 'support/context/ThemeContext';
import { useUserContext } from "../../support/context/UserContext"
import StyledReactBottomSheet, { PanelContainer, PanelItem, MobilePanelItem, StyledMobileReactBottomSheet, } from 'components/organisms/BottomSheet'
import { TrainerClients } from "../Users/UserProfile/TrainerClients"
import { TrainerPlans } from "../Users/UserProfile/TrainerPlans"
import { UserPlans } from "../Users/UserProfile/UserPlans"
import { ClientTrainers } from "../Users/UserProfile/ClientTrainers"
import { useHistory } from 'react-router-dom';
import { userService } from 'services/userServices'
import SmallButton from 'components/atoms/SmallButton';
import { MyProfilePanel } from './MyProfilePanel';

import EditUserPasswordModal from "./EditProfile/EditUserPassword";
import EditUserEmailModal from "./EditProfile/EditUserEmail";
import EditUserDataModal from "./EditProfile/EditUserData";

// import { EditUserPassword } from "./EditProfile/EditUserData"

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

const myPlans = "Plans";
const UserEdit = "Edit Your Data";
const ChangeMail = "Change Email";
const ChangePassword = "Change Paassword";
const Logout = "Logout";

export const MyProfile = ({ toggleTheme, toggleLanguage }) => {

    const { user } = useUserContext();
    const { theme } = useThemeContext();
    const [updatedUser, setUpdatedUser] = useState(user);

    let sections = [];

    useEffect(() => {
        setUpdatedUser(user)
        getUserById()
    }, []);

    const getUserById = () => {
        userService
            .getUserById(user.userId)
            .then((data) => {
                setUpdatedUser(data)
            })
            .catch((error) => {
            });
    }

    if (user) {
        if (user.role === "Trainer") {
            sections = ['Trainer Clients', 'Trainer Plans']
        }
        else {
            sections = ['User Plans', 'Client Trainers']
        }
    }

    const [activeItem, setActiveItem] = useState('TrainerClients');

    const [bottomSheet, setBottomSheet] = useState('none')
    const [isLoading, setIsLoading] = useState(true)

    const [openEditUserData, setOpenEditUserData] = useState(false)
    const [openEditMailModal, setOpenEditMailModal] = useState(false);
    const [openEditUserPasswordModal, setOpenEditUserPasswordModal] = useState(false);

    return (
        <>
            <GlobalTemplate>
                <NavI>
                    <BackTopNav />
                    <SmallButton iconName="plus" onClick={() => setBottomSheet('flex')} />
                </NavI>
                {user && <UserInfo user={updatedUser} />}
                <ThemeSelector toggleTheme={toggleTheme} />
                <LanguageSelector toggleLanguage={toggleLanguage} />
                <TabsContainer>
                    {sections.map((title, i) => (
                        <Navs
                            title={title}
                            setActiveItem={setActiveItem}
                            activeItem={activeItem}
                        />
                    ))}
                </TabsContainer>
                {user && user.role === "Trainer"
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

                <EditUserDataModal
                    id={user.userId}
                    openModal={openEditUserData}
                    onClose={() => setOpenEditUserData(false)} />
                <EditUserEmailModal
                    id={user.userId}
                    openModal={openEditMailModal}
                    onClose={() => setOpenEditMailModal(false)} />
                <EditUserPasswordModal
                    id={user.userId}
                    openModal={openEditUserPasswordModal}
                    onClose={() => setOpenEditUserPasswordModal(false)} />
            </GlobalTemplate>
            <MyProfilePanel
                setOpenEditUserData={setOpenEditUserData}
                setOpenEditMailModal={setOpenEditMailModal}
                setOpenEditUserPasswordModal={setOpenEditUserPasswordModal}
                theme={theme}
                bottomSheet={bottomSheet}
                setBottomSheet={setBottomSheet}
            />
        </>
    );
}

const TabsContainer = styled.div`
    display:flex;
    width:100%;
    margin:3.2rem 0 0 0;
    text-align:center;
`;

const Tab = styled.div`
    font-size:24px;
    display:flex;
    width:100%;
    text-align:center;
    justify-content: center;
    margin-bottom:0.2rem;
    border-bottom: .2rem solid ${({ theme }) => theme.colorGray70} !important;
    &:hover {
      color: ${({ theme }) => theme.colorInputActive} !important;
      cursor:pointer;
      transition:0.6s;
      border-bottom: .2rem solid ${({ theme }) => theme.colorInputActive} !important;
    }
`;

export const Navs = ({ setActiveItem, activeItem, title }) => {
    const changeTab = (title) => {
        setActiveItem(title);
    };
    return (
        <Tab onClick={() => changeTab(title)}>{title}</Tab>
    );
};




const LanguageSelector = ({ toggleLanguage }) => {

    // add selected lang to local storage

    const setPL = () => {
        localStorage.setItem('language', 'pl-PL');
    }

    const setEN = () => {
        localStorage.setItem('language', 'en-GB');
    }

    return (
        <>
            <div onClick={() => setPL()} className="lang-switcher">set PL</div>
            <div onClick={() => setEN()} className="lang-switcher">set ENG</div>
        </>
    )
}

const ThemeSelector = ({ toggleTheme }) => {

    return (
        <div>
            <div className="theme-switcher" onClick={() => toggleTheme()}>
                set theme</div>
        </div>
    )
}


export default MyProfile;