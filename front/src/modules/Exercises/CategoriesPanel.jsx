import React, { useState } from 'react';
import { categoryService } from 'services/categoryService';
import Icon from 'components/atoms/Icon';
import styled from 'styled-components';
import { translate } from 'utils/Translation';
import StyledReactBottomSheet, {PanelContainer, PanelItem} from 'components/organisms/BottomSheet'
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import EditCategoryModal from './EditCategoryModal';

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

const CategoriesPanel = ({ theme, bottomSheet, setBottomSheet, selectedCategories }) => {

  const [openModal, setOpenModal] = useState(false);
  const { notificationDispatch } = useNotificationContext();

console.log(selectedCategories)

    const deleteCategories = () => {
      categoryService
        .deleteCategories(selectedCategories)
        .then(() => {
          setBottomSheet('none')
          notificationDispatch({
            type: ADD,
            payload: {
              content: { success: 'OK', message: translate('CategoriesDeleted')},
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
      setOpenModal(false)
    }
  
    return (
      <StyledReactBottomSheet
        showBlockLayer={false}
        visible={bottomSheet}
        onClose={() => setBottomSheet(false)}
        appendCancelBtn={false}>
        {/* {isMobile ?
          <>
            <button onClick={() => deleteCategories()} className="bottom-sheet-item">{selectedCategories.length == 1 ? deleteCategory : deleteCategoriesText}</button>
          </>
          :
          <> */}
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
            <PanelItem onClick={() => setOpenModal(true)}>
              <Icon name="edit" fill={theme.colorInputActive} />{translate('EditCategory')}
              <EditCategoryModal selectedCategories ={selectedCategories[0]}theme={theme} openModal={openModal} onClose={closeModal} />
            </PanelItem>
          }
        </PanelContainer>
        {/* </> */}
      </StyledReactBottomSheet>
    )
  }

  export default CategoriesPanel;