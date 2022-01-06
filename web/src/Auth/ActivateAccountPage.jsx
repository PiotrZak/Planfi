import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
// mui
import Button from '@mui/material/Button';

import { routes } from 'index'
import Heading from './AuthComponents/Heading'
import Paragraph from './AuthComponents/Paragraph'
import Label from './AuthComponents/Label'
import Input from './AuthComponents/Input'
import Center from './AuthComponents/Center'
import InputContainer from './AuthComponents/InputContainer'
import Checkbox, { CHECKBOX_TYPE }  from './AuthComponents/Checkbox'
import ValidationHint from './AuthComponents/ErrorMessageForm'
import ValidateInvalidData from './AuthComponents/ValidateInvalidData'

import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { translate } from './Translation'

import { accountService } from './services/accountServices'
import PhoneInput from 'react-phone-input-2'
import AuthTemplate from './AuthTemplate';

//todo exclude Regexes to common function
const nameRegex = /^[a-zA-Z]{3,20} [a-zA-Z]{2,32}$/
const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
const passwordRegex =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(nameRegex)
    .required(translate('EnterFirstNameAndLastName')),
  phone: Yup.string().matches(phoneRegex),
  password: Yup.string()
    .matches(passwordRegex, translate('PasswordNeedsCondition'))
    .max(32, translate('PasswordMaxLength'))
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], translate('PasswordsNotSame'))
    .required(translate('RepeatPassword')),
  privacy: Yup.boolean().oneOf([true], translate('MustAcceptPrivacy')),
})

const Container = styled.div`
  display: flex;
  margin-bottom: 2.6rem;
`

const Link = styled.a`
  color: ${({ theme }) => theme.colorPrimaryDefault};
  text-decoration: none;
  text-align: center;
  margin-top: 1.4rem;
  margin-left: 0.5rem;
  cursor: pointer;

  &:visited {
    color: ${({ theme }) => theme.colorPrimaryDefault};
  }
`

const CheckboxContainer = styled.div`
  margin-top: 0.8rem;
  margin-right: 0.5rem;
`

const ActivateAccountPage = () => {
  useEffect(() => {}, [])

  const [phoneNumber, setPhoneNumber] = useState()
  const { verificationToken } = useParams()
  const navigate = useNavigate()

  const onSubmit = (values) => {
    const arrayOfSplitted = values.name.split(/[ ,]+/)
    const firstName = arrayOfSplitted[0]
    const lastName = arrayOfSplitted[1]

    const activateUserModel = {
      firstName,
      lastName,
      phoneNumber: phoneNumber,
      password: values.confirmPassword,
      verificationToken: verificationToken.substring(1),
    }
    activateUser(activateUserModel)
  }

  const timeToRedirect = 1500

  const activateUser = (activateUserModel) => {
    accountService
      .activate(activateUserModel)
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data))
        setTimeout(() => {
          navigate({
            pathname: '/confirmation',
            state: { message: 'Activation' },
          })
        }, timeToRedirect)
      })
      .catch((error) => {
      })
  }

  const validate = (values) => {
    const errors = {}

    // if(phoneNumber.test(phoneRegex)){
    //   errors.phoneNumber = 'Wrong format';
    // }

    if (phoneNumber === undefined) {
      errors.phoneNumber = 'PhoneNumber is required'
    }
    return errors
  }

  return (
    <AuthTemplate>
      <Heading>{translate('ActivateAccount')}</Heading>
      <Paragraph type="body-2-regular">{translate('EmailLoginInfo')}</Paragraph>
      <Formik
        validate={validate}
        initialValues={{
          name: '',
          phone: '',
          password: '',
          confirmPassword: '',
          privacy: false,
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={false}
      >
        {({ errors, touched, values }) => (
          <Center place="auth">
            <Form>
              <InputContainer>
                <Label
                  type="top"
                  text={translate('EnterYourFirstNameAndLastName')}
                  required
                >
                  <Field
                    type="text"
                    name="name"
                    as={Input}
                    error={errors.name && touched.name}
                  />
                </Label>
                <ValidateInvalidData
                  errors={errors}
                  touched={touched}
                  text={translate('FirstNameAndLastNameMustSpace')}
                  inputName="name"
                />
              </InputContainer>
              <InputContainer>
                <Label type="top" text={translate('EnterNewPassword')} required>
                  <Field
                    type="password"
                    name="password"
                    as={Input}
                    error={errors.password && touched.password}
                  />
                </Label>
                <ValidateInvalidData
                  errors={errors}
                  touched={touched}
                  text={translate('PasswordRequirements')}
                  inputName="password"
                />
              </InputContainer>
              <InputContainer>
                <Label
                  type="top"
                  text={translate('RepeatNewPassword')}
                  required
                >
                  <Field
                    type="password"
                    name="confirmPassword"
                    as={Input}
                    error={errors.confirmPassword && touched.confirmPassword}
                  />
                </Label>
                <ValidationHint name="confirmPassword" />
              </InputContainer>
              <InputContainer>
                <Label type="top" text={translate('Phone')}>
                  <PhoneInput
                    enableSearch={true}
                    typeInput="light"
                    country={'pl'}
                    name="phone"
                    value={'test'}
                    as={Input}
                    error={errors.name && touched.name}
                    onChange={(phone) => setPhoneNumber(phone)}
                  />
                  {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
                </Label>
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
                <Paragraph type="small-tag" inputName="privacy" />
                <Paragraph type="small-tag" inputName="privacy">
                  {translate('PolicyPrivacy')}
                </Paragraph>
                <Link href={routes.privacy}>{translate('Here')}</Link>
              </Container>
              <Button
              >
                {translate('Save')}
              </Button>
            </Form>
          </Center>
        )}
      </Formik>
    </AuthTemplate>
  )
}

export default ActivateAccountPage
