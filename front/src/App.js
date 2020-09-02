import React from 'react';
import { Router, Route, NavLink, Switch, BrowserRouter } from 'react-router-dom';
import { withRouter } from 'react-router';
import { RegisterPage } from "./pages/Register"
import { LoginPage } from "./pages/Login"

import { Plans } from "./pages/Plans"
import { Users } from "./pages/Users"

import { createBrowserHistory } from 'history';
import Alert from "../src/common/Alert"

import Menu from "./Menu"

import './styles.scss';
import { Exercises } from './pages/Exercises';

export const history = createBrowserHistory();

const App = () => {

  return (
    <div className="App">
      <Alert />
      <BrowserRouter history={history}>
          {/*<Menu /> */}
          <Switch>
          <Route exact path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/exercises" component={Exercises} />
          <Route path="/plans" component={Plans} />
          <Route path="/users" component={Users} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
