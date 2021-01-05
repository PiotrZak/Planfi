import React from 'react';
import Label from 'components/atoms/Label';
import styled from 'styled-components';
import Input from 'components/molecules/Input';
import ValidationHint from 'components/atoms/ErrorMessageForm';
import InputContainer from 'components/atoms/InputContainerForm';
import { userService } from 'services/userServices';
import Button from 'components/atoms/Button';
import * as Yup from 'yup';
import { StyledModal, ButtonContainer, IconContainer } from 'components/molecules/Modal'
import { ModalHeading } from 'components/atoms/Heading';
import { Formik, Field, Form } from 'formik';
import { translate } from 'utils/Translation';
import Icon from 'components/atoms/Icon';
import ValidateInvalidData from 'components/atoms/ValidateInvalidData';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';

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
        .oneOf([Yup.ref('newPassword')], translate('IdenticalPassword')),
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
                <h2>            {translate("EditUserDetails")}</h2>
            </ModalHeading>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
                {({ errors, touched, values }) => (
                    <Form>
                        <InputContainer>
                            <Label type="top" text={translate('NewPassword')} required>
                                <Field
                                    typeInput="light"
                                    placeholder={translate('NewPasswordPlaceholder')}
                                    type="text"
                                    name="newPassword"
                                    as={Input}
                                    error={errors.name && touched.name} />
                            </Label>
                            <ValidateInvalidData errors={errors} touched={touched} text={translate('PasswordRequirements')} inputName="password" />
                            <ValidationHint name="newPassword" />
                        </InputContainer>
                        <InputContainer>
                            <Label type="top" text={translate('RepeatNewPassword')} required>
                                <Field
                                    typeInput="light"
                                    placeholder={translate('RepeatNewPasswordPlaceholder')}
                                    type="string"
                                    name="repeatNewPassword"
                                    as={Input}
                                    error={errors.name && touched.name} />
                            </Label>
                            <ValidationHint name="repeatNewPassword" />
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

export default EditUserPasswordModal;
