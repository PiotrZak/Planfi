import React, { useState } from 'react';
import { FormInput } from "../../common/FormInput"
import { useDispatch } from 'react-redux'
import { userService } from '../../services/userServices';
import { alertActions } from '../../redux/actions/alert.actions'
import { validationUtil } from "../../../src/utils/validation.util"
import { Button } from "../../common/buttons/Button"


export const RegisterPage = (props) => {

    const [userData, setUserData] = useState({})
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch()
    const requiredFields = ["email", "password"];

    const handleInput = (e) => {

        let name = e.target.name
        userData[name] = e.target.value;

        setUserData(userData);

        const mailValidation = validationUtil.validateEmail(userData['email'])
        const passwordValidation = validationUtil.validatePassword(userData['password'])

        setErrors(
            validationUtil.validateRequiredField(
                name,
                { ...errors },
                requiredFields,
                userData
            )
        );
        passwordValidation && setErrors({ ...errors, password: passwordValidation }) 
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
            registerUser(userData)
        }
    }

    const registerUser = (userData) => {
        userService
            .register(userData)
            .then((data) => {
                dispatch(alertActions.success("User succesfully added!"))
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
                <Button className="btn btn--primary btn--lg" onClick={submitForm} name={"Register"}></Button>
            </div>
        </div>
    );
}

