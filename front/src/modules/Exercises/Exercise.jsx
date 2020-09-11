import React, { useState, useEffect } from 'react';
import { exerciseService } from "../../services/exerciseService";
import Icon from "../../../src/common/Icon"
import Return from "../../common/Return"
import { useDispatch } from 'react-redux';
import { alertActions } from '../../redux/actions/alert.actions'
import { useHistory, Link } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
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
                history.push('/categories');
            })
            .catch(() => {
            });
    }

    const Breakpoints = {
        desktop: {
            breakpoint: { max: 5000, min: 768 },
            items: 1,
        },
        laptop: {
            breakpoint: { max: 1024, min: 0 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 1,
        },
    };


    return (
        <div className="container">
            <div className="container__title">
                <Return />
                <div onClick={() => setBottomSheet(true)}><Icon name={"plus"} fill={"#5E4AE3"} /></div>
            </div>
            {exercise &&
                <div className="exercise">
                    {exercise.files &&
                        <Carousel
                            swipeable={true}
                            responsive={Breakpoints}
                        >
                            {exercise.files.map((file, i) =>
                                <Slide key={i} img={file} />)}
                        </Carousel>
                    }
                    <h1>{exercise.name}</h1>
                    Series: <p>{exercise.series}</p>
                    Times: <p>{exercise.times}</p>
                    Weight: <p>{exercise.weight}</p>
                    Description: <p>{exercise.description}</p>

                </div>
            }
            <ReactBottomsheet
                visible={bottomSheet}
                onClose={() => setBottomSheet(false)}>
                <button className='bottom-sheet-item'><Link to={{
                    pathname: `/edit-exercise/${props.location.state.id}`,
                    state: { exercise: exercise }
                }}>Edit</Link></button>
                <button onClick={() => deleteExercise()} className='bottom-sheet-item'>Delete</button>
            </ReactBottomsheet>
        </div>
    );
}

const Slide = ({ key, img }) => {
    return (
        <div>
            <img key={key} alt = {key} src={`data:image/jpeg;base64,${img}`} />
        </div>
    );
};


export default Exercise;