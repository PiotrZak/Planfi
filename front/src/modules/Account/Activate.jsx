import React, { useState} from 'react';
import { FormInput } from "../../common/FormInput"
import { validationUtil } from "../../../src/utils/validation.util"
import { Button } from "../../common/buttons/Button"


export const ActivatePage = (props) => {

    const [userData, setUserData] = useState({})
    const [errors, setErrors] = useState({})
    const requiredFields = ["name", "surname", "phone"];

    const handleInput = (e) => {

        let name = e.target.name
        userData[name] = e.target.value;
        setUserData(userData);
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
            activateUser(userData)
        }
    }

    const activateUser = () => {
    }


const activateText = "The e-mail address to which you received the invitation will be used to log in."
const privacyPolicy = "Zakładając konto akceptujesz naszą politykę prywatności - poznasz ją tutaj."

    return (
        <div className="container">
            <div className="container__content">
            <h2>Activate Account</h2>

            <p>{activateText}</p> 
                <FormInput id="name" name="name" onChange={handleInput} label="Name" hasError={errors.name} />
                <FormInput id="surname" name="surname" onChange={handleInput} label="Surname" hasError={errors.surname} />
                <FormInput id="phone" name="phone" onChange={handleInput} label="Phone" hasError={errors.phone} />

                <FormInput type  ="checkbox" id="phone" name="phone" onChange={handleInput} label={privacyPolicy} hasError={errors.phone} />

                <Button className="btn btn--primary btn--lg" onClick={submitForm} name={"Activate"}></Button>
            </div>
        </div>
    );
}

