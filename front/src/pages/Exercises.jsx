import React, { useState, useCallback } from 'react';
import { FormInput } from "../common/FormInput";
import { useDispatch } from 'react-redux';
import Icon from "../../src/common/Icon"
import { Button } from "../common/buttons/Button"
import Spacer from '../common/Spacer';

import { useDropzone } from 'react-dropzone'

export const Exercises = () => {


    // {
    //     "materials": [
    //       "string"
    //     ],
    //     "name": "string",
    //     "description": "string",
    //     "times": 0,
    //     "series": 0
    //   }

    const [exerciseData, setExerciseData] = useState({})
    const [materials, setMaterials] = useState()

    const dispatch = useDispatch()

    const handleInput = (e) => {
        exerciseData[e.target.name] = e.target.value;
        setExerciseData(exerciseData);
    }

    const onDrop = useCallback(acceptedFiles => {
        setMaterials(acceptedFiles)
    }, []);

    const { isDragActive, getRootProps, getInputProps, isDragReject, acceptedFiles, rejectedFiles } = useDropzone({
        onDrop,
        accept: 'image/png',
        minSize: 0,
    });



    return (
        <div className="container">

            <h1>Exercise</h1>
            <Button className="btn btn--primary btn--sm" name={"Zapisz"}></Button>
            <FormInput id="exercise" name="exercise" onChange={handleInput} label="Exercise Name" />

            <div className="exercise__form">
                <h2>Powtórzenia</h2>
                <QuantityInput defaultQuantity={9} />
            </div>

            <div className="exercise__form">
                <h2>Czas ćwiczenia</h2>
                <QuantityInput defaultQuantity={9} />
            </div>


            <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                {!isDragActive && 'Dodaj załączniki'}
                {isDragReject && "File type not accepted, sorry!"}
            </div>


            <div >
                {acceptedFiles.length > 0 && acceptedFiles.map(acceptedFile => (
                        <div className="file">{acceptedFile.name}</div>
                ))}
            </div>

            <FormInput id="description" name="description" onChange={handleInput} label="Description" />
        </div>
    );
}



export const QuantityInput = (props) => {
    const [value, setValue] = useState(0);

    return (
        <div className="counter">
            <div onClick={() => setValue(value + 1)}><Icon name={"plus-circle"} /></div>
            <h2>{value}</h2>
            <div onClick={() => setValue(value - 1)}><Icon name={"minus-circle"} /></div>
        </div>
    )
};
