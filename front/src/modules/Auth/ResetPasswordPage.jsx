import React from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import Label from 'components/atoms/Label';
import Input from 'components/molecules/Input';
import Button from 'components/atoms/Button';
import { routes } from 'utils/routes';
import AuthTemplate from 'templates/AuthTemplate';
import ErrorMessageForm from 'components/atoms/ErrorMessageForm';
import InputContainer from 'components/atoms/InputContainerForm';
import {
  Formik, Field, Form,
} from 'formik';
import * as Yup from 'yup';
import BackTopNav from 'components/molecules/BackTopNav';
import Center from 'components/atoms/Center';
import { translate } from 'utils/Translation';
import ValidateInvalidData from 'components/atoms/ValidateInvalidData';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import { accountService } from 'services/accountServices';

const initialValues = {
  password: '',
  confirmPassword: '',
};

const PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/;

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .matches(PASSWORD_REGEX, translate('PasswordNeedsCondition'))
    .max(32, translate('PasswordMaxLength'))
    .required(translate('FillAllFields')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], translate('PasswordsNotSame'))
    .required(translate('FillAllFields')),
});

const StyledInputContainer = styled(InputContainer)`
  height: 12.5rem;
`;

const ResetPasswordPage = () => {
  const timeToRedirect = 5000;
  const { resetToken } = useParams();
  const { notificationDispatch } = useNotificationContext();
  const history = useHistory();

  const onSubmit = (values) => {
    const resetPasswordModel = {
      token: resetToken.substring(1),
      password: values.password,
    };

    // todo - repair
    accountService
      .resetPassword(resetPasswordModel)
      .then(() => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: 'OK', message: translate('PasswordChanged') },
            type: 'positive',
          },
        });
        setTimeout(() => {
          history.push({
            pathname: routes.confirmation,
            state: { message: 'ResetPassword' },
          });
        }, timeToRedirect);
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
    <AuthTemplate>
      <BackTopNav text={translate('PasswordRecovery')} />
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
        {({ errors, touched, isValid }) => (
          <Center place="authForm">
            <Form>
              <StyledInputContainer>
                <Label type="top" text={translate('EnterNewPassword')}>
                  <Field type="password" name="password" as={Input} error={errors.password && touched.password} />
                </Label>
                <ValidateInvalidData errors={errors} touched={touched} text={translate('PasswordRequirements')} inputName="password" />
              </StyledInputContainer>
              <InputContainer>
                <Label type="top" text={translate('RepeatNewPassword')}>
                  <Field type="password" name="confirmPassword" as={Input} error={errors.confirmPassword && touched.confirmPassword} />
                </Label>
                <ErrorMessageForm name="confirmPassword" />
              </InputContainer>
              <Button type="submit" buttonType="primary" size="lg" buttonPlace="auth" disabled={!isValid}>{translate('Send')}</Button>
            </Form>
          </Center>
        )}
      </Formik>
    </AuthTemplate>
  );
};

export default ResetPasswordPage;
