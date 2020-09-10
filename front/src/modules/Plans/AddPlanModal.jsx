import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch } from 'react-redux'
import { FormInput } from "./../../common/FormInput"
import { validationUtil } from "./../../utils/validation.util"
import { alertActions } from './../../redux/actions/alert.actions'
import { planService } from "./../../services/planService";
import { Button } from "./../../common/buttons/Button"

const AddPlanModal = ({ openModal, onClose }) => {

    const [addPlanData, setAddPlan] = useState({});
    const [errors, setErrors] = useState({})

    const requiredFields = ["title"];
    const dispatch = useDispatch()

    const handleInput = (e) => {
        let name = e.target.name
        addPlanData[name] = e.target.value;
        setAddPlan(addPlanData);
        validationUtil.runSetErrors(name, setErrors, errors, requiredFields, addPlanData)
    }

    const submitForm = () => {
        const confirm = validationUtil.runValidateOnSubmit(setErrors, errors, requiredFields, addPlanData)
        confirm && createPlan(addPlanData)
    }

    const createPlan = (addPlanData) => {
        planService
            .addPlan(addPlanData)
            .then(() => {
                dispatch(alertActions.success("Plan succesfully added!"))
                onClose()
            })
            .catch((error) => {
                dispatch(alertActions.error(error.title))
            });
    }

    const addPlanTitle = "Add a Plan";
    const addPlanTip = "When naming a Plan, it is worth using names related to specific parts of the body, for example 'Back'";
    const addPlanButton = "Create Plan";

    return (
        <div>

            <Modal isOpen={openModal} toggle={onClose}>
                <ModalHeader toggle={onClose}><h2>{addPlanTitle}</h2></ModalHeader>
                <ModalBody>
                    <FormInput id="title" name="title" onChange={handleInput} label="Title" hasError={errors.title} />
                    <p>{addPlanTip}</p>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn--primary btn--lg" onClick={submitForm} name ={addPlanButton}/>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AddPlanModal;