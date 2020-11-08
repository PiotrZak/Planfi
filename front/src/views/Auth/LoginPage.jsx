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
import { useHistory } from "react-router-dom";
import { translate } from 'support/Translation';
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
  email: Yup.string().email(translate('EnterValidMail')).required(translate('Thisfieldisrequired')),
  password: Yup.string().required(translate('Thisfieldisrequired')),
});

const onSubmit = (values) => {
  console.log('Form values', values);
};

const LoginPage = () => {

const [userData, setUserData] = useState({})
const history = useHistory();

  const handleInput = (e) => {
    let name = e.target.name
    userData[name] = e.target.value;
    setUserData(userData);
}

const submitForm = () => {
  authenticateUser(userData)
}

const authenticateUser = (userData) => {
  userService
      .login(userData)
      .then((data) => {

        //todo - alerts
          // dispatch(alertActions.success(translate('CongratulationsLogin')))
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
      });
}


return(
   <AuthTemplate>
    <Logo src="logo.png" />
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
      <Form>
        <InputContainer onChange={handleInput} >
          <Label type="top" text={translate('YourMail')}>
            <Field type="email" name="email" placeholder={translate('AdresEmail')} as={Input} />
          </Label>
          <ValidationHint name="email" />
        </InputContainer>

        <InputContainer onChange={handleInput}>
          <Label type="top" text={translate('Password')}>
            <Field type="password" name="password" placeholder={translate('EnterPassword')} as={Input} />
          </Label>
          <ValidationHint name="password" />
        </InputContainer>
        <Button onClick={submitForm} type="submit" buttonType="primary" size="lg" buttonPlace="auth">{translate('SignIn')}</Button>
      </Form>
    </Formik>
    <Link href={routes.forgotPassword}>{translate('ForgotPassword')}</Link>
  </AuthTemplate>
)};

export default LoginPage;
