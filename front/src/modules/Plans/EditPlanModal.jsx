import React from 'react';
import InputContainer from 'components/atoms/InputContainerForm';
import Label from 'components/atoms/Label';
import { planService } from "services/planService";
import Input from 'components/molecules/Input';
import { translate } from 'utils/Translation';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Button from 'components/atoms/Button';
import {ModalHeading} from 'components/atoms/Heading';
import { StyledModal } from 'components/molecules/Modal'
import { useNotificationContext, ADD } from 'support/context/NotificationContext';

const initialValues = {
    title: '',
};

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required(translate('EnterFirstNameAndLastName')),
});

const EditPlanModal = ({ selectedPlans, openEditModal, onClose, theme }) => {
    const { notificationDispatch } = useNotificationContext();
    
    const onSubmit = (values) => {
        editPlan(values)
    }

    const editPlan = (editPlanData) => {

        const formData = new FormData();
        formData.append("Title", editPlanData.title)
        planService.editPlan(selectedPlans, formData)
        notificationDispatch({
            type: ADD,
            payload: {
                content: { success: 'OK', message: translate('PlanEdited') },
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
        <StyledModal isOpen={openEditModal}
            onBackgroundClick={onClose}
            onEscapeKeydown={onClose}>
            <ModalHeading>{translate('EditPlanTitle')}</ModalHeading>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
                {({ errors, touched, values }) => (
                    <Form>
                        <InputContainer>
                            <Label type="top" text={translate('EnterYourFirstNameAndLastName')} required>
                                <Field placeholder = {'test'} type="text" name="title" as={Input} error={errors.name && touched.name} />
                            </Label>
                        </InputContainer>
                        <Button type="submit" buttonType="primary" size="lg">{translate('EditPlan')}</Button>
                    </Form>
                )}
            </Formik>
        </StyledModal>
    );
}

export default EditPlanModal;