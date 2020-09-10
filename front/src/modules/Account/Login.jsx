import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FormInput } from "../../common/FormInput"
import { Button } from "../../common/buttons/Button"
import { useDispatch } from 'react-redux'
import { userService } from '../../services/userServices';
import { validationUtil } from "../../../src/utils/validation.util"
import { alertActions } from '../../redux/actions/alert.actions'
import { useHistory } from "react-router-dom";
import { Icon } from "../../common/Icon"

import loginPhoto from "../../designsystem/login.jpg"

export const LoginPage = () => {

    const [userData, setUserData] = useState({})
    const [errors, setErrors] = useState({})
    const history = useHistory();

    const requiredFields = ["email", "password"];
    const dispatch = useDispatch()

    const handleInput = (e) => {
        let name = e.target.name
        userData[name] = e.target.value;
        setUserData(userData);
        validationUtil.runSetErrors(name, setErrors, errors, requiredFields, userData)
    }

    const submitForm = () => {
        const confirm = validationUtil.runValidateOnSubmit(setErrors, errors, requiredFields, userData)
        confirm && authenticateUser(userData)
    }

    const authenticateUser = (userData) => {
        userService
            .login(userData)
            .then((data) => {
                dispatch(alertActions.success("Congratulations! You are log in."))
                localStorage.setItem('user', JSON.stringify(data));
                if (data.role === "Trainer") {
                    history.push('/users');
                }
                else if(data.role === "Organization") {
                    history.push('/users');
                }
                else if(data.role === "User"){
                    history.push(`/user/${data.userId}`);
                }
            })
            .catch((error) => {
                dispatch(alertActions.error(loginError))
            });
    }

    const loginError = "Try again! those credentials are invalid"

    return (
        <div className="container-login">
        <div className ="container-login__image">
        <img src={loginPhoto} alt="Logo" />;
        </div>
            <div className="container-login__content">
                <div>
                    <h4>Organizator:</h4>
                    <p>ksarllr@disqus.com - Kimmi</p>
                </div>

                <div>
                    <h4>Trainer:</h4>
                    <p>jcasson3@prlog.org - Jillana</p>
                </div>

                <div>
                    <h4>User:</h4>
                    <p>tgianelli0@eventbrite.com - Teodor</p>
                </div>
                <hr/>
                <FormInput id="email" name="email" onChange={handleInput} label="Email" hasError={errors.email} />
                <FormInput id="password" name="password" type="password" onChange={handleInput} label="Password" hasError={errors.password} />
                <Button className="btn btn--primary btn--lg" onClick={submitForm} name={"Login"}></Button>
                <NavLink
                    to="/forgotpassword"
                    activeClassName="active"
                >
                    <div className="navigation__menu__icon"><Icon name="forget" fill="white" />Forget password?</div>
                </NavLink>
            </div>
        </div>
    );
}

