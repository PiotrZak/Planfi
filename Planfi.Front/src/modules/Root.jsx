import React, { useState, useEffect } from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { darkTheme } from 'theme/darkTheme';
import { lightTheme } from 'theme/lightTheme';

import { ThemeProvider } from 'styled-components';
import { createBrowserHistory } from 'history';
import MainTemplate from 'templates/MainTemplate';
import { routes } from 'utils/routes';

// auth
import LoginPage from 'modules/Auth/LoginPage';
import ForgotPasswordPage from 'modules/Auth/ForgotPasswordPage';
import ResetPasswordPage from 'modules/Auth/ResetPasswordPage';
import ActivateAccountPage from 'modules/Auth/ActivateAccountPage';
import ConfirmationPage from 'modules/Auth/ConfirmationPage';

//payment & chat
import { StripeContainer } from './Payment/Stripe';
import { StripeSuccess } from './Payment/Success';
import { StripeCancel } from './Payment/Cancel';
import ChatContainer from './Chat/Chat';

// exercises
import Categories from 'modules/Categories/Categories';
import Category from 'modules/Categories/Category/Category';
import AddExercise from 'modules/Categories/Exercises/AddExercise';
import EditExercise from 'modules/Categories/Exercises/EditExercise';

// plans
import Plans from 'modules/Plans/Plans';
import Plan from 'modules/Plans/Plan/Plan';

import MyProfile from 'modules/MyProfile/MyProfile';
import User  from 'modules/Users/User';

import { ThemeContext } from 'support/context/ThemeContext';
import { LanguageContext } from 'support/context/LanguageContext';
import { userContext } from 'support/context/UserContext';
import MenuTemplate from 'templates/MenuTemplate';
import Exercise from 'modules/Categories/Exercises/Exercise';
import { PrivateRoute, Role } from 'utils/PrivateRoute';

import TestPage from 'modules/Auth/Test';
import Clients from 'modules/Users/Clients';
import OrganizationTrainers from './Users/OrganizationTrainers';

export const history = createBrowserHistory();

const Root = () => {
  const [user] = useState(JSON.parse((localStorage.getItem('user'))));

  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [theme, setTheme] = useState(darkTheme);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
    });
    const currentLanguage = localStorage.getItem('language');
    if (currentLanguage == null) {
      localStorage.setItem('language', 'en-GB');
    }
    if(user != null ){
      history.push(routes.myProfile);
    }else{
      history.push(routes.login);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme == darkTheme ? lightTheme : darkTheme);
  };

  const toggleLanguage = () => {
    setSelectedLanguage(selectedLanguage == 'en-GB' ? 'pl-PL' : 'en-GB');
    setSelectedLanguage(selectedLanguage == 'pl-PL' ? 'en-GB' : 'pl-PL');
    localStorage.setItem('language', selectedLanguage);
  };

  return (
    <LanguageContext.Provider value={{ lang: selectedLanguage }}>
      <ThemeContext.Provider value={{ theme }}>
        <ThemeProvider theme={theme}>
          <userContext.Provider value={{ user }}>
            <BrowserRouter history={history}>
              <MainTemplate>
                <Switch>
                  {/* <Route path ="/stripe" component={StripeContainer} />
                  <Route path ="/stripeSuccess" component={StripeSuccess} />
                  <Route path ="/stripeCancel" component={StripeCancel} />*/}
                  <Route path ="/chat" component={ChatContainer} /> 
                  
                  <Route path={routes.login} component={LoginPage} />
                  <Route path={routes.forgotPassword} component={ForgotPasswordPage} />
                  <Route path={routes.resetPassword} component={ResetPasswordPage} />
                  <Route path={routes.activate} component={ActivateAccountPage} />
                  <Route path={routes.confirmation} component={ConfirmationPage} />
                  <Route path="/test" component={TestPage} />
                 <MenuTemplate>
                  <PrivateRoute path="/user/:id" component={User} />
                    <PrivateRoute roles={[Role.Owner]} path={routes.organizationTrainers} component={OrganizationTrainers} />
                    <PrivateRoute roles ={[Role.Owner, Role.Trainer]} path={routes.clients} component={Clients} />
                    <PrivateRoute path={routes.addExercise} component={AddExercise} />
                    <PrivateRoute path={routes.editExercise} component={EditExercise} />
                    <PrivateRoute path={routes.exercise} component={Exercise} />
                    <PrivateRoute path={routes.categories} component={Categories} />
                    <PrivateRoute path={routes.myProfile} component={() => <MyProfile toggleLanguage ={toggleLanguage} toggleTheme ={toggleTheme}/>} />
                    <PrivateRoute path={routes.category} component={Category} />
                    <PrivateRoute path={routes.plans} component={Plans} />
                    <PrivateRoute path={routes.plan} component={Plan} />
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
