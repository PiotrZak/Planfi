import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux'
import { Formik, Field, Form } from 'formik';
import { validationUtil } from "utils/validation.util"
import Label from 'components/atoms/Label';
import Input from 'components/molecules/Input';
import { planService } from "services/planService";
import { StyledModal } from 'components/molecules/Modal'
import Button from "components/atoms/Button"
import { userContext } from 'App';
import * as Yup from 'yup';
import { translate } from 'utils/Translation';
import {ModalHeading} from 'components/atoms/Heading';
import InputContainer from 'components/atoms/InputContainerForm';
import { useUserContext } from '../../support/context/UserContext';

const AddPlanTitle = "Add a Plan";
const AddPlanTip = "When naming a Plan, it is worth using names related to specific parts of the body, for example 'Back'";
const AddPlanButton = "Create Plan";

const initialValues = {
    title: '',
};

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required(translate('AddPlanTitle')),
});

const AddPlanModal = ({ openModal, onClose }) => {

    const { user } = useUserContext(userContext);

    const requiredFields = ["title"];

    const onSubmit = (values) => {
        createPlan(values)
    }
    
    const createPlan = (addPlanData) => {        
        const transformedData = {title: addPlanData.title, organizationId: user.organizationId, creatorId: user.userId, creatorName: user.firstName}
        planService
            .addPlan(transformedData)
            .then(() => {
                onClose()
            })
            .catch((error) => {
            });
    }

    return (
        <StyledModal isOpen={openModal}
        onBackgroundClick={onClose}
        onEscapeKeydown={onClose}>
        <ModalHeading>{translate('AddPlanTitle')}</ModalHeading>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
            {({ errors, touched, values }) => (
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
}

export default AddPlanModal;