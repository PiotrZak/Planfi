import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import ActivateAccountPage from 'Auth/ActivateAccountPage'
import ConfirmationPage from 'Auth/ConfirmationPage'
import ForgotPasswordPage from 'Auth/ForgotPasswordPage'
import LoginPage from 'Auth/LoginPage'
import ResetPasswordPage from 'Auth/ResetPasswordPage'
import { ApolloProviderContext } from 'contexts'
import { UserContext } from 'contexts/UserContext'
import Desktop from 'layouts/Desktop'
import Mobile from 'layouts/Mobile'
import React, { Suspense, useContext, useEffect, useState } from 'react'
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
  categories: '/categories',
  plans: '/plans',
}

const Auth = () => {
  //@ts-ignore
  const userInSession = JSON.parse(localStorage.getItem('user'))
  const [user, setUser] = useState(userInSession)
  const navigate = useNavigate()

  const userContext = useContext(UserContext)

  useEffect(() => {
    const currentUrl = window.location.href
    const isCurrentUrlValid = Object.values(routes).some((url) =>
      currentUrl.includes(url)
    )

    if (!isCurrentUrlValid) {
      user != null ? navigate(routes.myProfile) : navigate(routes.login)
    }
  }, [setUser])

  return (
    <Routes>
      <Route path={routes.login} element={<LoginPage />} />
      <Route path={routes.forgotPassword} element={<ForgotPasswordPage />} />
      <Route path={routes.resetPassword} element={<ResetPasswordPage />} />
      <Route path={routes.activate} element={<ActivateAccountPage />} />
      <Route path={routes.confirmation} element={<ConfirmationPage />} />
    </Routes>
  )
}

const App = () => {
  const [user, setUser] = useState({ firstName: 'test' })

  console.log(user)

  return (
    <>
      {/* @ts-ignore */}
      <UserContext.Provider value={[user, setUser]}>
        <Auth />
        {isMobileOnly ? (
          <Mobile>
            <RoutesList />
          </Mobile>
        ) : (
          <Desktop>
            <RoutesList />
          </Desktop>
        )}
      </UserContext.Provider>
    </>
  )
}

ReactDOM.hydrate(
  <React.StrictMode>
    <Suspense fallback="loading">
      <ApolloProviderContext>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </ApolloProviderContext>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
)
