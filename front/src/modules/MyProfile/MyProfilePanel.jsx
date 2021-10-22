import React, {useRef} from 'react';
import 'react-multi-carousel/lib/styles.css';
import { isMobile } from "react-device-detect";
import { translate } from 'utils/Translation';
import StyledReactBottomSheet, { PanelContainer, PanelItem } from 'components/organisms/BottomSheet';
import { useHistory } from 'react-router-dom';
import { accountService } from 'services/accountServices';
import styled from "styled-components";
import {
  useNotificationContext,
  ADD,
} from "support/context/NotificationContext";
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

const timeToRedirectLogin = 1000;
const FileUploadButton = styled.input.attrs({ type: "file" })`
  display: none;
`;

export const MyProfilePanel = ({
  toggleTheme,
  toggleLanguage,
  userId,
  setOpenEditUserData,
  setOpenEditMailModal,
  setOpenEditUserPasswordModal,
  bottomSheet,
  setBottomSheet,
}) => {
  const history = useHistory();
  const { notificationDispatch } = useNotificationContext();

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

  const uploadAvatar = (selectedFiles) => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('avatar', selectedFiles);

    accountService
      .uploadAvatar(formData)
      .then(() => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: "OK", message: translate('AvatarChanged') },
            type: "positive",
          },
        });
        setBottomSheet('none');
      })
      .catch((error) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { error: error, message: translate("AlertError") },
            type: "error",
          },
        });
        setBottomSheet('none');
      });
  };

  const fileNotification = (message) => {
    notificationDispatch({
      type: ADD,
      payload: {
        content: { success: "OK", message },
        type: "error",
      },
    });
  };

  const triggerFileUploadButton = () => {
    document.getElementById("choose-file-button").click();
  };

  const handleImageChange = (e) => {
    const acceptedImageFileType = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
    ];
    // 10 mb
    const maxPhotoSize = 10000000;
    if (e.target.files) {
      Array.from(e.target.files).map((File) => {
        const fileType = File.type;
        const fileSize = File.size;

        // checking if the photo file type is correct
        if (acceptedImageFileType.includes(fileType)) {
          // checking photo file size
          if (fileSize <= maxPhotoSize) {
            uploadAvatar(File)
          } else {
            // file size if too big alert
            fileNotification(
              `File size is too big ${File.name}. Photo size limit is 10 MB`
            );
          }
        } else {
          // invalid file type alert
          fileNotification(
            "Invalid file type. allowed files mp4, jpeg, jpg, png, gif"
          );
        }
      });
    }
  };

  const ref = (useRef(null));
 useOnClickOutside(ref, () => setBottomSheet('none'));

  return (
    <div ref ={ref}>
    <StyledReactBottomSheet
      showBlockLayer={true}
      visible={bottomSheet}
      className=""
      onClose={() => setBottomSheet('none')}
      appendCancelBtn={false}
    >
      {isMobile ? (
        <>
          <PanelItem onClick={() => openEditUserData()}>
            {translate('ChangeUserData')}
          </PanelItem>
          <PanelItem onClick={() => openEditMailModal()}>
            {translate('ChangeMail')}
          </PanelItem>
          <PanelItem onClick={() => openEditUserPasswordModal()}>
            {translate('ChangePassword')}
          </PanelItem>
          <PanelItem onClick={() => triggerFileUploadButton()}>
              <FileUploadButton
                id="choose-file-button"
                onChange={handleImageChange}
                multiple
              />
              {translate('UploadAvatar')}
            </PanelItem>
            <PanelItem onClick={() => toggleLanguage()}>
            {translate('ChangeLanguage')}
          </PanelItem>
          <PanelItem onClick={() => toggleTheme()}>
            {translate('ChangeTheme')}
          </PanelItem>
          <PanelItem onClick={() => logout()}>
            {translate('Logout')}
          </PanelItem>
        </>
      ) : (
          <PanelContainer >
          <PanelItem onClick={() => openEditUserData()}>
            {translate('ChangeUserData')}
          </PanelItem>
            <PanelItem onClick={() => openEditMailModal()}>
              {translate('ChangeMail')}
            </PanelItem>
            <PanelItem onClick={() => openEditUserPasswordModal()}>
              {translate('ChangePassword')}
            </PanelItem>
            <PanelItem onClick={() => triggerFileUploadButton()}>
              <FileUploadButton
                id="choose-file-button"
                onChange={handleImageChange}
                multiple
              />
              {translate('UploadAvatar')}
            </PanelItem>
            <PanelItem onClick={() => toggleLanguage()}>
            {translate('ChangeLanguage')}
          </PanelItem>
          <PanelItem onClick={() => toggleTheme()}>
            {translate('ChangeTheme')}
          </PanelItem>
            <PanelItem onClick={() => logout()}>
              {translate('Logout')}
            </PanelItem>
          </PanelContainer>
        )}
    </StyledReactBottomSheet>
    </div>
  );
};
