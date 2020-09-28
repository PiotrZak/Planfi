import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch } from 'react-redux'
import { alertActions } from 'redux/actions/alert.actions'
import { organizationService } from 'services/organizationServices'
import { Button } from "common/buttons/Button"
import {DropdownInput} from "common/Dropdown"
import messages from 'lang/eng'

const EditRoleModal = ({ id, openModal, onClose }) => {

    const [formData, setFormData] = useState({});
    const dispatch = useDispatch()

    function getRole(e) {
        formData.role = e.target.value;
        setFormData({ ...formData });
      }

    const submitForm = () => {
        changeRole(formData)
    }

    const changeRole = () => {
    
        const transformedData = {userId: id[0], role: formData.role}
        organizationService
            .editRole(transformedData)
            .then(() => {
                dispatch(alertActions.success("User details edited!"))
                onClose()
            })
            .catch((error) => {
                dispatch(alertActions.error(error.message))
            });
    }

    const saveChanges = "Save Changes";
    
    
    const roles = [
        {role: "Owner"},
        {role: "Trainer"},
        {role: "User"},
    ]

    return (
        <div>

            <Modal isOpen={openModal} toggle={onClose}>
                <ModalHeader toggle={onClose}><h2>{messages.users.editUserRole}</h2></ModalHeader>
                <ModalBody>
                    <DropdownInput
                    id="companyID"
                    name="companyID"
                    label="Role"
                    list={roles}
                    displayValue="role"
                    optionValue="role"
                    placeholder="Select a brand"
                    onChange={getRole}
                    />  
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn--primary btn--lg" onClick={submitForm} name ={saveChanges}/>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default EditRoleModal;