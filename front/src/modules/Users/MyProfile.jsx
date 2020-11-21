import React, { useState, useContext } from 'react';
import Icon from 'components/atoms/Icon';
import { useDispatch } from "react-redux";
import styled from 'styled-components';
import Return from 'components/atoms/Return';
import { TabContent, TabPane, Nav, NavItem, NavLink, } from 'reactstrap';
import classnames from 'classnames';
import Heading from 'components/atoms/Heading';
import "react-multi-carousel/lib/styles.css";
import { UserInfo } from "components/molecules/UserInfo"
import GlobalTemplate, { Nav as NavI } from "../../templates/GlobalTemplate"
import BackTopNav from 'components/molecules/BackTopNav';
import { translate } from 'utils/Translation';
import { useThemeContext } from 'support/context/ThemeContext';
import StyledReactBottomSheet, { PanelContainer, PanelItem, MobilePanelItem, StyledMobileReactBottomSheet, } from 'components/organisms/BottomSheet'

import EditUserPasswordModal from "./Edit/EditUserPassword"
import EditUserEmailModal from "./Edit/EditUserEmail";
import EditUserDataModal from "./Edit/EditUserData";

import { userContext } from 'App';

import { ClientsOfTrainer } from "./UserProfile/ClientOfTrainer"
import { PlansOfTrainer } from "./UserProfile/PlansOfTrainer"
import { PlansOfUser } from "./UserProfile/PlansOfUser"
import { TrainersOfClient } from "./UserProfile/TrainersOfClient"

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

const UserEdit = "Edit Your Data";
const ChangeMail = "Change Email";
const ChangePassword = "Change Paassword";
const Logout = "Logout";

export const MyProfile = (props) => {

    const { user } = useContext(userContext);
    const { theme } = useThemeContext();

    const closeModal = () => {
        setOpenModal(false)
      }

    const [bottomSheet, setBottomSheet] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);
    const [openEditUserData, setOpenEditUserData] = useState(false)
    const [openEditMailModal, setOpenEditMailModal] = useState(false);
    const [openEditUserPasswordModal, setOpenEditUserPasswordModal] = useState(false);

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
                <Navs user={user} />
                <EditUserDataModal id={user.id} openModal={openEditUserData} onClose={() => setOpenEditUserData(false)} />
                <EditUserEmailModal id={user.id} openModal={openEditMailModal} onClose={() => setOpenEditMailModal(false)} />
                <EditUserPasswordModal id={user.id} openModal={openEditUserPasswordModal} onClose={() => setOpenEditUserPasswordModal(false)} />
            </GlobalTemplate>
            <MyProfilePanel theme={theme} openModal={openModal} onClose={closeModal} />
        </>
    );
}

export const MyProfilePanel = (props) => {

    const { user } = useContext(userContext);

    const [bottomSheet, setBottomSheet] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch();

    const [openEditUserData, setOpenEditUserData] = useState(false)
    const [openEditMailModal, setOpenEditMailModal] = useState(false);
    const [openEditUserPasswordModal, setOpenEditUserPasswordModal] = useState(false);

    const logout = () =>{
        
    }

    return (
        <StyledReactBottomSheet
            visible={bottomSheet}
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

const Navs = ({ user }) => {

    const [activeTab, setActiveTab] = useState('1');
    const myPlans = "Plans";
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div className="user-container__tabs">
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        <h2>{myPlans}</h2>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        {user.role === "Trainer"
                            ? <h2>My Clients</h2>
                            : <h2>My Trainers</h2>
                        }
                    </NavLink>
                </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    {user.role === "Trainer"
                        ? <h1><PlansOfTrainer id={user.userId} /></h1>
                        : <h1><PlansOfUser id={user.userId} /></h1>
                    }
                </TabPane>
                <TabPane tabId="2">
                    {user.role === "Trainer"
                        ? <h1><ClientsOfTrainer id={user.userId} /></h1>
                        : <h1><TrainersOfClient id={user.userId} /></h1>
                    }
                </TabPane>
            </TabContent>
        </div>
    )
}

export default MyProfile;