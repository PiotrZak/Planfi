import React, { useEffect, useState } from 'react';
import { userService } from 'services/userServices';
import styled from 'styled-components';
import Icon from 'components/atoms/Icon';
import { isMobile } from "react-device-detect";
import EditRoleModal from "./EditRoleModal";
import StyledReactBottomSheet, { PanelContainer, PanelItem, MobilePanelItem, StyledMobileReactBottomSheet, } from 'components/organisms/BottomSheet'

const deleteUserText = "Delete User"
const assignPlanText = "Assign Plan"
const assignToTrainerText = "Assign To Trainer"
const editUserRole = "Edit User Role"
const usersSelected = "Selected users"
const userDeleted = "User deleted"

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

export const UsersPanel = ({
    deleteUser,
    theme,
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
                            {deleteUserText}
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
                    <PanelItem>
                        <IconWrapper>
                            <Icon name="check" fill={theme.colorInputActive}/>
                        </IconWrapper>
                        {activeUsers.length} {usersSelected}
                        </PanelItem>
                        <PanelItem onClick={() => deleteUser()} >
                        <Icon name="trash" fill={theme.colorInputActive} />
                        {deleteUserText}
                        </PanelItem>
                        <PanelItem onClick={() => openAssignPlansToUsers()}>
                            <IconWrapper>
                                <Icon name="clipboard-notes" fill={theme.colorInputActive} />
                            </IconWrapper>
                            {assignPlanText}
                        </PanelItem>
                        <PanelItem onClick={() => openAssignTrainersToUsers()}>
                            <IconWrapper>
                                <Icon name="user-circle" fill={theme.colorInputActive} />
                            </IconWrapper>
                            {assignToTrainerText}
                        </PanelItem>
                        {activeUsers.length < 2 &&
                            <PanelItem>
                                <IconWrapper>
                                    <Icon name="edit" fill={theme.colorInputActive} />
                                </IconWrapper>
                                {editUserRole}
                            </PanelItem>
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