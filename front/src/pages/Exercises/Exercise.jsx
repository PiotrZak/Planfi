import React, { useState, useEffect } from 'react';
import { exerciseService } from "../../services/exerciseService";
import Icon from "../../../src/common/Icon"
import Return from "../../common/Return"
import { useDispatch } from 'react-redux';
import { alertActions } from '../../redux/actions/alert.actions'
import { useHistory } from "react-router-dom";
var ReactBottomsheet = require('react-bottomsheet');

export const Exercise = (props) => {

    const [exercise, setExercise] = useState();
    const [bottomSheet, setBottomSheet] = useState(false)
    const history = useHistory();

    const { match } = props;
    let id = match.params;
    const dispatch = useDispatch()

    useEffect(() => {
        exerciseService
            .getExerciseById(id.id)
            .then((data) => {
                setExercise(data);
            })
            .catch((error) => {
            });
    }, [id.id]);

    const deleteExercise = () => {
        exerciseService
            .deleteExerciseById(id.id)
            .then(() => {
                dispatch(alertActions.success("Exercise succesfully deleted!"))
                history.push('/exercises');
            })
            .catch(() => {
            });
    }

    // const editExercise = () => {
    //     console.log('edit')
    // }

    return (
        <div className="container">
            <div className="container__title">
                <Return />
                <div onClick = {() => setBottomSheet(true)}><Icon name={"plus"} fill={"#5E4AE3"} /></div>
            </div>
            {exercise &&
                <div className="exercise">
                    <img src={`data:image/jpeg;base64,${exercise.file}`} />
                    <h1>{exercise.name}</h1>
                    <Icon name={"ellipsisv"} fill={"#5E4AE3"} />
                    Series: <p>{exercise.series}</p>
                    Times: <p>{exercise.times}</p>
                    Description: <p>{exercise.description}</p>

                </div>
            }

            <ReactBottomsheet
                visible={bottomSheet}
                onClose={() => setBottomSheet(false)}>
                <button className='bottom-sheet-item'>Edit</button>
                <button onClick = {() => deleteExercise()} className='bottom-sheet-item'>Delete</button>
            </ReactBottomsheet>


        </div>
    );
}


export default Exercise;