import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { organizationService } from 'services/organizationServices'
import Button from "components/atoms/Button"
import {DropdownInput} from "components/atoms/Dropdown"

const editUserRole = "Edit User Role";

const EditRoleModal = ({ id, openModal, onClose }) => {

    const [formData, setFormData] = useState({});

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
                onClose()
            })
            .catch((error) => {
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
                <ModalHeader toggle={onClose}><h2>{editUserRole}</h2></ModalHeader>
                <ModalBody>
                    <input
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