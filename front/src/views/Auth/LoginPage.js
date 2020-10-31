import React from 'react';
import styled from 'styled-components';
import { routes } from 'routes';
import Label from 'components/atoms/Label';
import Input from 'components/molecules/Input';
import Button from 'components/atoms/Button';
import AuthTemplate from 'templates/AuthTemplate';
import ValidationHint from 'components/atoms/ErrorMessageForm';
import InputContainer from 'components/atoms/InputContainerForm';
import {
  Formik, Field, Form,
} from 'formik';
import * as Yup from 'yup';
import Logo from 'components/atoms/Logo';

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
  email: Yup.string().email('Podaj poprawny adres E-mail').required('To pole jest wymagane'),
  password: Yup.string().required('To pole jest wymagane'),
});

const onSubmit = (values) => {
  console.log('Form values', values);
};

const LoginPage = () => (
  <AuthTemplate>
    <Logo src="logo.png" />
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
      <Form>
        <InputContainer>
          <Label type="top" text="Twój adres e-mail">
            <Field type="email" name="email" placeholder="Adres E-mail" as={Input} />
          </Label>
          <ValidationHint name="email" />
        </InputContainer>

        <InputContainer>
          <Label type="top" text="Hasło">
            <Field type="password" name="password" placeholder="Wpisz swoje hasło" as={Input} />
          </Label>
          <ValidationHint name="password" />
        </InputContainer>
        <Button type="submit" buttonType="primary" size="lg" buttonPlace="auth">Zaloguj się</Button>
      </Form>
    </Formik>
    <Link href={routes.forgotPassword}>Zapomniałem hasła</Link>
  </AuthTemplate>
);

export default LoginPage;
