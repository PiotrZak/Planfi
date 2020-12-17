import React, { useEffect, useState } from 'react';
import { userService } from 'services/userServices';
import styled from 'styled-components';
import Icon from 'components/atoms/Icon';
import { isMobile } from "react-device-detect";
import EditRoleModal from "./EditRoleModal";
import StyledReactBottomSheet, { PanelContainer, PanelItem, MobilePanelItem, StyledMobileReactBottomSheet, } from 'components/organisms/BottomSheet'

const deleteUser = "Delete User"
const assignPlanText = "Assign Plan"
const assignToTrainerText = "Assign To Trainer"
const editUserRole = "Edit User Role"
const usersSelected = "Selected users"
const userDeleted = "User deleted"

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

export const UsersPanel = ({
    bottomSheet,
    setBottomSheet,
    activeUsers,
    setAssignPlan,
    setAssignTrainer
}) => {

    const [openEditRoleModal, setOpenEditRoleModal] = useState(false)

    useEffect(() => {
        if (activeUsers == 0) {
            setBottomSheet('none')
        }
    }, [activeUsers]);

    const deleteUser = () => {
        userService
            .deleteUsers(activeUsers)
            .then((data) => {

            })
            .catch((error) => {
            });
    };

    const openAssignPlansToUsers = () => {
        setAssignPlan("flex");
        setBottomSheet("none");
    };

    const openAssignTrainersToUsers = () => {
        setAssignTrainer("flex");
        setBottomSheet("none");
    };

    const openEditModal = () => {
        setOpenEditRoleModal(true)
    }

    return (
        <StyledReactBottomSheet
            showBlockLayer={false}
            visible={bottomSheet}
            className={""}
            onClose={() => setBottomSheet(false)}
            appendCancelBtn={false}
        >
            {isMobile ?
                <>
                    <StyledMobileReactBottomSheet>
                        <PanelItem onClick={() => deleteUser()}>
                            {deleteUser}
                        </PanelItem>
                        <PanelItem onClick={() => openAssignPlansToUsers()}>
                            {assignPlanText}
                        </PanelItem>
                        <PanelItem onClick={() => openAssignTrainersToUsers()}>
                            {assignToTrainerText}
                        </PanelItem>
                    </StyledMobileReactBottomSheet>
                </>
                :
                <>
                    <PanelContainer>
                        <IconWrapper>
                            <Icon name="check" fill="#2E6D2C" />
                        </IconWrapper>
                        <p>{activeUsers.length} {usersSelected}</p>
                        <PanelItem onClick={() => deleteUser()} >
                        <Icon height={"18px"} name="trash" fill="#C3C3CF" />
                        {deleteUser}
                        </PanelItem>
                        <PanelItem onClick={() => openAssignPlansToUsers()}>
                            <IconWrapper>
                                <Icon height={"18px"} name="clipboard-notes" fill="#C3C3CF" />
                            </IconWrapper>
                            {assignPlanText}
                        </PanelItem>
                        <PanelItem onClick={() => openAssignTrainersToUsers()}>
                            <IconWrapper>
                                <Icon height={"18px"} name="user-circle" fill="#C3C3CF" />
                            </IconWrapper>
                            {assignToTrainerText}
                        </PanelItem>
                        {activeUsers.length < 2 &&
                            <div onClick={() => openEditModal()} className='bottom-sheet-item__content'>
                                <IconWrapper>
                                    <Icon height={"18px"} name="edit" fill="#C3C3CF" />
                                </IconWrapper>
                                {editUserRole}
                            </div>
                        }
                        <EditRoleModal
                            id={activeUsers}
                            openModal={openEditRoleModal}
                            onClose={() => setOpenEditRoleModal(false)}
                        />
                    </PanelContainer>
                </>
            }
        </StyledReactBottomSheet>
    )
}

export default UsersPanel;