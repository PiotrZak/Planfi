import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import ActivateAccountPage from 'Auth/ActivateAccountPage'
import ConfirmationPage from 'Auth/ConfirmationPage'
import ForgotPasswordPage from 'Auth/ForgotPasswordPage'
import LoginPage from 'Auth/LoginPage'
import ResetPasswordPage from 'Auth/ResetPasswordPage'
import { ApolloProviderContext } from 'contexts'
import Desktop from 'layouts/Desktop'
import Mobile from 'layouts/Mobile'
import React, { Suspense, useEffect, useState } from 'react'
import { isMobileOnly } from 'react-device-detect'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import RoutesList from 'routes/routes'
import { theme } from 'style'
import 'utils/i18n'

export const routes = {
  register: '/register',
  activate: '/activate',
  login: '/login',
  forgotPassword: '/forgot',
  resetPassword: '/reset',
  myProfile: '/myprofile',
  confirmation: '/confirmation',
}

const Auth = () => {
  //@ts-ignore
  const userInSession = JSON.parse(localStorage.getItem('user'))

  const [user, setUser] = useState(userInSession)
  const navigate = useNavigate()

  useEffect(() => {
    const currentUrl = window.location.href
    if (
      currentUrl.toString().includes('activate') ||
      currentUrl.toString().includes('forgot') ||
      currentUrl.toString().includes('register') ||
      currentUrl.toString().includes('reset') ||
      //for development purpose
      currentUrl.toString().includes('categories')
    ) {
      return
    } else {
      user != null ? navigate(routes.myProfile) : navigate(routes.login)
    }
    //@ts-ignore
  }, [setUser])

  return (
    <Routes>
      <Route path={routes.login} element={<LoginPage setUser={setUser} />} />
      <Route path={routes.forgotPassword} element={<ForgotPasswordPage />} />
      <Route path={routes.resetPassword} element={<ResetPasswordPage />} />
      <Route path={routes.activate} element={<ActivateAccountPage />} />
      <Route path={routes.confirmation} element={<ConfirmationPage />} />
    </Routes>
  )
}

ReactDOM.hydrate(
  <React.StrictMode>
    <Suspense fallback="loading">
      <ApolloProviderContext>
        <BrowserRouter>
          <Auth />
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {isMobileOnly ? (
              <Mobile>
                <RoutesList />
              </Mobile>
            ) : (
              <Desktop>
                <RoutesList />
              </Desktop>
            )}
          </ThemeProvider>
        </BrowserRouter>
      </ApolloProviderContext>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
)
