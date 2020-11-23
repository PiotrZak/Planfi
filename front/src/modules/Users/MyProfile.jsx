import React, { useState, useContext } from 'react';
import Icon from 'components/atoms/Icon';
import styled from 'styled-components';
import { TabContent, TabPane, Nav, NavItem, NavLink, } from 'reactstrap';
import classnames from 'classnames';
import Heading from 'components/atoms/Heading';
import "react-multi-carousel/lib/styles.css";
import { UserInfo } from "components/molecules/UserInfo"
import GlobalTemplate, { Nav as NavI } from "../../templates/GlobalTemplate"
import BackTopNav from 'components/molecules/BackTopNav';
import { translate } from 'utils/Translation';
import { useThemeContext } from 'support/context/ThemeContext';
import { useUserContext } from "../../support/context/UserContext"
import StyledReactBottomSheet, { PanelContainer, PanelItem, MobilePanelItem, StyledMobileReactBottomSheet, } from 'components/organisms/BottomSheet'

// import EditUserPasswordModal from "./Edit/old parts/EditUserPassword"
// import EditUserEmailModal from "./Edit/old parts/EditUserEmail";
// import EditUserDataModal from "./Edit/old parts/EditUserData";

import { TrainerClients } from "./UserProfile/TrainerClients"
import { TrainerPlans } from "./UserProfile/TrainerPlans"
import { UserPlans } from "./UserProfile/UserPlans"
import { ClientTrainers } from "./UserProfile/ClientTrainers"

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

const TabsContainer = styled.div`
    display:flex;
    text-align:center;
`;

const Tab = styled.div`
    font-size:24px;
    display:flex;
    width:100%;
`;

const myPlans = "Plans";
const UserEdit = "Edit Your Data";
const ChangeMail = "Change Email";
const ChangePassword = "Change Paassword";
const Logout = "Logout";

export const MyProfile = (props) => {

    const { user } = useUserContext();
    const { theme } = useThemeContext();

    const closeModal = () => {
        setOpenModal(false)
    }

    let sections = ['TrainerClients', 'TrainerPlans', 'UserPlans', 'ClientTrainers']

    const [activeItem, setActiveItem] = useState('TrainerClients');

    console.log(activeItem)

    const [bottomSheet, setBottomSheet] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <GlobalTemplate>
                <NavI>
                    <BackTopNav />
                    <Heading>{translate('CategoriesTitle')}</Heading>
                    <IconWrapper>
                        <Icon onClick={() => setBottomSheet(true)} name="plus" fill={theme.colorInputActive} />
                    </IconWrapper>
                </NavI>
                {user && <UserInfo user={user} />}

                {sections.map((title, i) => (
                    <Navs
                        title={title}
                        setActiveItem={setActiveItem}
                        activeItem={activeItem}
                    />
                ))}
                {user.role === "Trainer"}
                {activeItem == 'TrainerClients' && <TrainerClients id={user.userId} />}
                {activeItem == 'TrainerPlans' && <TrainerPlans id={user.userId} />}
                {activeItem == 'UserPlans' && <UserPlans id={user.userId} />}
                {activeItem == 'ClientTrainers' && <ClientTrainers id={user.userId} />}

                {/* <Navs user={user} /> */}
                {/* Modals */}
                {/* <EditUserDataModal id={user.id} openModal={openEditUserData} onClose={() => setOpenEditUserData(false)} />
                <EditUserEmailModal id={user.id} openModal={openEditMailModal} onClose={() => setOpenEditMailModal(false)} />
                <EditUserPasswordModal id={user.id} openModal={openEditUserPasswordModal} onClose={() => setOpenEditUserPasswordModal(false)} /> */}
            </GlobalTemplate>
            <MyProfilePanel theme={theme} openModal={openModal} onClose={closeModal} />
        </>
    );
}

const Navs = ({ setActiveItem, activeItem, title }) => {
    const changeTab = (title) => {
        setActiveItem(title);
    };
    return (
        <TabsContainer onClick={() => changeTab(title)}>
        <Tab>
            {title}
        </Tab>
        </TabsContainer>
    );
};

export const MyProfilePanel = (props) => {

    const { user } = useUserContext();

    const [bottomSheet, setBottomSheet] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const [openEditUserData, setOpenEditUserData] = useState(false)
    const [openEditMailModal, setOpenEditMailModal] = useState(false);
    const [openEditUserPasswordModal, setOpenEditUserPasswordModal] = useState(false);

    const logout = () => {

    }
    return (
        <StyledReactBottomSheet
            showBlockLayer={false}
            visible={bottomSheet}
            className={""}
            appendCancelBtn={false}
            onClose={() => setBottomSheet(false)}>
            <PanelItem onClick={() => setOpenEditUserData(true)}>
                {translate('UserEdit')}
            </PanelItem>
            <PanelItem onClick={() => setOpenEditMailModal(true)}>
                {translate('ChangeMail')}
            </PanelItem>
            <PanelItem onClick={() => setOpenEditUserPasswordModal(true)}>
                {translate('ChangePassword')}
            </PanelItem>
            <PanelItem onClick={() => logout()}>
                {translate('Logout')}
            </PanelItem>
        </StyledReactBottomSheet>
    );
}


export default MyProfile;