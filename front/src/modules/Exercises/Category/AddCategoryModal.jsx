import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch } from 'react-redux'
import { FormInput } from "common/FormInput"
import { validationUtil } from "utils/validation.util"
import { alertActions } from 'redux/actions/alert.actions'
import { categoryService } from 'services/categoryService';
import { Button }  from "common/buttons/Button"

const AddCategoryModal = ({ openModal, onClose }) => {

    const [addCategoryData, setAddCategory] = useState({});
    const [errors, setErrors] = useState({})

    const requiredFields = ["title"];
    const dispatch = useDispatch()

    const handleInput = (e) => {
        let name = e.target.name
        addCategoryData[name] = e.target.value;
        setAddCategory(addCategoryData);
        validationUtil.runSetErrors(name, setErrors, errors, requiredFields, addCategoryData)
    }

    const submitForm = () => {
        const confirm = validationUtil.runValidateOnSubmit(setErrors, errors, requiredFields, addCategoryData)
        confirm && createCategory(addCategoryData)
    }

    const createCategory = (addCategoryData) => {
        categoryService
            .addCategory(addCategoryData)
            .then(() => {
                dispatch(alertActions.success("Category succesfully added!"))
                onClose()
            })
            .catch((error) => {
                dispatch(alertActions.error(error.title))
            });
    }

    const addCategoryTitle = "Add a category";
    const addCategoryTip = "When naming a category, it is worth using names related to specific parts of the body, for example 'Back'";
    const addCategoryButton = "Create Category";

    return (
        <div>
            <Modal isOpen={openModal} toggle={onClose}>
                <ModalHeader toggle={onClose}><h2>{addCategoryTitle}</h2></ModalHeader>
                <ModalBody>
                    <FormInput type = "textarea" id="title" name="title" onChange={handleInput} label="Title" hasError={errors.title} placeholder= {addCategoryTip}/>
                </ModalBody>
                <ModalFooter>
                    <Button name = {addCategoryButton} className="btn btn--primary btn--lg" onClick={submitForm}></Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AddCategoryModal;