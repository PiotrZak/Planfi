import React, { useState, useEffect, useRef } from 'react';
import { userService } from "../../services/userServices";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Icon from "./../../common/Icon"
import Return from "./../../common/Return"
import { TabContent, TabPane, Nav, NavItem, NavLink, } from 'reactstrap';
import classnames from 'classnames';
import "react-multi-carousel/lib/styles.css";
import { alertActions } from './../../redux/actions/alert.actions'

import EditUserPasswordModal from "./Edit/EditUserPassword"
import EditUserEmailModal from "./Edit/EditUserEmail"
import EditUserDataModal from "./Edit/EditUserData"
import { accountService } from '../../services/accountServices';

var ReactBottomsheet = require('react-bottomsheet');

export const User = (props) => {

    const [user, setUser] = useState();
    const [exercises, setExercises] = useState()
    const [bottomSheet, setBottomSheet] = useState(false)

    const [openEditUserData, setOpenEditUserData] = useState(false)
    const [openEditMailModal, setOpenEditMailModal] = useState(false);
    const [openEditUserPasswordModal, setOpenEditUserPasswordModal] = useState(false);

    const history = useHistory();
    const { match } = props;
    let id = match.params;

    useEffect(() => {
        getUserData(id.id)
    }, [id.id]);


    const getUserData = (id) => {
        userService
            .getUserById(id)
            .then((data) => {
                setUser(data);
            })
            .catch((error) => {
            });
    }

    const userEdit = "Edit Your Data";
    const changeMail = "Change Email";
    const changePassword = "Change Paassword";
    const logout = "Logout";

    return (
        <div className="user-container">
            <div className="container">

                <div className="user-container__container__title">
                    <Return fill = {"white"} />
                    <div onClick={() => setBottomSheet(true)}><Icon name={"plus"} fill={"white"} /></div>
                </div>

                    {user && <UserInfo user={user} />}

                <Navs />

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

const UserInfo = ({ user }) => {

    return (
        <div className="user-container__info">
            {user &&
                <div>
                    <Avatar avatar={user.avatar} id={user.userId} />
                    <h2>{user.firstName} {user.lastName}</h2>
                    <p>{user.role}</p>
                    <p>{user.phoneNumber}</p>
                    <p>{user.email}</p>
                </div>
            }
        </div>
    );
}

const addedAvatar = "Avatar succesfully added!";

const Avatar = ({ avatar, id }) => {

    const dispatch = useDispatch()

    const [hover, setHover] = useState(false);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [unsupportedFiles, setUnsupportedFiles] = useState([]);

    const fileInputRef = useRef();

    const fileInputClicked = () => {
        fileInputRef.current.click();
    }

    const handleFileData = (data) => {
        const formData = new FormData();
        formData.append("userId", id)
        formData.append("avatar", data[0])

        accountService
            .uploadAvatar(formData)
            .then((data) => {
                dispatch(alertActions.success(addedAvatar))
            })
            .catch((error) => {
            });

    }

    const fileDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
        }
    }

    const filesSelected = () => {
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
    }

    const handleFiles = (files) => {
        for (let i = 0; i < files.length; i++) {
            if (validateFile(files[i])) {
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
            } else {
                files[i]['invalid'] = true;
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
                setErrorMessage('File type not permitted');
                setUnsupportedFiles(prevArray => [...prevArray, files[i]]);
            }
        }
        handleFileData(files)
    }

    const validateFile = (file) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }
        return true;
    }

    return (
        <>
            {avatar ?
                <div onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={fileInputClicked}>
                    <img
                        className={`avatar ${
                            hover &&
                            ' avatar__imghover'
                            }`} src={`data:image/jpeg;base64,${avatar}`} />
                    <input
                        ref={fileInputRef}
                        className="file-input"
                        type="file"
                        multiple
                        onChange={filesSelected}
                    />
                    {hover && <p>Change Avatar</p>}
                </div>
                :
                <div
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onDrop={fileDrop}
                    onClick={fileInputClicked}
                    className={`avatar ${
                        hover &&
                        ' avatar__hover'
                        }`}>
                    <input
                        ref={fileInputRef}
                        className="file-input"
                        type="file"
                        multiple
                        onChange={filesSelected}
                    />
                    {hover && <p><Icon name={"plus"} fill={"white"} />Add Avatar</p>}
                </div>
            }
        </>
    );
}


const Navs = () => {

    const [activeTab, setActiveTab] = useState('1');
    const myPlans = "Plans";
    const myTrainers = "Trainers";

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
                        <h2>{myTrainers}</h2>
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>

                <TabPane tabId="1">
                    <h1>My Plans</h1>
                </TabPane>

                <TabPane tabId="2">
                    <h1>My Trainers</h1>
                </TabPane>
            </TabContent>
        </div>
    )
}



export default User;