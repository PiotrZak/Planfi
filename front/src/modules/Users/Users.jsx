import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userService } from "../../services/userServices";
import { alertActions } from "../../redux/actions/alert.actions";
import Return from "./../../common/Return"
import Button from "./../../common/GenericElement/GenericElement"
import { Loader } from "../../common/Loader"
import Icon from "./../../common/Icon"

import InviteUserModal from "./InviteUsersModal"

export const Users = () => {
    const [users, setUsers] = useState();
    const [isLoading, setIsLoading] = useState(true)
    const [openInviteUserModal, setOpenInviteUserModal] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        userService
            .allUsers()
            .then((data) => {
                setUsers(data);
                setIsLoading(false)
                // dispatch(alertActions.success("User succesfully loaded!"));
            })
            .catch((error) => {
                dispatch(alertActions.error(error.title));
            });
    }, []);

    const usersText = "Users";
    const trainers = "Trainers";
    const clients = "Clients";
    const organization = "Organization"

    const getRole = (role) => {
        userService
        .getUserByRole(role)
        .then((data) => {
            setUsers(data);
            setIsLoading(false)
        })
        .catch((error) => {
            dispatch(alertActions.error(error.title));
        });
    }

    return (
        <div className="container">
            <div className="container__title">
                <Return />
                <h2>{usersText}</h2>
                <div onClick={() => setOpenInviteUserModal(true)}><Icon name={"plus"} fill={"#5e4ae3"} /></div>
            </div>
            <div className="users">

            <div className ="users__filters">
                <p onClick ={() => getRole("Organization")}>{organization}</p>
                <p onClick ={() => getRole("Trainer")}>{trainers}</p>
                <p onClick = {() => getRole("User")}>{clients}</p>
            </div>

                <InviteUserModal openModal={openInviteUserModal} onClose={() => setOpenInviteUserModal(false)} />

                <Loader isLoading={isLoading}>
                    {users && users.map((user, i) => <Button circle={true} image={user.avatar} key={i} headline={`${user.firstName}  ${user.lastName}`} user={user} subline={user.role} />)}
                </Loader>
            </div>
        </div>
    );
};
