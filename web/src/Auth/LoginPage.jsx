import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { routes } from 'index'
import Label from './AuthComponents/Label'
import Input from './AuthComponents/Input'
import Button from '@mui/material/Button';
import AuthTemplate from './AuthTemplate';
import InputContainer from './AuthComponents/InputContainer'
import ErrorMessageForm from './AuthComponents/ErrorMessageForm'
import { useNavigate } from 'react-router-dom';
import { translate } from './Translation'
import { userService } from './services/userService'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useCookies } from 'react-cookie'
import Loader from './AuthComponents/Loader'
import LoginHooks from './Google/LoginHooks'

const Link = styled.a`
  color: ${({ theme }) => theme.colorGray10};
  text-decoration: none;
  text-align: center;
  margin-top: 1.4rem;

  &:visited {
    color: ${({ theme }) => theme.colorGray10};
  }
`

const initialValues = {
  email: '',
  password: '',
}

const timeToRedirectLogin = 1000

const validationSchema = Yup.object({
  email: Yup.string()
    .email(translate('EnterValidMail'))
    .required(translate('ThisFieldIsRequired')),
  password: Yup.string().required(translate('ThisFieldIsRequired')),
})

const LoginPage = ({ setUser }) => {

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name'])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
  }, [])

  const onSubmit = (values) => {
    const loginModelData = {
      email: values.email,
      password: values.password,
    }
    authenticateUser(loginModelData)
  }

  const redirectToPage = (data) => {
    setTimeout(() => {
      navigate(routes.myProfile)
    }, timeToRedirectLogin)
  }

  const saveJWTInCookies = (data) => {
    setCookie('JWT', data.token, { path: '/' })
  }

  const authenticateUser = (loginModelData) => {
    setLoading(true)
    userService
      .login(loginModelData)
      .then((data) => {
        saveJWTInCookies(data)
        redirectToPage(data)
        localStorage.removeItem('user')
        delete data.token
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  }

  if (loading) return <Loader isLoading={loading} />

  return (
    <AuthTemplate>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={false}
      >
        {({ errors, touched, isValid }) => (
          <Form>
            <InputContainer>
              <Label type="top" text={translate('YourMail')}>
                <Field
                  type="email"
                  name="email"
                  placeholder={translate('EmailAddress')}
                  as={Input}
                  error={errors.email && touched.email}
                />
              </Label>
              <ErrorMessageForm name="pUemail" />
            </InputContainer>

            <InputContainer>
              <Label type="top" text={translate('Password')}>
                <Field
                  type="password"
                  name="password"
                  placeholder={translate('EnterPassword')}
                  as={Input}
                  error={errors.password && touched.password}
                />
              </Label>
              <ErrorMessageForm name="password" />
            </InputContainer>
            <Button
            >
              {translate('SignIn')}
            </Button>
          </Form>
        )}
      </Formik>
      <LoginHooks setUser = {setUser}/>
      <Link id ="forget-password" href={routes.forgotPassword}>{translate('ForgotPassword')}</Link>
    </AuthTemplate>
  )
}

export default LoginPage
