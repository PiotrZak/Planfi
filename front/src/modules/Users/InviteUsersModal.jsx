import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Button from "components/atoms/Button"
import { ReactMultiEmail, isEmail } from "react-multi-email";
import "react-multi-email/style.css";

const saveChanges = "Send Emails";
const inviteUsers = "Invite Users";
const separateMails = "Separate individual e-mail addresses with a comma";

const InviteUserModal = ({ openModal, onClose }) => {

    const [emails, setEmails] = useState([])

    const submitForm = () => {
        
    }

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
                            email,
                            index,
                            removeEmail,
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