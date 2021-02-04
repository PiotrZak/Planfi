import React, { useState, useEffect, useCallback } from 'react';
import Loader from 'components/atoms/Loader';
import { categoryService } from 'services/categoryService';
import { commonUtil } from 'utils/common.util';
import { useQuery, gql } from '@apollo/client';
import { translate } from 'utils/Translation';
import Heading from 'components/atoms/Heading';
import { useThemeContext } from 'support/context/ThemeContext';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import SmallButton from 'components/atoms/SmallButton';
import GlobalTemplate from 'templates/GlobalTemplate';
import CategoriesPanel from 'modules/Exercises/CategoriesPanel';
import AddCategoryModal from 'modules/Exercises/AddCategoryModal';
import { isMobile } from 'react-device-detect';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import Nav from 'components/atoms/Nav';
import { useUserContext } from 'support/context/UserContext';

const Categories = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { user } = useUserContext();
  const [bottomSheet, setBottomSheet] = useState('none');
  const { notificationDispatch } = useNotificationContext();
  const { theme } = useThemeContext();

  const CATEGORY = gql`{
    categories(where: {organizationId: "${user.organizationId}"})
    {
           title
           categoryId
           exercises
     }
    }
  `;

  const {
    loading, error, data, refetch: _refetch,
  } = useQuery(CATEGORY);
  const refreshData = useCallback(() => { setTimeout(() => _refetch(), 200); }, [_refetch]);

  const closeModal = () => {
    setOpenModal(false);
  };

  const submissionHandleElement = (selectedData) => {
    const selectedCategoriesId = commonUtil.getCheckedData(selectedData, 'categoryId');
    const selectedCategoriesName = commonUtil.getCheckedData(selectedData, 'title');
    setSelectedCategories(selectedCategoriesId);
    setSelectedCategoryName(selectedCategoriesName);
    if (selectedCategoriesId.length > 0) {
      if (isMobile) {
        setBottomSheet('inline');
      } else {
        setBottomSheet('flex');
      }
    } else {
      setBottomSheet('none');
    }
  };

  const deleteCategories = useCallback(() => {
    categoryService
      .deleteCategories(selectedCategories)
      .then(() => {
        setBottomSheet('none');
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: 'OK', message: translate('CategoriesDeleted') },
            type: 'positive',
          },
        });
        refreshData()
      })
      .catch((error) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { error, message: translate('ErrorAlert') },
            type: 'error',
          },
        });
      });
  }, [selectedCategories]);

  const editCategory = useCallback((addCategoryData) => {
    categoryService
      .editCategory(selectedCategories, addCategoryData)
      .then(() => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: 'OK', message: translate('CategoryEdited') },
            type: 'positive',
          },
        });
        refreshData();
      })
      .catch((error) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { error, message: translate('ErrorAlert') },
            type: 'error',
          },
        });
      });
    }, [selectedCategories]);

  useEffect(() => {
    refreshData();
    setSelectedCategoryName([]);
  }, [openModal, openEditModal, refreshData]);

  if (loading) return <Loader isLoading={loading} />;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <GlobalTemplate>
        <Nav>
          <Heading>{translate('CategoriesTitle')}</Heading>
          <SmallButton iconName="plus" onClick={() => setOpenModal(true)} />
        </Nav>
        {data.categories.length > 0
          ? (
            <CheckboxGenericComponent
              dataType="categories"
              displayedValue="title"
              dataList={data.categories}
              onSelect={submissionHandleElement}
            />
          )
          : <p>{translate('NoCategories')}</p>}
      </GlobalTemplate>
      <CategoriesPanel
        editCategory={editCategory}
        refreshData={refreshData}
        selectedCategoryName={selectedCategoryName}
        deleteCategories={deleteCategories}
        theme={theme}
        bottomSheet={bottomSheet}
        setBottomSheet={setBottomSheet}
        selectedCategories={selectedCategories}
        setOpenEditModal={setOpenEditModal}
        openEditModal={openEditModal}
      />
      <AddCategoryModal theme={theme} openModal={openModal} onClose={closeModal} />
    </>
  );
};

export default Categories;
