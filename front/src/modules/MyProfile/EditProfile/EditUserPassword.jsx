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
import ValidateInvalidData from 'components/atoms/ValidateInvalidData';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';

const identicalPassword = "The passwords aren't identical";
const editPassword = "Edit Your Password";
const saveChanges = "Save Changes";
const firstName = "First Name";
const lastName = "Last Name";
const editUserDetails = "Edit Your data";
const newPasswordPlaceholder = "";
const repeatNewPasswordPlaceholder = "";

const IconContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const initialValues = {
    newPassword: '',
    repeatNewPassword: '',
};

const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
    .matches(passwordRegex, translate('PasswordNeedsCondition'))
    .max(32, translate('PasswordMaxLength'))
    .required(),
    repeatNewPassword: Yup.string()
    .required(translate('EnterMail'))
    .oneOf([Yup.ref('newPassword')], translate('identicalPassword')),
});

const EditUserPasswordModal = ({ id, openModal, onClose }) => {

    const { notificationDispatch } = useNotificationContext();

    const onSubmit = (values) => {
        const transformedUserData = { password: values.password, newPassword: values.newPassword }
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
                <ModalHeading toggle={onClose}>
                <h2>{editUserDetails}</h2>
                </ModalHeading>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
                {({ errors, touched, values }) => (
                    <Form>
                        <InputContainer>
                            <Label type="top" text={translate('newPassword')} required>
                                <Field placeholder={translate('newPasswordPlaceholder')}
                                    type="text" 
                                    name="newPassword"
                                    as={Input}
                                    error={errors.name && touched.name} />
                            </Label>
                            <ValidateInvalidData errors={errors} touched={touched} text={translate('PasswordRequirements')} inputName="password" />
                            <ValidationHint name="newPassword" />
                        </InputContainer>
                        <InputContainer>
                            <Label type="top" text={translate('repeatNewPassword')} required>
                                <Field placeholder={translate('repeatNewPasswordPlaceholder')}
                                    type="string"
                                    name="repeatNewPassword"
                                    as={Input}
                                    error={errors.name && touched.name} />
                            </Label>
                            <ValidationHint name="repeatNewPassword" />
                        </InputContainer>
                        <Button type="submit" buttonType="primary" size="lg">{translate('saveChanges')}</Button>
                    </Form>
                )}
            </Formik>
        </StyledModal>
    );
}

export default EditUserPasswordModal;