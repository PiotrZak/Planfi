import React from 'react';
import InputContainer from 'components/atoms/InputContainerForm';
import Label from 'components/atoms/Label';
import Input from 'components/molecules/Input';
import { translate } from 'utils/Translation';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { categoryService } from '../../services/categoryService';
import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';
import { StyledModal } from 'components/molecules/Modal'
import { useNotificationContext, ADD } from 'support/context/NotificationContext';

const CategoriesDeleted = 'Categories finally deleted!'
const AddExerciseToCategory = 'To be able to add exercises you need to add a category first';
const DeleteCategoriesText = "Delete categories"
const AddCategoryTitle = "Add a category";
const addCategoryTip = "When naming a category, it is worth using names related to specific parts of the body, for example 'Back'";
const addCategoryButton = "Create Category";

const initialValues = {
    title: '',
};

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required(translate('EnterFirstNameAndLastName')),
});

const EditCategoryModal = ({ selectedCategories, openModal, onClose, theme }) => {

    const { notificationDispatch } = useNotificationContext();

    const onSubmit = (values) => {
        editCategory(values)
    }

    const editCategory = (addCategoryData) => {
        categoryService
            .editCategory(addCategoryData)
        notificationDispatch({
            type: ADD,
            payload: {
                content: { success: 'OK', message: translate('CategoryAdded') },
                type: 'positive'
            }
        })
        onClose()
            .then(() => {
            })
            .catch((error) => {
                notificationDispatch({
                    type: ADD,
                    payload: {
                        content: { error: error, message: translate('ErrorAlert') },
                        type: 'error'
                    }
                })
            });
    }

    return (
        <StyledModal isOpen={openModal}
            onBackgroundClick={onClose}
            onEscapeKeydown={onClose}>
            <Heading>{translate('EditCategoryTitle')}</Heading>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
                {({ errors, touched, values }) => (
                    <Form>
                        <InputContainer>
                            <Label type="top" text={translate('EnterYourFirstNameAndLastName')} required>
                                <Field placeholder = {'test'} type="text" name="title" as={Input} error={errors.name && touched.name} />
                            </Label>
                        </InputContainer>
                        <Button type="submit" buttonType="primary" size="lg">{translate('Save')}</Button>
                    </Form>
                )}
            </Formik>
        </StyledModal>
    );
}

export default EditCategoryModal;