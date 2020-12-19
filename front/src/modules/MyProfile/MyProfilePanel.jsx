import React, { useState } from 'react';
import "react-multi-carousel/lib/styles.css";
import { translate } from 'utils/Translation';
import { useUserContext } from "../../support/context/UserContext"
import StyledReactBottomSheet, { PanelContainer, PanelItem} from 'components/organisms/BottomSheet'
import { useHistory } from 'react-router-dom';

const timeToRedirectLogin = 3000;

export const MyProfilePanel = ({
    bottomSheet,
    setBottomSheet,
}) => {

    const { user } = useUserContext();
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(true)

    const [openEditUserData, setOpenEditUserData] = useState(false)
    const [openEditMailModal, setOpenEditMailModal] = useState(false);
    const [openEditUserPasswordModal, setOpenEditUserPasswordModal] = useState(false);

    const logout = () => {
        localStorage.removeItem('user');
        setTimeout(() => {
            history.push(`/login/`);
        }, timeToRedirectLogin);
    }
    return (
        <StyledReactBottomSheet
            showBlockLayer={false}
            visible={bottomSheet}
            className={""}
            onClose={() => setBottomSheet(false)}
            appendCancelBtn={false}>
            <PanelContainer>
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
            </PanelContainer>
        </StyledReactBottomSheet>
    );
}