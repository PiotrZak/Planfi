import React, { useState } from 'react';
import { FormInput } from "../../common/FormInput";
import { useDispatch } from 'react-redux';
import { Button } from "../../common/buttons/Button"
import Return from "../../common/Return"
import { exerciseService } from '../../services/exerciseService';
import { alertActions } from '../../redux/actions/alert.actions'
import Dropzone from "../../common/Dropzone"
import Counter from "../../common/Counter"
import { validationUtil } from "../../../src/utils/validation.util"


export const AddExercise = () => {

    const initialData =
    {
        name: null,
        description: null,
        times: null,
        series: null,
        file: null,
    }

    const [exerciseData, setExerciseData] = useState(initialData)
    const [errors, setErrors] = useState({})
    const requiredFields = ["name", "description"];

    const dispatch = useDispatch()

    const submit = (e) => {
        e.preventDefault();

        let currentErrors = validationUtil.validateAllRequiredFields(
            requiredFields,
            exerciseData
        );

        setErrors({ ...errors, ...currentErrors });
        if (
            Object.getOwnPropertyNames(currentErrors).length === 0 &&
            Object.getOwnPropertyNames(errors).length === 0
        ) {
            addExercise()
        }
    }

    const addExercise = () => {
        const formData = new FormData();
        formData.append("Name", exerciseData.name)
        formData.append("Description", exerciseData.description)
        formData.append("Times", exerciseData.times)
        formData.append("Series", exerciseData.series)
        formData.append("File", exerciseData.file)

        exerciseService
            .addExercise(formData)
            .then(() => {
                dispatch(alertActions.success("Exercise succesfully added!"))
            })
            .catch((error) => {
                dispatch(alertActions.error(error))
            });
    }

    const handleInput = (e) => {

        let name = e.target.name
        exerciseData[name] = e.target.value;
        setExerciseData(exerciseData);
        setErrors(
            validationUtil.validateRequiredField(
                name,
                { ...errors },
                requiredFields,
                exerciseData
            )
        );
    }

    const handleSeries = (data) => {
        setExerciseData({ ...exerciseData, series: data })
    }

    const handleTime = (data) => {
        setExerciseData({ ...exerciseData, times: data })
    }

    const handleFileData = (data) => {
    setExerciseData({ ...exerciseData, file: data[0] })
    }

    return (
        <div className="container">
            <div className="container__title">
                <Return />
                <h2>Dodaj ćwiczenie</h2>
                <Button className="btn btn--primary btn--sm" onClick={submit} name={"Zapisz"}></Button>
            </div>

            <FormInput id="name" name="name" onChange={handleInput} label="Exercise Name" hasError={errors.name} />
            <div className="exercise__form">
                <h3>Powtórzenia</h3>
                <Counter defaultQuantity={9} handleData={handleSeries} />
            </div>

            <div className="exercise__form">
                <h3>Czas ćwiczenia</h3>
                <Counter defaultQuantity={9} handleData={handleTime} />
            </div>

            <div className="exercise__dropzone">
                <Dropzone handleFileData={handleFileData} />
            </div>
            <FormInput id="description" name="description" onChange={handleInput} label="Description" hasError={errors.description} />
        </div>
    );
}

export default AddExercise;