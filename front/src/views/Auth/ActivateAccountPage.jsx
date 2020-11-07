import React, {useEffect} from 'react';
import styled from 'styled-components';
import Label from 'components/atoms/Label';
import Input from 'components/molecules/Input';
import Button from 'components/atoms/Button';
import AuthTemplate from 'templates/AuthTemplate';
import ErrorMessageForm from 'components/atoms/ErrorMessageForm';
import InputContainer from 'components/atoms/InputContainerForm';
import ValidateInvalidData from 'components/atoms/ValidateInvalidData';
import {
  Formik, Field, Form,
} from 'formik';
import * as Yup from 'yup';
import Center from 'components/atoms/Center';
import Paragraph from 'components/atoms/Paragraph';
import Checkbox from 'components/atoms/Checkbox';
import { routes } from 'utils/routes';
import { translate } from 'utils/Translation';
import { userService } from 'services/userServices';
import { useNotificationContext, ADD } from '../../support/context/NotificationContext';

const initialValues = {
  name: '',
  phone: '',
  password: '',
  confirmPassword: '',
  privacy: false,
};

const nameRegex = /^[a-zA-Z]{3,20} [a-zA-Z]{2,32}$/;
const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(nameRegex)
    .required(translate('EnterFirstNameAndLastName')),
  phone: Yup.string()
    .matches(phoneRegex),
  password: Yup.string()
    .matches(passwordRegex, translate('PasswordNeedsCondition'))
    .max(32, translate('PasswordMaxLength'))
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], translate('PasswordsNotSame'))
    .required(translate('RepeatPassword')),
  privacy: Yup.boolean()
    .oneOf([true], translate('MustAcceptPrivacy')),
});

const StyledInputContainer = styled(InputContainer)`
  height: 13rem;
`;

const StyledInputPhoneContainer = styled(InputContainer)`
  margin-top: 2rem;
`;

const Heading = styled.h3`
  margin: 2.5rem 0 0 0;
`;

const Container = styled.div`
  display: flex;
`;

const Link = styled.a`
  color: ${({ theme }) => theme.colorPrimaryDefault};
  text-decoration: none;
  text-align: center;
  margin-top: 1.4rem;
  margin-left: .5rem;
  cursor: pointer;

  &:visited{
    color: ${({ theme }) => theme.colorPrimaryDefault};
  }
`;

const CheckboxContainer = styled.div`
  margin-top: .8rem;
  margin-right: .5rem;
`;

const ActivateAccountPage = () => {

  const { notificationDispatch } = useNotificationContext();
  const onSubmit = (values) => {
  const arrayOfSplitted = values.name.split(/[ ,]+/);
  const firstName = arrayOfSplitted[0];
  const lastName = arrayOfSplitted[1];

  const activateUserModel = {
    firstName: firstName,
    lastName: lastName,
    phoneNumber: values.phoneNumber,
    password: values.confirmPassword,
    verificationToken: "B3A40A8E0E206572BE6357E0FD72BCEF4585B8210FBE99AF688834AB2C02049A5EBC459EF352F3F3"
  }
  activateUser(activateUserModel)
}

const activateUser = (activateUserModel) => {
  
  userService
      .activate(activateUserModel)
      .then((data) => {
          localStorage.setItem('user', JSON.stringify(data));
          notificationDispatch({
            type: ADD,
            payload: {
              content: { success: 'OK', message: 'Hello World' },
              type: 'warning'
            }
          })
      })
      .catch((error) => {
        console.error(error)
      });
}

return(
  <AuthTemplate>
    <Heading>{translate('ActivateAccount')}</Heading>
    <Paragraph type="body-2-regular">{translate('EmailLoginInfo')}</Paragraph>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
      {({ errors, touched, values }) => (
        <Center place="auth">
          <Form>
            <InputContainer>
              <Label type="top" text={translate('EnterYourFirstNameAndLastName')} required>
                <Field type="text" name="name" as={Input} error={errors.name && touched.name} />
              </Label>
              <ValidateInvalidData errors={errors} touched={touched} text={translate('FirstNameAndLastNameMustSpace')} inputName="name" />
            </InputContainer>
            <StyledInputPhoneContainer>
              <Label type="top" text={translate('EnterPhoneNumber')}>
                <Field type="text" name="phone" as={Input} error={errors.phone && touched.phone} />
              </Label>
            </StyledInputPhoneContainer>
            <StyledInputContainer>
              <Label type="top" text={translate('EnterNewPassword')} required>
                <Field type="password" name="password" as={Input} error={errors.password && touched.password} />
              </Label>
              <ValidateInvalidData errors={errors} touched={touched} text={translate('PasswordRequirements')} inputName="password" />
            </StyledInputContainer>
            <InputContainer  >
              <Label type="top" text={translate('RepeatNewPassword')} required>
                <Field type="password" name="confirmPassword" as={Input} error={errors.confirmPassword && touched.confirmPassword} />
              </Label>
              <ErrorMessageForm name="confirmPassword" />
            </InputContainer>
            <Container>
              <CheckboxContainer>
                <Checkbox
                  checkboxType="formik"
                  type="checkbox"
                  name="privacy"
                  checked={values.privacy}
                />
              </CheckboxContainer>
              <ValidateInvalidData
                errors={errors}
                touched={touched}
                text={translate('PolicyPrivacy')}
                inputName="privacy"
              />
              <Link href={routes.privacy}>{translate('Here')}</Link>
            </Container>
            <Button type="submit" buttonType="primary" size="lg" buttonPlace="auth">{translate('Save')}</Button>
          </Form>
        </Center>
      )}
    </Formik>
  </AuthTemplate>
)};

export default ActivateAccountPage;
