import React, { useState, useEffect } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';


import { darkTheme } from 'theme/darkTheme';
import { lightTheme } from 'theme/lightTheme';


import { ThemeProvider } from 'styled-components';
import { createBrowserHistory } from 'history';
import MainTemplate from 'templates/MainTemplate';
import { routes } from 'utils/routes';

// registration
import LoginPage from 'modules/Auth/LoginPage';
import ForgotPasswordPage from 'modules/Auth/ForgotPasswordPage';
import ResetPasswordPage from 'modules/Auth/ResetPasswordPage';
import ActivateAccountPage from 'modules/Auth/ActivateAccountPage';
import ConfirmationPage from 'modules/Auth/ConfirmationPage';

// exercises
import Categories from 'modules/Exercises/Categories';
import Category from 'modules/Exercises/Category/Category';
import AddExercise from 'modules/Exercises/Exercises/AddExercise';

// plans
import Plans from 'modules/Plans/Plans';
import Plan from 'modules/Plans/Plan/Plan';

import MyProfile from 'modules/MyProfile/MyProfile';
import { User } from './Users/User';

import OrganizationUsers from 'modules/Users/OrganizationUsers';
import { ThemeContext } from 'support/context/ThemeContext';
import { LanguageContext } from 'support/context/LanguageContext';
import { userContext } from 'support/context/UserContext';
import MenuTemplate from 'templates/MenuTemplate';
import Exercise from 'modules/Exercises/Exercises/Exercise';
import { PrivateRoute, Role } from 'utils/PrivateRoute';

import TestPage from './Auth/Test';


export const history = createBrowserHistory();

const Root = () => {

  const [user] = useState(JSON.parse((localStorage.getItem('user'))));

  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [theme, setTheme] = useState(darkTheme)

  useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
        });

        const currentLanguage = localStorage.getItem('language')
        if(currentLanguage == null){
        localStorage.setItem('language', 'en-GB');
        }
  }, []);

  const toggleTheme = () => {
    setTheme(theme == darkTheme ? lightTheme : darkTheme)
  }

  const toggleLanguage = () => {
    setSelectedLanguage(selectedLanguage == 'en-GB' ? 'en-GB' : 'pl-PL')
  }

  return (
    <LanguageContext.Provider value={{ lang: selectedLanguage }}>
      <ThemeContext.Provider value={{ theme }}>
        <ThemeProvider theme={theme}>
          <userContext.Provider value={{ user }}>
            <BrowserRouter history={history}>
              <MainTemplate>
                <Switch>
                  <Route path={routes.login} component={LoginPage} />
                  <Route path={routes.forgotPassword} component={ForgotPasswordPage} />
                  <Route path={routes.resetPassword} component={ResetPasswordPage} />
                  <Route path={routes.activate} component={ActivateAccountPage} />
                  <Route path={routes.confirmation} component={ConfirmationPage} />
                  <Route path={routes.myProfile} component={() => <MyProfile toggleTheme ={toggleTheme} toggleLanguage ={toggleLanguage}/>} />

                  <Route path="/test" component={TestPage} />

                  <PrivateRoute path="/user/:id" component={User} />

                  <MenuTemplate>
                    <Route path={routes.addExcersise} component={AddExercise} />
                    <Route path={routes.exercise} component={Exercise} />
                    <Route path={routes.categories} component={Categories} />
                    <PrivateRoute path={routes.category} component={Category} />
                    <PrivateRoute path={routes.plans} component={Plans} />
                    <PrivateRoute path={routes.plan} component={Plan} />
                    <PrivateRoute roles={[Role.Owner]} path={routes.organizationUsers} component={OrganizationUsers} />
                  </MenuTemplate>
                </Switch>
              </MainTemplate>
            </BrowserRouter>
          </userContext.Provider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
};

export default Root;
