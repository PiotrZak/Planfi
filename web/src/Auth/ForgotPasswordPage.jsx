import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import AuthTemplate from './AuthTemplate';

import Center from './AuthComponents/Center'
import InputContainer from './AuthComponents/InputContainer'
import ErrorMessageForm from './AuthComponents/ErrorMessageForm'
import Label from './AuthComponents/Label'
import Input from './AuthComponents/Input'

import BackTopNav from './AuthComponents/BackTopNav'

import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'


import { translate } from './Translation'
import { accountService } from './services/accountServices'
import { routes } from 'index'

const initialValues = {
  email: '',
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email(translate('EnterValidEmail'))
    .required(translate('ThisFieldIsRequired')),
})

const ForgotPasswordPage = () => {
  const navigate = useNavigate()

  const onSubmit = (values) => {
    accountService
      .forgotPassword({ email: values.email })
      .then(() => {
        setTimeout(() => {
          navigate(routes.login)
        }, 1000)
      })
      .catch((error) => {
      })
  }

  return (
    <AuthTemplate>
      <BackTopNav text={translate('ForgotPassword')} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={false}
      >
        {({ errors, touched, isValid }) => (
          <Center place="authForm">
            <Form>
              <InputContainer>
                <Label type="top" text={translate('EmailAddress')}>
                  <Field
                    type="email"
                    name="email"
                    placeholder={translate('YourMail')}
                    as={Input}
                    error={errors.email && touched.email}
                  />
                </Label>
                <ErrorMessageForm name="email" />
              </InputContainer>
              <Button
              >
                {translate('Send')}
              </Button>
            </Form>
          </Center>
        )}
      </Formik>
    </AuthTemplate>
  )
}

export default ForgotPasswordPage
