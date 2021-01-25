import React from 'react';
import InputContainer from 'components/atoms/InputContainerForm';
import Label from 'components/atoms/Label';
import Input from 'components/molecules/Input';
import { translate } from 'utils/Translation';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { categoryService } from 'services/categoryService';
import Button from 'components/atoms/Button';
import { ModalHeading } from 'components/atoms/Heading';
import { StyledModal, ButtonContainer, IconContainer } from 'components/molecules/Modal'
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import Icon from 'components/atoms/Icon';
import { darkTheme } from 'theme/darkTheme';

const initialValues = {
  title: '',
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required(translate('EnterFirstNameAndLastName')),
});

const EditCategoryModal = ({
  refreshData,
  selectedCategoryName,
  selectedCategories,
  openEditModal,
  onClose,
}) => {
  const { notificationDispatch } = useNotificationContext();

  const onSubmit = (values) => {
    editCategory(values);
  };

  const editCategory = (addCategoryData) => {
    categoryService
      .editCategory(selectedCategories, addCategoryData);
    notificationDispatch({
      type: ADD,
      payload: {
        content: { success: 'OK', message: translate('CategoryEdited') },
        type: 'positive',
      },
    });
    refreshData();
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
      isOpen={openEditModal}
      onBackgroundClick={onClose}
      onEscapeKeydown={onClose}
    >
      <ModalHeading>{translate('EditCategoryTitle')}</ModalHeading>
      <IconContainer>
        <Icon fill ={darkTheme.colorGray80}name="union" size="1.2" cursorType="pointer" onClick={onClose} />
      </IconContainer>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
        {({ errors, touched, values }) => (
          <Form>
            <InputContainer>
              <Label type="top" text={translate('Title')} required>
                <Field typeInput="light" placeholder={selectedCategoryName} type="text" name="title" as={Input} error={errors.name && touched.name} />
              </Label>
            </InputContainer>
            <ButtonContainer>
              <Button type="submit" buttonType="primary" size="lg">{translate('EditCategory')}</Button>
            </ButtonContainer>
          </Form>
        )}
      </Formik>
    </StyledModal>
  );
};

export default EditCategoryModal;
