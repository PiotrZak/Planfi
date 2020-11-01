import React from 'react';
import styled from 'styled-components';
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
import BackTopNav from 'components/molecules/BackTopNav';
import Center from 'components/atoms/Center';
import Paragraph from 'components/atoms/Paragraph';

const initialValues = {
  password: '',
  confirmPassword: '',
};

const onSubmit = (values) => {
  console.log('values', values);
};

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$/gm;

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .matches(passwordRegex, 'Hasło musi spełniać powyższy warunek')
    .min(8, 'Hasło musi zawieniać minimum 8 znaków !')
    .max(32, 'Hasło nie może zawierać wiecej niz 32 znaki !')
    .required('Uzupełnij wszystkie pola'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Podane hasła nie są takie same !')
    .required('Uzupełnij wszystkie pola!'),
});

const StyledInputContainer = styled(InputContainer)`
  height: 12.5rem;
`;

const ResetPasswordPage = () => (
  <AuthTemplate>
    <BackTopNav text="Przywracanie hasła" />
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
      {({ errors, touched }) => (
        <Center place="authForm">
          <Form>
            <StyledInputContainer>
              <Label type="top" text="Podaj nowe hasło">
                <Field type="password" name="password" as={Input} error={errors.password && touched.password} />
              </Label>
              <Paragraph type="body-3-regular">
                Hasło musi mieć conajmniej 8 znaków w tym jedną dużą literę i jeden znak
                specjalny
              </Paragraph>
            </StyledInputContainer>
            <InputContainer>
              <Label type="top" text="Powtórz nowe hasło">
                <Field type="password" name="confirmPassword" as={Input} error={errors.confirmPassword && touched.confirmPassword} />
              </Label>
              <ErrorMessageForm name="password" />
              <ErrorMessageForm name="confirmPassword" />
            </InputContainer>
            <Button type="submit" buttonType="primary" size="lg" buttonPlace="auth">Wyślij</Button>
          </Form>
        </Center>
      )}
    </Formik>
  </AuthTemplate>
);

export default ResetPasswordPage;
