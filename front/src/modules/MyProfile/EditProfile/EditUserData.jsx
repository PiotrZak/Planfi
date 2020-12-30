import React, { useState } from 'react';
import Label from 'components/atoms/Label';
import styled from 'styled-components';
import Input from 'components/molecules/Input';
import ValidationHint from 'components/atoms/ErrorMessageForm';
import InputContainer from 'components/atoms/InputContainerForm';
import { userService } from 'services/userServices'
import Button from "components/atoms/Button"
import * as Yup from 'yup';
import { StyledModal, ButtonContainer, IconContainer } from 'components/molecules/Modal'
import { ModalHeading } from 'components/atoms/Heading';
import { Formik, Field, Form } from 'formik';
import { translate } from 'utils/Translation';
import Icon from 'components/atoms/Icon';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';

const initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
};

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(translate('EnterFirstNameAndLastName')),
    lastName: Yup.string().required(translate('lastName')),
    phone: Yup.string()
        .required(translate('phone'))
        .matches(/^\d{9}$/, translate('phoneValidation')),
});

const EditUserDataModal = ({ id, openModal, onClose }) => {
    const { notificationDispatch } = useNotificationContext();

    const onSubmit = (values) => {
        const transformedUserData = { firstName: values.firstName, lastName: values.lastName, phoneNumber: values.phone }
        userService
            .editUser(id, transformedUserData)
            .then(() => {
                notificationDispatch({
                    type: ADD,
                    payload: {
                        content: { success: 'OK', message: translate('UserDataEdited') },
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
                <h2>
                    {translate("EditUserDetails")}
                </h2>
            </ModalHeading>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
                {({ errors, touched, values }) => (
                    <Form>
                        <InputContainer>
                            <Label type="top" text={translate('FirstName')} required>
                                <Field
                                    typeInput="light"
                                    placeholder={translate('FirstNamePlaceholder')}
                                    type="text"
                                    name="firstName"
                                    as={Input}
                                    error={errors.name && touched.name} />
                            </Label>
                        </InputContainer>
                        <InputContainer>
                            <Label type="top" text={translate('LastName')} required>
                                <Field
                                    typeInput="light"
                                    placeholder={translate('LastNamePlaceholder')}
                                    type="text" name="lastName"
                                    as={Input}
                                    error={errors.name && touched.name} />
                            </Label>
                        </InputContainer>
                        <InputContainer>
                            <Label type="top" text={translate('Phone')} required>
                                <Field
                                    typeInput="light"
                                    placeholder={translate('PhoneNamePlaceholder')}
                                    type="number"
                                    name="phone"
                                    as={Input}
                                    error={errors.name && touched.name} />
                            </Label>
                            <ValidationHint name="phone" />
                        </InputContainer>
                        <ButtonContainer>
                        <Button type="submit" buttonType="primary" size="lg">{translate('SaveChanges')}</Button>
                        </ButtonContainer>
                    </Form>
                )}
            </Formik>
        </StyledModal>
    );
}

export default EditUserDataModal;