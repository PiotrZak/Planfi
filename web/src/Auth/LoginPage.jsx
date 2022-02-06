import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { routes } from 'index'
import Label from './AuthComponents/Label'
import Input from './AuthComponents/Input'
import Button from '@mui/material/Button';
import AuthTemplate from './AuthTemplate';
import ErrorMessageForm from './AuthComponents/ErrorMessageForm'
import { useNavigate } from 'react-router-dom';
import { translate } from './Translation'
import { userService } from './services/userService'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useCookies } from 'react-cookie'
import Loader from './AuthComponents/Loader'
import LoginHooks from './Google/LoginHooks'
import { useContext } from 'react'
import { UserContext } from 'contexts/UserContext'

const Link = styled.a`
  color: ${({ theme }) => theme.colorGray10};
  text-decoration: none;
  text-align: center;
  margin-top: 1.4rem;

  &:visited {
    color: ${({ theme }) => theme.colorGray10};
  }
`
const timeToRedirectLogin = 1000

const validationSchema = Yup.object({
  email: Yup.string()
    .email(translate('EnterValidMail'))
    .required(translate('ThisFieldIsRequired')),
  password: Yup.string().required(translate('ThisFieldIsRequired')),
})

const LoginPage = () => {

  const navigate = useNavigate();
  const [setCookie] = useCookies(['cookie-names'])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useContext(UserContext);
  const [authenticatedData, setAuthenticatedData] = useState()

  const onSubmit = (values) => {
    authenticateUser(values)
  }

  const authenticateUser = (loginModelData) => {
    setLoading(true)
    userService
      .login({
        email: loginModelData.email,
        password: loginModelData.password,
      })
      .then((data) => {
        setAuthenticatedData(data)
        setCookie('JWT', data.token, { path: '/' })
        setLoading(false)
        setTimeout(() => {
          navigate(routes.myProfile)
        }, timeToRedirectLogin)
      })
      .catch((error) => {
        setLoading(false)
      })
  }

  useEffect(() => {
    console.log(authenticatedData)
    if(authenticatedData){
      setUser(authenticatedData)
    }
  }, [authenticateUser, authenticatedData, setAuthenticatedData])

  if (loading) return <Loader isLoading={loading} />

  return (
    <AuthTemplate>
      {user && user.firstName}
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={false}
      >
        {({ errors, touched, isValid }) => (
          <Form>
            <Field
              type="email"
              name="email"
              placeholder={translate('EmailAddress')}
              as={Input}
              error={errors.email && touched.email}
            />
            <ErrorMessageForm name="email" />
            <Field
              type="password"
              name="password"
              placeholder={translate('EnterPassword')}
              as={Input}
              error={errors.password && touched.password}
            />
            <ErrorMessageForm name="password" />
            <Button
              id="login"
              type="submit"
              buttonType="primary"
              size="lg"
              buttonPlace="auth"
            >
              {translate('SignIn')}
            </Button>
          </Form>
        )}
      </Formik>
      <LoginHooks setUser={setUser} />
      <Link id="forget-password" href={routes.forgotPassword}>{translate('ForgotPassword')}</Link>
    </AuthTemplate>
  )
}

export default LoginPage
