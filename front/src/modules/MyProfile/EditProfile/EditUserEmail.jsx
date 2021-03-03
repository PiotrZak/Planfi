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
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import { darkTheme } from 'theme/darkTheme';
import ErrorMessageForm from 'components/atoms/ErrorMessageForm';

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
        .matches(REGEX, translate('EmailValidation')),
    repeatNewMail: Yup.string()
        .required(translate('EnterMail'))
        .oneOf([Yup.ref('newMail')], translate('IdenticalEmails')),
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
                        content: { success: 'OK', message: translate('UserDataEdited') },
                        type: 'positive',
                    },
                });
                onClose()
            })

            .catch((error) => {
                // todo - communicate
                console.log(error)
                notificationDispatch({
                    type: ADD,
                    payload: {
                      content: { success: error, message: translate('ErrorAlert')},
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
            <Icon fill ={darkTheme.colorGray80} name="union" size="1.2" cursorType="pointer" onClick={onClose} />
            </IconContainer>
            <ModalHeading toggle={onClose}>
                <h2>{translate("EditUserDetails")}</h2>
            </ModalHeading>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
                {({ errors, touched }) => (
                    <Form>
                        <InputContainer>
                            <Label type="top" text={translate('NewMail')} required>
                                <Field 
                                    typeInput ="light"
                                    placeholder={translate('NewMailPlaceholder')}
                                    type="text"
                                    name="newMail"
                                    as={Input}
                                    error={errors.name && touched.name} />
                            </Label>
                            <ValidationHint name="newMail" />
                        </InputContainer>
                        <InputContainer>
                            <Label type="top" text={translate('RepeatNewMail')} required>
                                <Field 
                                    typeInput ="light"
                                    placeholder={translate('RepeatNewMailPlaceholder')}
                                    type="string"
                                    name="repeatNewMail"
                                    as={Input}
                                    error={errors.name && touched.name} />
                            </Label>
                            <ValidationHint name="repeatNewMail" />
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

export default EditUserEmailModal;
