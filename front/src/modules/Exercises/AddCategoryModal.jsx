import React from 'react';
import Label from 'components/atoms/Label';
import Input from 'components/molecules/Input';
import { translate } from 'utils/Translation';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Button from 'components/atoms/Button';
import { ModalHeading } from 'components/atoms/Heading';
import { StyledModal, ButtonContainer, IconContainer } from 'components/molecules/Modal'
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import { categoryService } from 'services/categoryService';
import Icon from 'components/atoms/Icon';
import Paragraph from 'components/atoms/Paragraph';
import ValidationHint from 'components/atoms/ErrorMessageForm';
import InputContainer from 'components/atoms/InputContainerForm';
import { darkTheme } from 'theme/darkTheme';
import styled from 'styled-components';

const initialValues = {
  title: '',
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required(translate('ThisFieldIsRequired')),
});

const AddCategoryModal = ({ openModal, onClose, theme }) => {
  const { notificationDispatch } = useNotificationContext();

  const onSubmit = (values) => {
    categoryService
      .addCategory(values)
      .then(() => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: 'OK', message: translate('CategoryAdded') },
            type: 'positive',
          },
        });
        onClose()
      })
      .catch((error) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { error, message: translate('ErrorAlert') },
            type: 'warning',
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
      <ModalHeading>{translate('AddCategoryTitle')}</ModalHeading>
      <IconContainer>
        <Icon fill ={darkTheme.colorGray80}name="union" size="1.2" cursorType="pointer" onClick={onClose} />
      </IconContainer>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
        {({ errors, touched, isValid }) => (
          <Form>
            <InputContainer>
              <Label type="top" text={translate('CategoryTitle')} required>
                <Field typeInput ="light" type="text" name="title" as={Input} error={errors.name && touched.name} />
              </Label>
            </InputContainer>
            <ValidationHint name="title" />
            <Paragraph type="body-3-regular">{translate('AddCategoryModalDescription')}</Paragraph>
            <ButtonContainer>
              <Button type="submit" buttonType="primary" size="md" disabled={!isValid}>{translate('Add')}</Button>
            </ButtonContainer>
          </Form>
        )}
      </Formik>
    </StyledModal>
  );
};

export default AddCategoryModal;
