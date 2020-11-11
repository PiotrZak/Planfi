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
import CategoriesPanel from './CategoriesPanel'

const CategoriesDeleted = 'Categories finally deleted!'
const AddExerciseToCategory = 'To be able to add exercises you need to add a category first';
const DeleteCategoriesText = "Delete categories"

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

const CATEGORY = gql`{
  categories{
         title
         categoryId
   }
  }
`;
export const Categories = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [bottomSheet, setBottomSheet] = useState('none')
  const { theme } = useThemeContext();
  const { loading, error, data } = useQuery(CATEGORY);

  useEffect(() => {
  }, [openModal]);

  if (loading) return <Loader isLoading={loading}></Loader>;
  if (error) return <p>Error :(</p>;

  const submissionHandleElement = (selectedData) => {
    const selectedCategories = commonUtil.getCheckedData(selectedData, "categoryId")
    setSelectedCategories(selectedCategories)
    selectedCategories.length > 0 ? setBottomSheet('flex') : setBottomSheet('none');
  }

  return (
    <>
      <GlobalTemplate>
        <Nav>
          <BackTopNav />
          <Heading>{translate('CategoriesTitle')}</Heading>
          <IconWrapper>
            <Icon onClick={() => setOpenModal(true)} name="plus" fill={theme.colorInputActive} />
          </IconWrapper>
        </Nav>
        <AddCategoryModal theme={theme} openModal={openModal} onClose={() => setOpenModal(false)} />
        {data.categories ? <CheckboxGenericComponent dataType="categories" displayedValue="title" dataList={data.categories} onSelect={submissionHandleElement} /> : <h1>{translate('NoCategories')}</h1>}
      </GlobalTemplate>
      <CategoriesPanel theme={theme} bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} selectedCategories={selectedCategories} />
    </>
  );
};

export default Categories;
