import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import { RegisterPage } from "./pages/Account/Register"
import { ActivatePage } from "./pages/Account/Activate"
import { LoginPage } from "./pages/Account/Login"
import { ForgotPassword } from "./pages/Account/ForgotPassword"

import { Plans } from "./pages/Plans"
import { Users } from "./pages/Users"

import { createBrowserHistory } from 'history';
import Alert from "../src/common/Alert"

import Menu from "./Menu"

import './styles.scss';
import { Exercises } from './pages/Exercises/Exercises';
import { Exercise } from './pages/Exercises/Exercise';
import { AddExercise } from './pages/Exercises/AddExercise';

export const history = createBrowserHistory();

const App = () => {

  return (
    <div className="App">
      <Alert />
      <BrowserRouter history={history}>
          <Menu />
          <Switch>
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/activate" component={ActivatePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/forgotpassword" component={ForgotPassword} />

          <Route path="/exercises" component={Exercises} />
          <Route path="/add-exercise" component={AddExercise} />
          <Route path="/plans" component={Plans} />
          <Route path="/users" component={Users} />
        </Switch>
        <Route path ="/exercise/:id" component ={Exercise}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
