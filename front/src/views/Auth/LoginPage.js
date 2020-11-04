import React from 'react';
import styled from 'styled-components';
import { routes } from 'utils/routes';
import Label from 'components/atoms/Label';
import Input from 'components/molecules/Input';
import Button from 'components/atoms/Button';
import AuthTemplate from 'templates/AuthTemplate';
import ErrorMessageForm from 'components/atoms/ErrorMessageForm';
import InputContainer from 'components/atoms/InputContainerForm';
import {
  Formik, Field, Form,
} from 'formik';
import * as Yup from 'yup';
import Logo from 'components/atoms/Logo';
import { translate } from 'utils/Translation';

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

const onSubmit = (values) => {
  console.log('Form values', values);
};

const LoginPage = () => (
  <AuthTemplate>
    <Logo src="logo.png" />
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
      {({ errors, touched }) => (
        <Form>
          <InputContainer>
            <Label type="top" text={translate('YourMail')}>
              <Field type="email" name="email" placeholder={translate('EmailAddress')} as={Input} error={errors.email && touched.email} />
            </Label>
            <ErrorMessageForm name="email" />
          </InputContainer>

          <InputContainer>
            <Label type="top" text={translate('Password')}>
              <Field type="password" name="password" placeholder={translate('EnterPassword')} as={Input} error={errors.password && touched.password} />
            </Label>
            <ErrorMessageForm name="password" />
          </InputContainer>
          <Button type="submit" buttonType="primary" size="lg" buttonPlace="auth">{translate('SignIn')}</Button>
        </Form>
      )}
    </Formik>
    <Link href={routes.forgotPassword}>{translate('ForgotPassword')}</Link>
  </AuthTemplate>
);

export default LoginPage;
