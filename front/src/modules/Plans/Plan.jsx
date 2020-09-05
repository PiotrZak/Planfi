import React, { useState, useEffect } from 'react';
import { planService } from "./../../services/planService";
import { exerciseService } from "./../../services/exerciseService";
import { Link, useHistory } from 'react-router-dom';
import { alertActions } from './../../redux/actions/alert.actions'
import { useDispatch } from 'react-redux';
import Icon from "./../../common/Icon"
import Return from "./../../common/Return"
import "react-multi-carousel/lib/styles.css";
import Button from "./../../common/MenuButton/MenuButton"

var ReactBottomsheet = require('react-bottomsheet');

export const Plan = (props) => {

    const [plan, setPlan] = useState();
    const [exercises, setExercises] = useState()

    const [bottomSheet, setBottomSheet] = useState(false)

    const history = useHistory();
    const { match } = props;
    let id = match.params;

    const dispatch = useDispatch()

    useEffect(() => {
        getPlan(id.id)
        getPlanExercise(id.id)
    }, [id.id]);


    const getPlan = (id) => {
        planService
            .getPlanById(id)
            .then((data) => {
                console.log(data)
                setPlan(data);
            })
            .catch((error) => {
            });
    }

    const getPlanExercise = (id) => {
        exerciseService
            .getExercisesByPlan(id)
            .then((data) => {
                setExercises(data);
                console.log(data)
            })
            .catch((error) => {
            });
    }

    const deletePlan = () => {
        planService
            .deletePlanById(id.id)
            .then(() => {
                dispatch(alertActions.success("Plan succesfully deleted!"))
                history.push('/categories');
            })
            .catch(() => {
            });
    }


    const filterExercises = (e) => {
        const input = new RegExp(e.target.value, 'i');
        const newItems = exercises.filter(
          (item) => item.name.match(input)
        );
        setExercises(newItems);
      };
    

    const noExerciseInPlan = "There are no added exercises in this Plan"

    return (
        <div className="container">
            <div className="container__title">
                <Return />

                {plan && <h2>{plan.title}</h2>}

                <div onClick={() => setBottomSheet(true)}><Icon name={"plus"} fill={"#5E4AE3"} /></div>
                {plan &&
                <Link
                    to ={{
                        pathname: "/add-exercise",
                        state: { id: plan.planId }
                    }}
                >
                    <Icon name={"plus"} fill={"#5E4AE3"} />
                </Link>
                }
            </div>

            <input
              type='text'
              onChange={filterExercises}
              placeholder={"find exercises"}
            />

              {exercises ? exercises.map((exercise) => <Button headline={exercise.name} subline={exercise.description} image={exercise.files[0]} exercise={exercise} />)
                    : noExerciseInPlan}

            <ReactBottomsheet
                visible={bottomSheet}
                onClose={() => setBottomSheet(false)}>
                <button onClick={() => deletePlan()} className='bottom-sheet-item'>Delete</button>
            </ReactBottomsheet>
        </div>
    );
}

export default Plan;