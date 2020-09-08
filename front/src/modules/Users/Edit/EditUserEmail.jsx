import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch } from 'react-redux'
import { FormInput } from "../../../common/FormInput"
import { validationUtil } from "../../../utils/validation.util"
import { alertActions } from '../../../redux/actions/alert.actions'
import { userService } from '../../../services/userServices'
import { Button } from "../../../common/buttons/Button"



const EditUserEmailModal = ({ id, openModal, onClose }) => {

    const [userData, setUserData] = useState({});
    const [errors, setErrors] = useState({})

    const requiredFields = ["password", "newMail", "repeatNewMail"];
    const dispatch = useDispatch()

    const handleInput = (e) => {

        let name = e.target.name
        userData[name] = e.target.value;

        const mailValidation = validationUtil.validateEmail(userData['newMail'])
        validationUtil.runSetErrors(name, setErrors, errors, requiredFields, userData)

        mailValidation && setErrors({ ...errors, newMail: mailValidation })
    }

    const submitForm = () => {
        const confirm = validationUtil.runValidateOnSubmit(setErrors, errors, requiredFields, userData)

        if (userData.newMail === userData.repeatNewMail) {
            confirm && changeEmail(userData)
        }
        else {
            dispatch(alertActions.error(identicalEmails))
        }
    }

    const changeEmail = (userData) => {
        const transformedUserData = { password: userData.password, email: userData.newMail }
        userService
            .editUser(id, transformedUserData)
            .then(() => {
                dispatch(alertActions.success("User email edited!"))
                onClose()
            })
            .catch((error) => {
                dispatch(alertActions.error(error.message))
            });
    }

    const identicalEmails = "The emails aren't identical";
    const editEmail = "Change Email";
    const saveChanges = "Save Changes";

    return (
        <div>

            <Modal isOpen={openModal} toggle={onClose}>
                <ModalHeader toggle={onClose}><h2>{editEmail}</h2></ModalHeader>
                <ModalBody>
                    <FormInput id="password" name="password" onChange={handleInput} label="Password" hasError={errors.password} />
                    <FormInput id="newMail" name="newMail" onChange={handleInput} label="New Mail" hasError={errors.newMail} />
                    <FormInput id="repeatNewMail" name="repeatNewMail" onChange={handleInput} label="Repeat New Mail" hasError={errors.repeatNewMail} />
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn--primary btn--lg" onClick={submitForm}>{saveChanges}</Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default EditUserEmailModal;