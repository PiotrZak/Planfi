import React, { useState, useEffect } from 'react';
import { categoryService } from 'services/categoryService';
import Icon from 'components/atoms/Icon';
import styled from 'styled-components';
import Loader from 'components/atoms/Loader';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import AddCategoryModal from './AddCategoryModal';
import { commonUtil } from "utils/common.util"
import { isMobile } from "react-device-detect";
import { useQuery, gql } from '@apollo/client';
import BackTopNav from 'components/molecules/BackTopNav';
import { translate } from 'utils/Translation';
import Heading from 'components/atoms/Heading';
import GlobalTemplate, { Nav } from "../../templates/GlobalTemplate"
import { useThemeContext } from '../../support/context/ThemeContext';
import StyledReactBottomSheet, {PanelContainer, PanelItem} from 'components/organisms/BottomSheet'


const IconWrapper = styled.div`
    margin-top: .4rem;
`;

const CategoriesPanel = ({ theme, bottomSheet, setBottomSheet, selectedCategories }) => {

    const deleteCategories = () => {
      categoryService
        .deleteCategories(selectedCategories)
        .then(() => {
        })
        .catch((error) => {
        });
    };
  
    const setOpenEditModal = () => {
      console.log('test')
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
            <PanelItem onClick={() => setOpenEditModal(true())}>
              <Icon name="edit" fill={theme.colorInputActive} />{translate('EditCategory')}
            </PanelItem>
          }
        </PanelContainer>
        {/* </> */}
      </StyledReactBottomSheet>
    )
  }

  export default CategoriesPanel;