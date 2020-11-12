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
        localStorage.setItem('user', JSON.stringify(data));
        // if (data.role === "Trainer") {
        //     history.push('/users');
        // }
        // else if(data.role === "Organization") {
        //     history.push('/users');
        // }
        // else if(data.role === "User"){
        //     history.push(`/user/${data.userId}`);
        // }
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
              <Field type="email" name="email" placeholder={translate('AdresEmail')} as={Input} />
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
