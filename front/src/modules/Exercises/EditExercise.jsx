import React, { useState, useEffect } from 'react';
import { FormInput } from "common/FormInput";
import { useDispatch } from 'react-redux';
import { Button } from "common/buttons/Button"
import Return from "common/Return"
import { exerciseService } from 'services/exerciseService';
import { alertActions } from 'redux/actions/alert.actions'
import Dropzone from "common/Dropzone"
import Counter from "common/Counter"
import { validationUtil } from "utils/validation.util"
import { useHistory } from "react-router-dom";

export const EditExercise = (props) => {

    const initialData =
    {
        name: null,
        description: null,
        times: null,
        series: null,
        weight: null,
        file: null,
    }


    useEffect(() => {
        console.log('test')
        console.log(props)
        if(initialExerciseData.name == undefined){
            console.log('test')
        }
    }, []);

    const [initialExerciseData] = useState(props.location.state.exercise)
    const [exerciseData, setExerciseData] = useState(initialData)
    const [errors, setErrors] = useState({})
    const history = useHistory();
    const requiredFields = ["name", "description"];

    const dispatch = useDispatch()


    const submit = (e) => {
        editExercise(exerciseData)
    }

    const editExercise = () => {

        const formData = new FormData();
        formData.append("Name", exerciseData.name == null ? initialExerciseData.name :exerciseData.name )
        formData.append("Description", exerciseData.description == null ? initialExerciseData.description : exerciseData.description)
        formData.append("Times", exerciseData.times == null ? initialExerciseData.times : exerciseData.times)
        formData.append("Series", exerciseData.series == null ? initialExerciseData.series :exerciseData.series)
        formData.append("Weight", exerciseData.weight == null ? initialExerciseData.weight :exerciseData.weight)
        if (exerciseData.files != null) {
            for (let i = 0; i < exerciseData.files.length; i++) {
                formData.append(`Files`, exerciseData.files[i])
            }
        }

        formData.append("CategoryId", props.location.state.id)

        exerciseService
            .editExercise(initialExerciseData.exerciseId, formData)
            .then(() => {
                dispatch(alertActions.success(exercisesEdited))
                history.push({
                    pathname: `/exercise/${initialExerciseData.exerciseId}`,
                    state: { id: initialExerciseData.exerciseId }
                  })
            })
            .catch((error) => {
                dispatch(alertActions.error(error))
            });
    }

    const handleInput = (e) => {
        let name = e.target.name
        exerciseData[name] = e.target.value;
        setExerciseData(exerciseData);
        validationUtil.runSetErrors(name, setErrors, errors, requiredFields, exerciseData)
    }

    const handleSeries = (data) => {
        setExerciseData({ ...exerciseData, series: data + 1 })
    }

    const handleTime = (data) => {
        setExerciseData({ ...exerciseData, times: data + 1 })
    }

    const handleWeight = (data) => {
        setExerciseData({ ...exerciseData, weight: data + 1 })
    }

    const handleFileData = (data) => {
        setExerciseData({ ...exerciseData, files: data })
    }

    const exercisesEdited = "Exercise succesfully edited!"
    const EditExercise = "Edit Exercise"
    const Times = "Times"
    const Series = "Series"
    const Weight = "Weight"
    const Edit = "Edit"

    return (
        <div className="container">
            <div className="container__title">
                <div className="container__title__left">
                    <Return />
                    <h4>{EditExercise}</h4>
                </div>
                <Button className="btn btn--primary btn--sm" onClick={submit} name={Edit}></Button>
            </div>

            <FormInput id="name" defaultValue={initialExerciseData.name} name="name" onChange={handleInput} label="Exercise Name" hasError={errors.name} />

            <div className="exercise-counter">
                <div className="exercise__form">
                    <h4>{Series}</h4>
                    <Counter defaultValue={initialExerciseData.series} handleData={handleSeries} />
                </div>

                <div className="exercise__form">
                    <h4>{Times}</h4>
                    <Counter defaultValue={initialExerciseData.times} handleData={handleTime} />
                </div>

                <div className="exercise__form">
                    <h4>{Weight}</h4>
                    <Counter defaultValue={initialExerciseData.weight} handleData={handleWeight} />
                </div>
            </div>

            <div className="exercise__dropzone">
                <Dropzone handleFileData={handleFileData} />
            </div>

            {initialExerciseData.files && initialExerciseData.files.map((file, i) =>
                <img className ="exercise-image" key={i} alt = {i} src={`data:image/jpeg;base64,${file}`} />)}
                


            <FormInput defaultValue={initialExerciseData.description} type="textarea" id="description" name="description" onChange={handleInput} label="Description" hasError={errors.description} />
        </div>
    );
}

export default EditExercise;