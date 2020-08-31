import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { exerciseService } from "../../services/exerciseService";
import Icon from "../../../src/common/Icon"
import { NavLink } from 'react-router-dom';
import ExerciseComponent from "../../common/UserComponent"
import Return from "../../common/Return"

export const Exercise = (props) => {

    const [exercise, setExercise] = useState();

    const { match } = props;
    let id = match.params;

    useEffect(() => {
        exerciseService
            .getExerciseById(id.id)
            .then((data) => {
                setExercise(data);
            })
            .catch((error) => {
            });
    }, []);


    return (
        <div className="container">
            <div className="container__title">
                <Return />
            </div>
            {exercise &&
            <div className ="exercise">
                <img src={`data:image/jpeg;base64,${exercise.file}`} />
                <h1>{exercise.name}</h1>
                Series: <p>{exercise.series}</p>
                Times: <p>{exercise.times}</p>
                Description: <p>{exercise.description}</p>
            </div>
            }
        </div>
    );
}


export default Exercise;