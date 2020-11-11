import React, { useState } from 'react';
import InputContainer from 'components/atoms/InputContainerForm';
import Label from 'components/atoms/Label';
import styled from 'styled-components';
import Input from 'components/molecules/Input';
import { translate } from 'utils/Translation';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { categoryService } from '../../services/categoryService';
import ValidateInvalidData from 'components/atoms/ValidateInvalidData';
import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';
import Center from 'components/atoms/Center';
import { StyledModal } from 'components/molecules/Modal'

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

const AddCategoryModal = ({ openModal, onClose, theme }) => {

    const onSubmit = (values) => {
        createCategory(values)
    }

    const createCategory = (addCategoryData) => {
        console.log(addCategoryData)
        categoryService
            .addCategory(addCategoryData)
            onClose()
            .then(() => {
            })
            .catch((error) => {
            });
    }

    return (
        <StyledModal isOpen={openModal}
            onBackgroundClick={onClose}
            onEscapeKeydown={onClose}>
            <Heading>{translate('AddCategoryTitle')}</Heading>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
                {({ errors, touched, values }) => (
                    <Form>
                        <InputContainer>
                            <Label type="top" text={translate('EnterYourFirstNameAndLastName')} required>
                                <Field type="text" name="title" as={Input} error={errors.name && touched.name} />
                            </Label>
                        </InputContainer>
                        <Button type="submit" buttonType="primary" size="lg">{translate('Save')}</Button>
                    </Form>
                )}
            </Formik>
        </StyledModal>
    );
}

export default AddCategoryModal;