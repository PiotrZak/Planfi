import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { translate } from 'utils/Translation';
import Icon from 'components/atoms/Icon';
import { isMobile } from "react-device-detect";
import EditRoleModal from "./EditRoleModal";
import StyledReactBottomSheet, { StyledReactBottomSheetExtended, PanelContainer, PanelItem, StyledMobileReactBottomSheet, } from 'components/organisms/BottomSheet'

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
                    <PanelItem onClick={() => deleteUser()}>
                        {translate('DeleteUserText')}
                    </PanelItem>
                    <PanelItem onClick={() => openAssignPlansToUsers()}>
                        {translate('AssignPlanText')}
                    </PanelItem>
                    <PanelItem onClick={() => openAssignTrainersToUsers()}>
                        {translate('AssignToTrainerText')}
                    </PanelItem>
                </>
                :
                <>
                    <PanelContainer>
                        <PanelItem>
                            <IconWrapper>
                                <Icon name="check" fill={theme.colorInputActive} />
                            </IconWrapper>
                            {activeUsers.length}
                            {translate('UsersSelected')}
                        </PanelItem>
                        <PanelItem onClick={() => deleteUser()} >
                            <Icon name="trash" fill={theme.colorInputActive} />
                            {translate('DeleteUserText')}
                        </PanelItem>
                        <PanelItem onClick={() => openAssignPlansToUsers()}>
                            <IconWrapper>
                                <Icon name="clipboard-notes" fill={theme.colorInputActive} />
                            </IconWrapper>
                            {translate('AssignPlanText')}
                        </PanelItem>
                        <PanelItem onClick={() => openAssignTrainersToUsers()}>
                            <IconWrapper>
                                <Icon name="user-circle" fill={theme.colorInputActive} />
                            </IconWrapper>
                            {translate('AssignToTrainerText')}
                        </PanelItem>
                        {activeUsers.length < 2 &&
                            <PanelItem>
                                <IconWrapper>
                                    <Icon name="edit" fill={theme.colorInputActive} />
                                </IconWrapper>
                                {translate('EditUserRole')}
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