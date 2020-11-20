import React from 'react';
import { categoryService } from 'services/categoryService';
import Icon from 'components/atoms/Icon';
import { isMobile } from "react-device-detect";
import styled from 'styled-components';
import { translate } from 'utils/Translation';
import StyledReactBottomSheet, { PanelContainer, PanelItem, MobilePanelItem, StyledMobileReactBottomSheet, } from 'components/organisms/BottomSheet'
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import EditCategoryModal from './EditCategoryModal';

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

const CategoriesPanel = ({
  openEditModal,
  setOpenEditModal,
  theme,
  bottomSheet,
  setBottomSheet,
  selectedCategories
}) => {

  const { notificationDispatch } = useNotificationContext();

  const deleteCategories = () => {
    categoryService
      .deleteCategories(selectedCategories)
      .then(() => {
        setBottomSheet('none')
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: 'OK', message: translate('CategoriesDeleted') },
            type: 'positive'
          }
        })
      })
      .catch((error) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { error: error, message: translate('ErrorAlert') },
            type: 'error'
          }
        })
      });
  };

  const closeModal = () => {
    setOpenEditModal(false)
    setBottomSheet('none')
  }

  const openModal = () => {
    setOpenEditModal(true)
    setBottomSheet('none')
  }

  return (
    <StyledReactBottomSheet
      showBlockLayer={false}
      visible={bottomSheet}
      className={""}
      onClose={() => setBottomSheet(false)}
      appendCancelBtn={false}>
      {isMobile ?
        <>
          <StyledMobileReactBottomSheet>
            <PanelItem onClick={() => deleteCategories()}>
              {selectedCategories.length == 1
                ? <p>{translate('DeleteCategory')}</p>
                : <p>{translate('DeleteCategory')}</p>
              }
            </PanelItem>
            {selectedCategories.length < 2 &&
            <PanelItem onClick={openModal}>
                <p>{translate('EditCategory')}</p>
            </PanelItem>
            }
          </StyledMobileReactBottomSheet>
        </>
        :
        <>
          <PanelContainer>
            <PanelItem>
              <IconWrapper>
                <Icon name="check" fill={theme.colorInputActive} />
              </IconWrapper>
              {selectedCategories.length} {translate('selected')}
            </PanelItem>
            <PanelItem onClick={() => deleteCategories()}>
              <Icon name="trash" fill={theme.colorInputActive} />{translate('DeleteCategory')}
            </PanelItem>
            {selectedCategories.length < 2 &&
              <PanelItem onClick={openModal}>
                <Icon name="edit" fill={theme.colorInputActive} />{translate('EditCategory')}
              </PanelItem>
            }
          </PanelContainer>
        </>}
        <EditCategoryModal
                  selectedCategories={selectedCategories[0]}
                  theme={theme}
                  openEditModal={openEditModal}
                  onClose={closeModal} />
    </StyledReactBottomSheet>
  )
}

export default CategoriesPanel;
