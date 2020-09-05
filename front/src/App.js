import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './utils/PrivateRoute';

import { RegisterPage } from "./modules/Account/Register"
import { ActivatePage } from "./modules/Account/Activate"
import { LoginPage } from "./modules/Account/Login"
import { ForgotPassword } from "./modules/Account/ForgotPassword"

import { Plans } from "./modules/Plans/Plans"
import { Plan } from "./modules/Plans/Plan"

import { UsersList } from "./modules/Users/Users"
import { User } from './modules/Users/User';

import { createBrowserHistory } from 'history';
import Alert from "../src/common/Alert"

import Menu from "./Menu"


import { Categories } from './modules/Exercises/Category/Categories';
import { Category } from './modules/Exercises/Category/Category';


import './styles.scss';
import { Exercises } from './modules/Exercises/Exercises';
import { Exercise } from './modules/Exercises/Exercise';
import { AddExercise } from './modules/Exercises/AddExercise';

export const history = createBrowserHistory();

let App = () => {

  const [theme, setTheme] = useState(true)

    // theme
    // ? import("./designsystem/_dark.scss")
    // : import("./designsystem/_light.scss")

  return (
    <div className="App">
      {/* <div onClick={() => setTheme(!theme)}>test</div> */}
      <Alert />
      <BrowserRouter history={history}>
        <Menu />
        <Switch>
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/activate" component={ActivatePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/forgotpassword" component={ForgotPassword} />

          <Route path="/categories" component={Categories} />

          {/* all Exercises */}
          {/* <Route path="/exercises" component={Exercises} /> */}
          <Route path="/add-exercise" component={AddExercise} />

          <Route path="/plans" component={Plans} />
          <Route path="/users" component={UsersList} />
        </Switch>

        <Route path="/exercise/:id" component={Exercise} />
        <Route path="/category/:id" component={Category} />
        <Route path="/plan/:id" component={Plan} />

        {/* All routes should be private */}
        <PrivateRoute path="/user/:id" accessRole={[1, 2, 3]} component={User} />
      </BrowserRouter>
    </div>
  );
}

export default App;
