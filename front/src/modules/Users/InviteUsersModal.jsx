import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch } from 'react-redux'
import { FormInput } from "common/FormInput"
import { validationUtil } from "utils/validation.util"
import { alertActions } from 'redux/actions/alert.actions'
import { userService } from 'services/userServices'
import { Button } from "common/buttons/Button"
import { ReactMultiEmail, isEmail } from "react-multi-email";
import "react-multi-email/style.css";

const InviteUserModal = ({ openModal, onClose }) => {

    const [userData] = useState({});
    const [errors, setErrors] = useState({})
    const [emails, setEmails] = useState([])

    const requiredFields = ["firstName", "lastName", "phone"];
    const dispatch = useDispatch()

    const handleInput = (e) => {
        let name = e.target.name
        userData[name] = e.target.value;

        // const phoneValidation = validatePhone(userData['phone'])
        // validationUtil.runSetErrors(name, setErrors, errors, requiredFields, userData)
        // phoneValidation && setErrors({ ...errors, phone: phoneValidation }) 
    }

    const submitForm = () => {
        console.log('test')
    }

    // todo - exclude this logic
    const saveChanges = "Send Emails";
    const inviteUsers = "Invite Users";
    const separateMails = "Separate individual e-mail addresses with a comma";

    return (
        <div>

            <Modal isOpen={openModal} toggle={onClose}>
                <ModalHeader toggle={onClose}><h2>{inviteUsers}</h2></ModalHeader>
                <ModalBody>
                    <ReactMultiEmail
                        placeholder={separateMails}
                        emails={emails}
                        onChange={(_emails) => {
                            setEmails([..._emails])
                        }}
                        validateEmail={email => {
                            return isEmail(email); // return boolean
                        }}
                        getLabel={(
                            email: string,
                            index: number,
                            removeEmail: (index: number) => void,
                        ) => {
                            return (
                                <div data-tag key={index}>
                                    {email}
                                    <span data-tag-handle onClick={() => removeEmail(index)}>
                                        ×
                                </span>
                                </div>
                            );
                        }}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn--primary btn--lg" onClick={submitForm} name={saveChanges} />
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default InviteUserModal;