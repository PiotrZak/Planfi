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
                localStorage.setItem("token", data.token);
                if (data.firstName === null) {
                    history.push('/activate');
                }
                else {
                    history.push('/plans');
                }
            })
            .catch((error) => {
                dispatch(alertActions.error(error.title))
            });
    }

    return (
        <div className="container">
            <div className="container__content">
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

