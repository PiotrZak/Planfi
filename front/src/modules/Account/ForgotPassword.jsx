import React, { useState, useEffect } from 'react';
import { FormInput } from 'components/atoms/FormInput';
import Button from "components/atoms/Button"
import { useDispatch } from 'react-redux'
import { userService } from 'services/userServices';
import { validationUtil } from "utils/validation.util"
import { alertActions } from 'redux/actions/alert.actions'
import { useHistory } from "react-router-dom";

export const ForgotPassword = (props) => {

    const [userData, setUserData] = useState({})
    const [errors, setErrors] = useState({})
    const history = useHistory();

    const requiredFields = ["email"];
    const dispatch = useDispatch()

    useEffect(() => {

    });

    const handleInput = (e) => {
        let name = e.target.name
        userData[name] = e.target.value;
        const mailValidation = validationUtil.validateEmail(userData['email'])

        setUserData(userData);
        setErrors(
            validationUtil.validateRequiredField(
                name,
                { ...errors },
                requiredFields,
                userData
            )
        );
        mailValidation && setErrors({ ...errors, email: mailValidation })
    }

    const submitForm = (e) => {

        e.preventDefault();

        let currentErrors = validationUtil.validateAllRequiredFields(
            requiredFields,
            userData
        );

        setErrors({ ...errors, ...currentErrors });
        if (
            Object.getOwnPropertyNames(currentErrors).length === 0 &&
            Object.getOwnPropertyNames(errors).length === 0
        ) {
            authenticateUser(userData)
        }
    }

    const authenticateUser = (userData) =>{
        userService
            .login(userData)
            .then((data) => {
                dispatch(alertActions.success("Congratulations! You are log in."))
                localStorage.setItem("token", data.token);
                if(data.firstName === null){
                    history.push('/activate');
                }
                else{
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
                <Button className="btn btn--primary btn--lg" onClick={submitForm} name={"Login"}></Button>
            </div>
        </div>
    );
}

