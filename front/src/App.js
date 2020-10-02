import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter, NavLink } from 'react-router-dom';
import { isMobile } from "react-device-detect";
import useGeolocation from "hooks/useWatchLocation"

import { createBrowserHistory } from 'history';
import { PrivateRoute } from './utils/PrivateRoute';
import { Role } from './utils/PrivateRoute'

import { RegisterPage } from './modules/Account/Register';
import { ActivatePage } from './modules/Account/Activate';
import { LoginPage } from './modules/Account/Login';
import { ForgotPassword } from './modules/Account/ForgotPassword';

import { Plans } from './modules/Plans/Plans';
import { Plan } from './modules/Plans/Plan';

import { UsersList } from "./modules/Users/Users"
import { AllUsers } from './modules/Users/Admin/AllUsers';
import { Trainers } from './modules/Users/Admin/Trainers';
import { Clients } from './modules/Users/Admin/Clients';
import { User } from './modules/Users/User';

import { UsersOfOrganization } from './modules/Users/Organization/UsersOfOrganization';
import { ClientsOfOrganization } from './modules/Users/Organization/ClientsOfOrganization';

import Alert from 'components/organisms/Alert';
import Menu from './Menu';

import { Categories } from './modules/Exercises/Categories';
import { Category } from './modules/Exercises/Category';

import './styles.scss';
import { Exercise } from './modules/Exercises/Exercises/Exercise';
import { AddExercise } from './modules/Exercises/Exercises/AddExercise';
import { EditExercise } from './modules/Exercises/Exercises/EditExercise';
import { MyProfile } from './modules/Users/MyProfile';

export const history = createBrowserHistory();

export const userContext = React.createContext();
export const ThemeContext = React.createContext();
export const LanguageContext = React.createContext();

let App = () => {

  const [theme, setTheme] = useState('dark')
  const [user, setUser] = useState(JSON.parse((localStorage.getItem('user'))));
  const [selectedLanguage, setSelectedLanguage] = useState('en');


  useEffect(() => {
    const userData = localStorage.getItem('user');
    setUser(JSON.parse(userData));
  }, []);


  const toggleTheme = () => {
    setTheme(theme == 'dark' ? 'light' : 'dark')
  }

  const renderLangChange = () => {
    return <LanguageSelector />
  }

  const renderThemeChange = () => {
    return <ThemeSelector toggleTheme={toggleTheme} />
  }

  const renderMenu = () => {
    if (user) {
      if (user.role === 'Trainer' || user.role === 'Owner') {
        return <Menu />;
      }
    }
  };

  const renderAvatarMenu = () => {
    if (user) {
      if (user.role === 'Trainer') {
        return !isMobile && <AvatarMenu />;
      }
    }
  };

  return (
    <div className={"App " + (theme)}>
      <LanguageContext.Provider
        value={{
          lang: selectedLanguage,
        }}
      >
        <ThemeContext.Provider value={{ theme }}>
          <userContext.Provider value={{ user }}>
            <Alert />
            <BrowserRouter history={history}>
              {renderLangChange()}
              {renderThemeChange()}
              {renderMenu()}
              {renderAvatarMenu()}
              <Switch>

                <PrivateRoute exact path="/register" component={RegisterPage} />
                <PrivateRoute exact path="/activate" component={ActivatePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/forgotpassword" component={ForgotPassword} />

                <PrivateRoute path="/categories" component={Categories} />
                <PrivateRoute path="/category/:id" component={Category} />
                <PrivateRoute path="/add-exercise" component={AddExercise} />
                <PrivateRoute path="/edit-exercise/:id" component={EditExercise} />
                <PrivateRoute path="/exercise/:id" component={Exercise} />

                <PrivateRoute path="/plans" component={Plans} />
                <PrivateRoute path="/plan/:id" component={Plan} />

                <PrivateRoute roles={[Role.Admin]} path="/users" component={AllUsers} />
                <PrivateRoute roles={[Role.Admin]} path="/trainers" component={Trainers} />
                <PrivateRoute roles={[Role.Admin]} path="/clients" component={Clients} />

                <PrivateRoute path="/user/:id" component={User} />
                <PrivateRoute path="/myprofile/:id" component={MyProfile} />

                {/* Only Owner */}
                <PrivateRoute roles={[Role.Owner]} path="/organizationusers" component={UsersOfOrganization} />
                {/* Only Trainers */}
                <PrivateRoute roles={[Role.Trainer, Role.Owner]} path="/organizationclients" component={ClientsOfOrganization} />

              </Switch>
            </BrowserRouter>
          </userContext.Provider>
        </ThemeContext.Provider>
      </LanguageContext.Provider>
    </div>
  );
};

const AvatarMenu = ({ user }) => {


  const toProfile = () => {
    history.push(`/user/${user.userId}`);
  };

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <div className="profile">
      <ul id="mainmenu">

        <li>
          {user.avatar
            ? <div
              className={`menuButton__image circle`}
            ><img src={`data:image/jpeg;base64,${user.avatar}`} /></div>
            : <div
              className={`menuButton__image-empty circle
                            }`}
            />}
          <ul>
            <li >
              <NavLink
                to={`user/${user.userId}`}
                activeClassName="active"
              >
                My Profile
                </NavLink></li>
            <li onClick={() => logout()}>Logout</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

const LanguageSelector = () => {

  return (
    <div className="lang-switcher">set language</div>
  )
}

const ThemeSelector = ({ toggleTheme }) => {

  const location = useGeolocation();

  return (
    <div>
      <div className="theme-switcher" onClick={() => toggleTheme()}>
        set theme</div>
    </div>
  )
}
export default App;
