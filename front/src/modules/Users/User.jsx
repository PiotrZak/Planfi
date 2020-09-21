import React, { useState, useEffect, useContext } from 'react';
import { userService } from "services/userServices";
import Icon from "common/Icon"
import { useDispatch } from "react-redux";
import Return from "common/Return"
import { TabContent, TabPane, Nav, NavItem, NavLink, } from 'reactstrap';
import classnames from 'classnames';
import "react-multi-carousel/lib/styles.css";
import { UserInfo } from "common/users/UserInfo"

import EditUserPasswordModal from "./Edit/EditUserPassword"
import EditUserEmailModal from "./Edit/EditUserEmail";
import EditUserDataModal from "./Edit/EditUserData";
import { alertActions } from "redux/actions/alert.actions";

import { ClientsOfTrainer } from "./microModules/ClientOfTrainer"
import { PlansOfTrainer } from "./microModules/PlansOfTrainer"
import { PlansOfUser } from "./microModules/PlansOfUser"
import { TrainersOfClient } from "./microModules/TrainersOfClient"

var ReactBottomsheet = require('react-bottomsheet');

const userEdit = "Edit Your Data";
const changeMail = "Change Email";
const changePassword = "Change Paassword";
const logout = "Logout";

export const User = (props) => {

    const [bottomSheet, setBottomSheet] = useState(false)
    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch();

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
                dispatch(alertActions.error(error.title));
            });
    }

    const [openEditUserData, setOpenEditUserData] = useState(false)
    const [openEditMailModal, setOpenEditMailModal] = useState(false);
    const [openEditUserPasswordModal, setOpenEditUserPasswordModal] = useState(false);

    return (
        <div className="user-container">
            <div className="container">

                <div className="user-container__container__title">
                    <Return fill={"white"} />
                    <div onClick={() => setBottomSheet(true)}><Icon name={"plus"} fill={"white"} /></div>
                </div>

                {user && <UserInfo user={user} />}

                <Navs user = {user} />

                <EditUserDataModal id={id.id} openModal={openEditUserData} onClose={() => setOpenEditUserData(false)} />
                <EditUserEmailModal id={id.id} openModal={openEditMailModal} onClose={() => setOpenEditMailModal(false)} />
                <EditUserPasswordModal id={id.id} openModal={openEditUserPasswordModal} onClose={() => setOpenEditUserPasswordModal(false)} />

                <ReactBottomsheet
                    visible={bottomSheet}
                    onClose={() => setBottomSheet(false)}>
                    <button onClick={() => setOpenEditUserData(true)} className='bottom-sheet-item'>{userEdit}</button>
                    <button onClick={() => setOpenEditMailModal(true)} className='bottom-sheet-item'>{changeMail}</button>
                    <button onClick={() => setOpenEditUserPasswordModal(true)} className='bottom-sheet-item'>{changePassword}</button>
                    <button className='bottom-sheet-item'>{logout}</button>
                </ReactBottomsheet>
            </div>
        </div>
    );
}

const Navs = ({ user }) => {

    const [activeTab, setActiveTab] = useState('1');
    const myPlans = "Plans";
    const myTrainers = "Trainers";

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    console.log(user.userId)

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
                            ? <h2>Clients</h2>
                            : <h2>Trainers</h2>
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



export default User;