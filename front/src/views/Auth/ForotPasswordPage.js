import React from 'react';
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
import BackTopNav from 'components/molecules/BackTopNav';
import Center from 'components/atoms/Center';

const initialValues = {
  email: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Wpisano błędny adres e-mail').required('To pole jest wymagane'),
});

const onSubmit = (values) => {
  console.log('Form values', values);
};

const ForgotPasswordPage = () => (
  <AuthTemplate>
    <BackTopNav text="Zapomniałem hasła" />
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
      <Center place="authForm">
        <Form>
          <InputContainer>
            <Label type="top" text="Twój adres e-mail">
              <Field type="email" name="email" placeholder="Podaj swój e-mail" as={Input} />
            </Label>
            <ValidationHint name="email" />
          </InputContainer>
          <Button type="submit" buttonType="primary" size="lg" buttonPlace="auth">Wyślij</Button>
        </Form>
      </Center>
    </Formik>
  </AuthTemplate>
);

export default ForgotPasswordPage;
