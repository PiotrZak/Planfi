import React, { useState } from 'react';
import Label from 'components/atoms/Label';
import styled from 'styled-components';
import Input from 'components/molecules/Input';
import ValidationHint from 'components/atoms/ErrorMessageForm';
import InputContainer from 'components/atoms/InputContainerForm';
import { userService } from 'services/userServices'
import Button from "components/atoms/Button"
import * as Yup from 'yup';
import { StyledModal } from 'components/molecules/Modal';
import { ModalHeading } from 'components/atoms/Heading';
import { Formik, Field, Form } from 'formik';
import { translate } from 'utils/Translation';
import Icon from 'components/atoms/Icon';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';

const identicalEmails = "The emails aren't identical";
const editEmail = "Change Email";
const saveChanges = "Save Changes";
const newMailPlaceholder = "";
const repeatNewMailPlaceholder = "";
const editUserDetails = "Edit Your data";
const newMail = "";
const repeatNewMail = "";
const MailsAreNotTheSame = "";
const EnterMail = "";

const IconContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const initialValues = {
    newMail: '',
    repeatNewMail: '',
};

const ATOM = "[a-z0-9!#$%&'*+/=?^_`{|}~-]";
const DOMAIN = `(${ATOM}+(\\.${ATOM}+)*`;
const IP_DOMAIN = '\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\]';
const REGEX = `^${ATOM}+(\\.${ATOM}+)*@${DOMAIN}|${IP_DOMAIN})$`;


const validationSchema = Yup.object().shape({
    newMail: Yup.string()
    .required(translate('EnterMail'))
    .matches(REGEX, translate('phoneValidation')),
    repeatNewMail: Yup.string()
    .required(translate('EnterMail'))
    .oneOf([Yup.ref('newMail')], translate('identicalEmails')),
});

const EditUserEmailModal = ({ id, openModal, onClose }) => {

    const { notificationDispatch } = useNotificationContext();

    const onSubmit = (values) => {
        const transformedUserData = { email: values.newMail }
        userService
            .editUser(id, transformedUserData)
            .then(() => {
                notificationDispatch({
                    type: ADD,
                    payload: {
                      content: { success: 'OK', message: translate('userDataEdited') },
                      type: 'positive',
                    },
                  });
                onClose()
            })
            .catch((error) => {
                notificationDispatch({
                    type: ADD,
                    payload: {
                      content: { success: error, message: translate('ErrorAlert') },
                      type: 'error',
                    },
                  });
            });
    };

    return (
        <StyledModal
            isOpen={openModal}
            onBackgroundClick={onClose}
            onEscapeKeydown={onClose}
        >
            <IconContainer>
                <Icon name="Union" size="1.2" cursorType="pointer" onClick={onClose} />
            </IconContainer>
                <ModalHeading toggle={onClose}><h2>{editUserDetails}</h2></ModalHeading>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
                {({ errors, touched, values }) => (
                    <Form>
                        <InputContainer>
                            <Label type="top" text={translate('newMail')} required>
                                <Field placeholder={translate('newMailPlaceholder')}
                                    type="text" 
                                    name="newMail"
                                    as={Input}
                                    error={errors.name && touched.name} />
                            </Label>
                            <ValidationHint name="newMail" />
                        </InputContainer>
                        <InputContainer>
                            <Label type="top" text={translate('repeatNewMail')} required>
                                <Field placeholder={translate('repeatNewMailPlaceholder')}
                                    type="string"
                                    name="repeatNewMail"
                                    as={Input}
                                    error={errors.name && touched.name} />
                            </Label>
                            <ValidationHint name="repeatNewMail" />
                        </InputContainer>
                        <Button type="submit" buttonType="primary" size="lg">{translate('saveChanges')}</Button>
                    </Form>
                )}
            </Formik>
            </StyledModal>
    );
}

export default EditUserEmailModal;