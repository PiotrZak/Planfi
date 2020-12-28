import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch } from 'react-redux'
import { validationUtil } from "utils/validation.util"
import { alertActions } from 'redux/actions/alert.actions'
import { userService } from 'services/userServices'
import Button from "components/atoms/Button"

const EditUserDataModal = ({ id, openModal, onClose }) => {

    const [userData] = useState({});
    const [errors, setErrors] = useState({})

    const requiredFields = ["firstName", "lastName", "phone"];
    const dispatch = useDispatch()

    const handleInput = (e) => {
        let name = e.target.name
        userData[name] = e.target.value;

        const phoneValidation = validatePhone(userData['phone'])
        validationUtil.runSetErrors(name, setErrors, errors, requiredFields, userData)
        phoneValidation && setErrors({ ...errors, phone: phoneValidation }) 
    }

    function validatePhone(phone){
        let errorField = {};
        const phoneValidationMessage = "Telephone number should be correct";
        var RE = /^\d{9}$/;
        if(!RE.test(phone)){
            errorField['phone'] = phoneValidationMessage;
            return errorField['phone']
        }
    }

    const submitForm = () => {
        const confirm = validationUtil.runValidateOnSubmit(setErrors, errors, requiredFields, userData)
            confirm && changeUserDetails(userData)
    }

    // todo - exclude this logic
    const changeUserDetails = (userData) => {
        const transformedUserData = { firstName: userData.firstName, lastName: userData.lastName, phoneNumber: parseInt(userData.phone) }
        userService
            .editUser(transformedUserData)
            .then(() => {
                dispatch(alertActions.success("User details edited!"))
                onClose()
            })
            .catch((error) => {
                dispatch(alertActions.error(error.message))
            });
    }

    const editUserDetails = "Edit Your data";
    const saveChanges = "Save Changes";
    
    const firstName = "First Name";
    const lastName = "Last Name";

    return (
        <StyledModal
        isOpen={openEditModal}
        onBackgroundClick={onClose}
        onEscapeKeydown={onClose}
      >
                <ModalHeader toggle={onClose}><h2>{editUserDetails}</h2></ModalHeader>
                <ModalBody>
                    <FormInput id="firstName" name="firstName" onChange={handleInput} label={firstName} hasError={errors.firstName} />
                    <FormInput id="lastName" name="lastName" onChange={handleInput} label={lastName} hasError={errors.lastName} />
                    <FormInput type ="number" id="phone" name="phone" onChange={handleInput} label="Phone" hasError={errors.phone} />
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn--primary btn--lg" onClick={submitForm} name ={saveChanges}/>
                </ModalFooter>
            </StyledModal>
    );
}

export default EditUserDataModal;