import React, { useState, useEffect, useCallback } from 'react';
import Icon from 'components/atoms/Icon';
import styled from 'styled-components';
import Loader from 'components/atoms/Loader';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import AddCategoryModal from './AddCategoryModal';
import { commonUtil } from "utils/common.util"
import { useQuery, gql } from '@apollo/client';
import BackTopNav from 'components/molecules/BackTopNav';
import { translate } from 'utils/Translation';
import Heading from 'components/atoms/Heading';
import GlobalTemplate, { Nav } from "../../templates/GlobalTemplate"
import { useThemeContext } from 'support/context/ThemeContext';
import CategoriesPanel from './CategoriesPanel'

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

const Categories = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [bottomSheet, setBottomSheet] = useState('none')

  const { theme } = useThemeContext();
  const { loading, error, data, refetch: _refetch} = useQuery(CATEGORY);

  const closeModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    refreshData()
  }, [openModal, openEditModal, _refetch]);

  const refreshData = useCallback(() => { setTimeout(() => _refetch(), 200) }, [_refetch])

  if (loading) return <Loader isLoading={loading} />;
  if (error) return <p>Error :(</p>;

  const submissionHandleElement = (selectedData) => {
    const selectedCategories = commonUtil.getCheckedData(selectedData, 'categoryId');
    setSelectedCategories(selectedCategories);
    selectedCategories.length > 0 ? setBottomSheet('flex') : setBottomSheet('none');
  };

  return (
    <>
      <GlobalTemplate>
        <Nav>
          <BackTopNav />
          <Heading>{translate('CategoriesTitle')}</Heading>
          <IconWrapper>
            <Icon onClick={() => setOpenModal(true)} name="plus" color={theme.colorInputActive} />
          </IconWrapper>
        </Nav>
        {data.categories.length > 0 ?
          <CheckboxGenericComponent
            dataType="categories"
            displayedValue="title"
            dataList={data.categories}
            onSelect={submissionHandleElement} />
          : <p>{translate('NoCategories')}</p>}
      </GlobalTemplate>
      <CategoriesPanel
        theme={theme}
        bottomSheet={bottomSheet}
        setBottomSheet={setBottomSheet}
        selectedCategories={selectedCategories}
        setOpenEditModal={setOpenEditModal}
        openEditModal={openEditModal} />
      <AddCategoryModal theme={theme} openModal={openModal} onClose={closeModal} />
    </>
  );
};

export default Categories;
