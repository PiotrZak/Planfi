import React from 'react';
import Label from 'components/atoms/Label';
import Input from 'components/molecules/Input';
import Button from 'components/atoms/Button';
import AuthTemplate from 'templates/AuthTemplate';
import ErrorMessageForm from 'components/atoms/ErrorMessageForm';
import InputContainer from 'components/atoms/InputContainerForm';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import BackTopNav from 'components/molecules/BackTopNav';
import Center from 'components/atoms/Center';
import { translate } from 'utils/Translation';
import { accountService } from '../../services/accountServices';
import { useNotificationContext, ADD } from '../../support/context/NotificationContext';

const initialValues = {
  email: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email(translate('EnterValidEmail')).required(translate('ThisFieldIsRequired')),
});

const ForgotPasswordPage = () => {
  const { notificationDispatch } = useNotificationContext();

  const onSubmit = (values) => {

    accountService
        .forgotPassword({email: values.email})
        .then(() => {
            notificationDispatch({
              type: ADD,
              payload: {
                content: { success: 'OK', message: 'Email sended to your e-mail!' },
                type: 'positive'
              }
            })
        })
        .catch((error) => {
          notificationDispatch({
            type: ADD,
            payload: {
              content: { success: 'OK', message: 'Couldnt find user' },
              type: 'error'
            }
          })
        });
  };

  return(
  <AuthTemplate>
    <BackTopNav text={translate('ForgotPassword')} />
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
      {({ errors, touched }) => (
        <Center place="authForm">
          <Form>
            <InputContainer>
              <Label type="top" text={translate('EmailAddress')}>
                <Field type="email" name="email" placeholder={translate('YourMail')} as={Input} error={errors.email && touched.email && true} />
              </Label>
              <ErrorMessageForm name="email" />
            </InputContainer>
            <Button type="submit" buttonType="primary" size="lg" buttonPlace="auth">{translate('Send')}</Button>
          </Form>
        </Center>
      )}
    </Formik>
  </AuthTemplate>
)};

export default ForgotPasswordPage;
