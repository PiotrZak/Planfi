import React from 'react';
import InputContainer from 'components/atoms/InputContainerForm';
import Label from 'components/atoms/Label';
import Input from 'components/molecules/Input';
import { translate } from 'utils/Translation';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Button from 'components/atoms/Button';
import { ModalHeading } from 'components/atoms/Heading';
import { StyledModal } from 'components/molecules/Modal';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import { categoryService } from 'services/categoryService';
import Icon from 'components/atoms/Icon';
import styled from 'styled-components';

const initialValues = {
  title: '',
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required(translate('CategoryTitle')),
});

const IconContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const AddCategoryModal = ({ openModal, onClose, theme }) => {
  const { notificationDispatch } = useNotificationContext();

  const onSubmit = (values) => {
    createCategory(values);
  };

  const createCategory = (addCategoryData) => {
    categoryService
      .addCategory(addCategoryData);
    notificationDispatch({
      type: ADD,
      payload: {
        content: { success: 'OK', message: translate('CategoryAdded') },
        type: 'positive',
      },
    });
    onClose()
      .then(() => {
      })
      .catch((error) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { error, message: translate('ErrorAlert') },
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
      <ModalHeading>{translate('AddCategoryTitle')}</ModalHeading>
      <IconContainer>
        <Icon name="Union" size="1.2" />
      </IconContainer>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
        {({ errors, touched }) => (
          <Form>
            <InputContainer>
              <Label type="top" text={translate('CategoryTitle')} required>
                <Field type="text" name="title" as={Input} error={errors.name && touched.name} />
              </Label>
            </InputContainer>
            <Button type="submit" buttonType="primary" size="lg">{translate('AddCategoryButton')}</Button>
          </Form>
        )}
      </Formik>
    </StyledModal>
  );
};

export default AddCategoryModal;
