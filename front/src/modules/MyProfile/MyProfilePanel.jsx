import React, { useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
import { isMobile } from "react-device-detect";
import { translate } from 'utils/Translation';
import { useUserContext } from 'support/context/UserContext';
import StyledReactBottomSheet, { PanelContainer, PanelItem } from 'components/organisms/BottomSheet';
import { useHistory } from 'react-router-dom';

const timeToRedirectLogin = 3000;

export const MyProfilePanel = ({
  setOpenEditUserData,
  setOpenEditMailModal,
  setOpenEditUserPasswordModal,
  bottomSheet,
  setBottomSheet,
}) => {
  const { user } = useUserContext();
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('user');
    setTimeout(() => {
      history.push('/login/');
    }, timeToRedirectLogin);
  };

  const openEditUserData = () => {
    setOpenEditUserData(true);
    setBottomSheet('none');
  }

  const openEditMailModal = () => {
    setOpenEditMailModal(true);
    setBottomSheet('none');
  }

  const openEditUserPasswordModal = () => {
    setOpenEditUserPasswordModal(true);
    setBottomSheet('none');
  }


  return (
    <StyledReactBottomSheet
      showBlockLayer={false}
      visible={bottomSheet}
      className=""
      onClose={() => setBottomSheet('none')}
      appendCancelBtn={false}
    >
      {isMobile ? (
        <>
          <PanelItem onClick={() => openEditUserData()}>
            {translate('UserEdit')}
          </PanelItem>
          <PanelItem onClick={() => openEditMailModal()}>
            {translate('ChangeMail')}
          </PanelItem>
          <PanelItem onClick={() => openEditUserPasswordModal()}>
            {translate('ChangePassword')}
          </PanelItem>
          <PanelItem onClick={() => logout()}>
            {translate('Logout')}
          </PanelItem>
        </>
      ) : (
          <PanelContainer >
            <PanelItem onClick={() => openEditUserData()}>
              {translate('UserEdit')}
            </PanelItem>
            <PanelItem onClick={() => openEditMailModal()}>
              {translate('ChangeMail')}
            </PanelItem>
            <PanelItem onClick={() => openEditUserPasswordModal()}>
              {translate('ChangePassword')}
            </PanelItem>
            <PanelItem onClick={() => logout()}>
              {translate('Logout')}
            </PanelItem>
          </PanelContainer>
        )}
    </StyledReactBottomSheet>
    );
  };
