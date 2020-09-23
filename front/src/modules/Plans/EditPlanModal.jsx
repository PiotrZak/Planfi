import React, { useState, useEffect, useContext } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch } from 'react-redux'
import { FormInput } from "common/FormInput"
import { validationUtil } from "utils/validation.util"
import { alertActions } from 'redux/actions/alert.actions'
import { planService } from "services/planService";
import { Button } from "common/buttons/Button"
import { userContext } from 'App';


const editPlanTitle = "Edit a Plan";
const editPlanTip = "When editting a Plan, it is worth using names related to specific parts of the body, for example 'Back'";
const editPlanButton = "Edit Plan";
const planEdited = "Plan succesfully edited!";

const EditPlanModal = ({ selectedPlansId, openModal, onClose }) => {

    const { user } = useContext(userContext);
    const [editPlanData, setEditPlan] = useState({});
    const [errors, setErrors] = useState({})

    const requiredFields = ["title"];
    const dispatch = useDispatch()

    const handleInput = (e) => {
        let name = e.target.name
        editPlanData[name] = e.target.value;
        setEditPlan(editPlanData);
        validationUtil.runSetErrors(name, setErrors, errors, requiredFields, editPlanData)
    }

    const submitForm = () => {
        const confirm = validationUtil.runValidateOnSubmit(setErrors, errors, requiredFields, editPlanData)
        confirm && editPlan(editPlanData)
    }
    
    const editPlan = (editPlanData) => {

        const formData = new FormData();
        formData.append("Title", editPlanData.title)
        planService
            .editPlan(selectedPlansId, formData)
            .then(() => {
                dispatch(alertActions.success(planEdited))
                onClose()
            })
            .catch((error) => {
                dispatch(alertActions.error(error.title))
            });
    }

    return (
        <div>
            <Modal isOpen={openModal} toggle={onClose}>
                <ModalHeader toggle={onClose}><h2>{editPlanTitle}</h2></ModalHeader>
                <ModalBody>
                    <FormInput type = "textarea" id="title" name="title" onChange={handleInput} label="Title" hasError={errors.title} placeholder = {editPlanTip} />
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn--primary btn--lg" onClick={submitForm} name ={editPlanButton}/>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default EditPlanModal;