import React, { useState } from 'react';
import styled from 'styled-components';
import { routes } from 'routes';
import Label from 'components/atoms/Label';
import Input from 'components/molecules/Input';
import Button from 'components/atoms/Button';
import AuthTemplate from 'templates/AuthTemplate';
import ValidationHint from 'components/atoms/ErrorMessageForm';
import InputContainer from 'components/atoms/InputContainerForm';
import { userService } from 'services/userServices';
import { useHistory } from 'react-router-dom';
import { translate } from 'utils/Translation';
import {
  Formik, Field, Form,
} from 'formik';
import * as Yup from 'yup';
import Logo from 'components/atoms/Logo';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import { Role } from '../../utils/PrivateRoute';

const Link = styled.a`
  color: ${({ theme }) => theme.colorGray10};
  text-decoration: none;
  text-align: center;
  margin-top: 1.4rem;

  &:visited{
    color: ${({ theme }) => theme.colorGray10};
  }
`;

const initialValues = {
  email: '',
  password: '',
};

const timeToRedirectLogin = 3000;

const validationSchema = Yup.object({
  email: Yup.string().email(translate('EnterValidMail')).required(translate('ThisFieldIsRequired')),
  password: Yup.string().required(translate('ThisFieldIsRequired')),
});

const LoginPage = () => {
  const { notificationDispatch } = useNotificationContext();
  const history = useHistory();

  const onSubmit = (values) => {
    const loginModelData = {
      email: values.email,
      password: values.password,
    };
    authenticateUser(loginModelData);
  };

  const redirectToPage = (data) => {
    if (data.role === Role.User) {
      setTimeout(() => {
        history.push(`/user/${data.userId}`);
      }, timeToRedirectLogin);
    }
    if (data.role === Role.Trainer || data.role === Role.Owner) {
      setTimeout(() => {
        history.push('/users');
      }, timeToRedirectLogin);
    }
    if (data.role === Role.Owner) {
      setTimeout(() => {
        history.push(routes.organizationUsers);
      }, timeToRedirectLogin);
    }
  }

  const authenticateUser = (loginModelData) => {
    userService
      .login(loginModelData)
      .then((data) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: 'OK', message: translate('CongratulationsLogin') },
            type: 'positive',
          },
        });
        redirectToPage(data)
        localStorage.setItem('user', JSON.stringify(data));
      })
      .catch((error) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: error, message: translate('ErrorAlert') },
            type: 'error',
          },
        });
      });
  };

  return (
    <AuthTemplate>
      <Logo src="logo.png" />
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
        <Form>
          <InputContainer>
            <Label type="top" text={translate('YourMail')}>
              <Field type="email" name="email" placeholder={translate('EmailAddress')} as={Input} />
            </Label>
            <ValidationHint name="email" />
          </InputContainer>

          <InputContainer>
            <Label type="top" text={translate('Password')}>
              <Field type="password" name="password" placeholder={translate('EnterPassword')} as={Input} />
            </Label>
            <ValidationHint name="password" />
          </InputContainer>
          <Button type="submit" buttonType="primary" size="lg" buttonPlace="auth">{translate('SignIn')}</Button>
        </Form>
      </Formik>
      <Link href={routes.forgotPassword}>{translate('ForgotPassword')}</Link>
    </AuthTemplate>
  );
};

export default LoginPage;
