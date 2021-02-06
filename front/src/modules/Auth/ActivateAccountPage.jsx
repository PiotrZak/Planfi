import React, { useEffect, useState } from 'react';
import ValidationHint from 'components/atoms/ErrorMessageForm';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Label from 'components/atoms/Label';
import Input from 'components/molecules/Input';
import Button from 'components/atoms/Button';
import AuthTemplate from 'templates/AuthTemplate';
import ErrorMessageForm from 'components/atoms/ErrorMessageForm';
import InputContainer from 'components/atoms/InputContainerForm';
import ValidateInvalidData from 'components/atoms/ValidateInvalidData';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Center from 'components/atoms/Center';
import Paragraph from 'components/atoms/Paragraph';
import Checkbox, { CHECKBOX_TYPE } from 'components/atoms/Checkbox';
import { routes } from 'utils/routes';
import { translate } from 'utils/Translation';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import Heading from 'components/atoms/Heading';
import { accountService } from 'services/accountServices';
import PhoneInput from 'react-phone-input-2'

const initialValues = {
  name: '',
  phone: '',
  password: '',
  confirmPassword: '',
  privacy: false,
};

//todo exclude Regexes to common function
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


const Container = styled.div`
  display: flex;
  margin-bottom:2.6rem;
`;

const PhoneInputContainer = styled.div`
  input{
    width:100% !important;
    outline: none !important;
    border-radius: 3px !important;
    font-weight: 400 !important;
    font-size: 1.4rem !important;
    line-height: 2.1rem !important;
    color: #FFFFFF !important;
    background: ${({ theme }) => theme.colorGray80} !important;
    border: 1px solid #666674 !important;
}
li.search, ul.country-list, .selected-flag{
  background: ${({ theme }) => theme.colorGray80} !important;
}
li.country.highlight {
  background: ${({ theme }) => theme.colorGray60} !important;
}
  .flag-dropdown{
    border: 1px solid #666674 !important;
  }
  }
`

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
  useEffect(() => {
  }, []);

  const [phoneNumber, setPhoneNumber] = useState();
  const { verificationToken } = useParams();
  const { notificationDispatch } = useNotificationContext();
  const history = useHistory();

  const onSubmit = (values) => {
    const arrayOfSplitted = values.name.split(/[ ,]+/);
    const firstName = arrayOfSplitted[0];
    const lastName = arrayOfSplitted[1];

    const activateUserModel = {
      firstName,
      lastName,
      phoneNumber: phoneNumber,
      password: values.confirmPassword,
      verificationToken: verificationToken.substring(1),
    };
    activateUser(activateUserModel);
  };

  const timeToRedirect = 1500;

  const activateUser = (activateUserModel) => {
    accountService
      .activate(activateUserModel)
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data));
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: 'OK', message: translate('ActivateAccountSuccess') },
            type: 'positive',
          },
        });
        setTimeout(() => {
          history.push({
            pathname: '/confirmation',
            state: { message: 'Activation' },
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
              <InputContainer>
                <Label type="top" text={translate('EnterNewPassword')} required>
                  <Field type="password" name="password" as={Input} error={errors.password && touched.password} />
                </Label>
                <ValidateInvalidData errors={errors} touched={touched} text={translate('PasswordRequirements')} inputName="password" />
              </InputContainer>
              <InputContainer>
                <Label type="top" text={translate('RepeatNewPassword')} required>
                  <Field type="password" name="confirmPassword" as={Input} error={errors.confirmPassword && touched.confirmPassword} />
                </Label>
                <ErrorMessageForm name="confirmPassword" />
              </InputContainer>
              <InputContainer>
              <PhoneInputContainer>
                <Label type="top" text={translate('Phone')}>
                  <PhoneInput
                    enableSearch={true}
                    typeInput="light"
                    country={'pl'}
                    name="phone"
                    value={'test'}
                    as={Input}
                    error={errors.name && touched.name}
                    onChange={phone => setPhoneNumber(phone)}
                  />
                   </Label>
                  </PhoneInputContainer>
                <ValidationHint name="phone" />
              </InputContainer>
              <Container>
                <CheckboxContainer>
                  <Checkbox
                    checkboxType={CHECKBOX_TYPE.FORMIK}
                    type="checkbox"
                    name="privacy"
                    checked={values.privacy}
                  />
                </CheckboxContainer>
                <ValidateInvalidData
                  errors={errors}
                  touched={touched}
                  text={translate('Required')}
                  />
                <Paragraph
                  type="small-tag"
                  inputName="privacy"
                />
                <Paragraph
                  type="small-tag"
                  inputName="privacy"
                >
                {translate('PolicyPrivacy')}
                </Paragraph>
                <Link href={routes.privacy}>{translate('Here')}</Link>
              </Container>
              <Button type="submit" buttonType="primary" size="lg" buttonPlace="bottom">{translate('Save')}</Button>
            </Form>
          </Center>
        )}
      </Formik>
    </AuthTemplate>
  );
};

export default ActivateAccountPage;
