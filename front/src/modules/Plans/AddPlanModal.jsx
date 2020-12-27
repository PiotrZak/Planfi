import React from 'react';
import { Formik, Field, Form } from 'formik';
import Label from 'components/atoms/Label';
import Input from 'components/molecules/Input';
import { planService } from "services/planService";
import { StyledModal } from 'components/molecules/Modal'
import Button from "components/atoms/Button"
import { userContext } from 'App';
import * as Yup from 'yup';
import { translate } from 'utils/Translation';
import styled from 'styled-components';
import { ModalHeading } from 'components/atoms/Heading';
import InputContainer from 'components/atoms/InputContainerForm';
import { useUserContext } from '../../support/context/UserContext';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import ValidationHint from 'components/atoms/ErrorMessageForm';
import Icon from 'components/atoms/Icon';
import Paragraph from 'components/atoms/Paragraph';

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const initialValues = {
    title: '',
};

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required(translate('AddPlanTitle')),
});

const AddPlanModal = ({ openModal, onClose }) => {

    const { notificationDispatch } = useNotificationContext();
    const { user } = useUserContext(userContext);

    const onSubmit = (values) => {
        const transformedData = { title: values.title, organizationId: user.organizationId, creatorId: user.userId, creatorName: user.firstName }
        planService
            .addPlan(transformedData)
            .then(() => {
                notificationDispatch({
                    type: ADD,
                    payload: {
                        content: { success: 'OK', message: translate('PlanAdded') },
                        type: 'positive'
                    }
                })
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
            <IconContainer>
                <Icon name="Union" size="1.2" cursorType="pointer" onClick={onClose} />
            </IconContainer>
            <ModalHeading>{translate('AddPlanTitle')}</ModalHeading>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
                {({ errors, touched, isValid }) => (
                    <Form>
                        <InputContainer>
                            <Label type="top" text={translate('PlanTitle')} required>
                                <Field type="text" name="title" as={Input} error={errors.name && touched.name} />
                            </Label>
                        </InputContainer>
                        <ValidationHint name="title" />
                        <Paragraph type="body-3-regular">{translate('AddCategoryModalDescription')}</Paragraph>
                        <ButtonContainer>
                            <Button type="submit" buttonType="primary" size="md" disabled={!isValid}>{translate('AddPlanButton')}</Button>
                        </ButtonContainer>
                    </Form>
                )}
            </Formik>
        </StyledModal>
    );
}

export default AddPlanModal;