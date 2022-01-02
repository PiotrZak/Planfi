import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Categories from 'pages/Categories'
import MyProfile from 'pages/MyProfile'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from 'Auth/LoginPage'
import ActivateAccountPage from 'Auth/ActivateAccountPage'
import ConfirmationPage from 'Auth/ConfirmationPage'
import ForgotPasswordPage from 'Auth/ForgotPasswordPage'
import ResetPasswordPage from 'Auth/ResetPasswordPage'
// import your route components too

export const routes = {
  register: '/register',
  activate: '/activate',
  login: '/login',
  forgotPassword: '/forgot',
  resetPassword: '/reset',
  myProfile: '/myprofile',
  confirmation: '/confirmation',
}

const RoutesList: React.FC = () => {

  //@ts-ignore
  const userInSession = JSON.parse(localStorage.getItem('user'))


  // todo - reference to the previous project (everything is implemented there already)

  // a) private routes
  // b) roles


  const [user, setUser] = useState(userInSession)
 // const routerRef: any = React.useRef()
  //const navigate = useNavigate()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => { })
    const currentLanguage = localStorage.getItem('language')
    if (currentLanguage == null) {
      localStorage.setItem('language', 'en-GB')
    }

    const currentUrl = window.location.href
    // if (
    //   currentUrl.toString().includes('account') ||
    //   currentUrl.toString().includes('forgot')
    // ) {
    //   return
    // } else {
    //   user != null ? navigate(routes.myProfile) : navigate(routes.login)
    // }
  }, [setUser])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.login}
          element={<LoginPage setUser={setUser} />}
        />
        <Route
          path={routes.forgotPassword}
          element={<ForgotPasswordPage/>}
        />
        <Route
          path={routes.resetPassword}
          element={<ResetPasswordPage/>}
        />
        <Route
          path={routes.activate}
          element={<ActivateAccountPage/>}
        />
        <Route
          path={routes.confirmation}
          element={<ConfirmationPage/>}
        />
        <Route path="/" element={<MyProfile />} />
        <Route path="categories" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesList;