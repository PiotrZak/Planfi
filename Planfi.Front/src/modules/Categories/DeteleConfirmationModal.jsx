import React from 'react';
import { translate } from 'utils/Translation';
import Button from 'components/atoms/Button';
import { ModalHeading } from 'components/atoms/Heading';
import { StyledModal, ButtonContainer, IconContainer } from 'components/molecules/Modal'
import { useNotificationContext } from 'support/context/NotificationContext';
import Icon from 'components/atoms/Icon';
import { darkTheme } from 'theme/darkTheme';


const DeteleConfirmationModal = ({
  refreshData,
  openDeleteModal,
  onClose,
  deleteCategories,
  setOpenDeleteModal,
}) => {

  const onDelete = () => {
    deleteCategories();
    refreshData()
    setOpenDeleteModal(false);
    onClose()
  };

  return (
    <StyledModal
      isOpen={openDeleteModal}
      onBackgroundClick={onClose}
      onEscapeKeydown={onClose}
    >
      <ModalHeading>{translate('DeleteCategory')}</ModalHeading>
      <p>{translate('DeleteCategoryText')}</p>
      <IconContainer>
        <Icon fill ={darkTheme.colorGray80}name="union" size="1.2" cursorType="pointer" onClick={() =>setOpenDeleteModal(false)} />
      </IconContainer>
            <ButtonContainer>
              <Button onClick ={()=>onDelete()} buttonType="dangerous" size="lg">{translate('DeleteCategory')}</Button>
            </ButtonContainer>
    </StyledModal>
  );
};

export default DeteleConfirmationModal;
