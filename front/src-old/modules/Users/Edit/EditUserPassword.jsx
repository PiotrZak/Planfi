import React, { useState} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch } from 'react-redux'
import { FormInput } from "common/FormInput"
import { validationUtil } from "utils/validation.util"
import { alertActions } from 'redux/actions/alert.actions'
import { userService } from 'services/userServices'
import { Button } from "common/buttons/Index"

const EditUserPasswordModal = ({ id, openModal, onClose }) => {

    const [userData] = useState({});
    const [errors, setErrors] = useState({})

    const requiredFields = ["password", "newPassword", "repeatNewPassword"];
    const dispatch = useDispatch()

    const handleInput = (e) => {
        let name = e.target.name
        userData[name] = e.target.value;

        const passwordValidation = validationUtil.validatePassword(userData['newPassword'])
        validationUtil.runSetErrors(name, setErrors, errors, requiredFields, userData)
        passwordValidation && setErrors({ ...errors, password: passwordValidation }) 
    }

    const submitForm = () => {
        const confirm = validationUtil.runValidateOnSubmit(setErrors, errors, requiredFields, userData)

        if (userData.newPassword === userData.repeatNewPassword) {
            confirm && changePassword(userData)
        }
        else {
            dispatch(alertActions.error(identicalPassword))
        }
    }

    // todo - exclude this logic
    const changePassword = (userData) => {
        const transformedUserData = { password: userData.password, newPassword: userData.newPassword }
        userService
            .editUser(id, transformedUserData)
            .then(() => {
                dispatch(alertActions.success("User details edited!"))
                onClose()
            })
            .catch((error) => {
                dispatch(alertActions.error(error.message))
            });
    }

    const identicalPassword = "The passwords aren't identical";
    const editPassword = "Edit Your Password";
    const saveChanges = "Save Changes";

    const firstName = "First Name";
    const lastName = "Last Name";

    return (
        <div>

            <Modal isOpen={openModal} toggle={onClose}>
                <ModalHeader toggle={onClose}><h2>{editPassword}</h2></ModalHeader>
                <ModalBody>
                    <FormInput id="password" name="password" onChange={handleInput} label="Password" hasError={errors.password} />
                    <FormInput id="newPassword" name="newPassword" onChange={handleInput} label="New Password" hasError={errors.newPassword} />
                    <FormInput id="repeatNewPassword" name="repeatNewPassword" onChange={handleInput} label="Repeat New Password" hasError={errors.repeatNewPassword} />
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn--primary btn--lg" onClick={submitForm} name={saveChanges} />
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default EditUserPasswordModal;