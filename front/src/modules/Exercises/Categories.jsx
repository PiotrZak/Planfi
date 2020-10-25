import React, { useState, useEffect } from 'react';
import { categoryService } from 'services/categoryService';
import Icon from 'components/atoms/Icon';
import { Loader } from 'components/atoms/Loader';
import Return from 'components/atoms/Return';
import { alertActions } from 'redux/actions/alert.actions'
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGenericComponent';
import AddCategoryModal from './AddCategoryModal';
import { commonUtil } from "utils/common.util"
import { isMobile } from "react-device-detect";
import { useDispatch } from 'react-redux';
import { useQuery, gql } from '@apollo/client';

var ReactBottomsheet = require('react-bottomsheet');

const noCategories = 'No Categories';
const categoriesTitle = 'Categories';
const categoriesDeleted = 'Categories finally deleted!'
const addExerciseToCategory = 'To be able to add exercises you need to add a category first';
const deleteCategory = "Delete category"
const deleteCategoriesText = "Delete categories"
const editCategory = "Edit Category"
const selected = "selected"

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
  const [bottomSheet, setBottomSheet] = useState(false)
  const { loading, error, data } = useQuery(CATEGORY);

   if (loading) return <Loader isLoading={loading}></Loader>;
   if (error) return <p>Error :(</p>;
  
  const openAddCategoryModal = () => {
    setOpenModal(!openModal);
  };

  const submissionHandleElement = (selectedData) => {
    const selectedCategories = commonUtil.getCheckedData(selectedData, "categoryId")
    setSelectedCategories(selectedCategories)
    if (selectedCategories.length > 0) {
      setBottomSheet(true);
    } else {
      setBottomSheet(false);
    }
  }

  return (
    <div>
      <div className="container">
        <div className="container__title">
          <Return />
          <h2>{categoriesTitle}</h2>
          <div onClick={openAddCategoryModal}>
            <Icon name="plus" fill="#5E4AE3" />
          </div>
        </div>
        <AddCategoryModal openModal={openModal} onClose={() => setOpenModal(false)} />
        <div>
            {data.categories ? <CheckboxGenericComponent dataType="categories" displayedValue="title" dataList={data.categories} onSelect={submissionHandleElement} /> : <h1>{noCategories}</h1>}
        </div>
      </div>
      <CategoriesPanel bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} selectedCategories={selectedCategories} />
    </div>
  );
};









const CategoriesPanel = ({ bottomSheet, setBottomSheet, selectedCategories }) => {

  const dispatch = useDispatch()

  const deleteCategories = () => {
    categoryService
      .deleteCategories(selectedCategories)
      .then(() => {
        dispatch(alertActions.success(categoriesDeleted));
      })
      .catch((error) => {
        dispatch(alertActions.error(error.title));
      });
  };
  
  return (
    <ReactBottomsheet
      showBlockLayer={false}
      className="bottomsheet-without-background"
      visible={bottomSheet}
      onClose={() => setBottomSheet(false)}
      appendCancelBtn={false}>
      {isMobile ?
        <>
          <button onClick={() => deleteCategories()} className="bottom-sheet-item">{selectedCategories.length == 1 ? deleteCategory : deleteCategoriesText}</button>

        </>
        :
        <>
          <div className="bottom-sheet-item__oneline">
            <Icon name="check" fill="#2E6D2C" />
            <p>{selectedCategories.length} {selected}</p>
            <div onClick={() => deleteCategories()} className="bottom-sheet-item__content"><Icon height={"18px"} name="trash" fill="#C3C3CF" />{deleteCategory}</div>
            {selectedCategories.length < 2 && <div 
            // onClick={() => setOpenEditModal(true)} 
            className='bottom-sheet-item__content'><Icon height={"18px"} name="edit" fill="#C3C3CF" />{editCategory}</div>}
          </div>
        </>
      }
    </ReactBottomsheet>
  )
}

export default Categories;
