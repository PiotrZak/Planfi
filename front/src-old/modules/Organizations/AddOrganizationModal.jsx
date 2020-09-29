import React, { useState, useEffect, useContext } from 'react';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { FormInput } from 'common/FormInput';
import { validationUtil } from 'utils/validation.util';
import { alertActions } from 'redux/actions/alert.actions';
import { planService } from 'services/planService';
import { Button } from 'common/buttons/Index';
import { userContext } from 'App';

const addOrganizationModal = ({openModal, onClose}) => (

);

export default addOrganizationModal;
