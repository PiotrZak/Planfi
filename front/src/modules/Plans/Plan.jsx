import React, { useState, useEffect } from 'react';
import { planService } from "./../../services/planService";
import { exerciseService } from "./../../services/exerciseService";
import { categoryService } from "./../../services/categoryService";
import { Link, useHistory } from 'react-router-dom';
import { alertActions } from './../../redux/actions/alert.actions'
import { useDispatch } from 'react-redux';
import Icon from "./../../common/Icon"
import Return from "./../../common/Return"
import "react-multi-carousel/lib/styles.css";

import { Button } from "../../common/buttons/Button"

import {CheckboxGenericComponent} from "../../common/CheckboxGenericComponent"


import GenericElement from "../../common/GenericElement/GenericElement"



import { CheckboxList } from '../../common/CheckboxList';


var ReactBottomsheet = require('react-bottomsheet');

export const Plan = (props) => {

    const [plan, setPlan] = useState();
    const [exercises, setExercises] = useState()

    const [activeExercise, setActiveExercise] = useState([])
    const [activeSelectedExercise, setActiveSelectedExercise] = useState([])


    const [searchTerm, setSearchTerm] = useState("");

    const [categories, setCategories] = useState()
    const [categoryExercises, setCategoryExercises] = useState()

    const [selectedElementsBottomSheet, setSelectedElementsBottomSheet] = useState(false)
    const [bottomSheet, setBottomSheet] = useState(false)

    const history = useHistory();
    const { match } = props;
    let id = match.params;

    const dispatch = useDispatch()

    useEffect(() => {
        getPlan(id.id)
        getAllCategories()
        getPlanExercise(id.id)
    }, [id.id, planService.assignExercises]);


    const getPlan = (id) => {
        planService
            .getPlanById(id)
            .then((data) => {

                setPlan(data);
            })
            .catch((error) => {
            });
    }

    const getAllCategories = () => {
        categoryService
            .getAllCategories()
            .then((data) => {
                setCategories(data);
            })
            .catch(() => {
            });
    }

    const getPlanExercise = (id) => {
        exerciseService
            .getExercisesByPlan(id)
            .then((data) => {
                setExercises(data);
            })
            .catch((error) => {
            });
    }

    const assignExerciseToPlan = () => {

        const data = { planId: id.id, exerciseId: activeExercise }

        planService
            .assignExercises(data)
            .then(() => {
                dispatch(alertActions.success({ allocateExercises }))
                setBottomSheet(true)
            })
            .catch((error) => {
                dispatch(alertActions.error(error))
            });
    }

    const deletePlan = () => {
        planService
            .deletePlanById(id.id)
            .then(() => {
                dispatch(alertActions.success({ planDeleted }))
                history.push('/categories');
            })
            .catch((error) => {
                dispatch(alertActions.error(error))
            });
    }

    const filterExercises = event => {
        setSearchTerm(event.target.value);
    };

    const results = !searchTerm
        ? exercises
        : exercises.filter(exercise =>
            exercise.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );

    const selectActiveId = (selectedData) => {

        const categoryIds = selectedData
            .filter((el) => el.value === true)
            .map((a) => a.exerciseId);
        setActiveExercise([...new Set([...activeExercise, ...categoryIds])])
    }


    const loadExercises = (id) => {
        exerciseService
            .getExercisesByCategory(id)
            .then((data) => {
                setCategoryExercises(data);
            })
            .catch((error) => {
            });
    }

    function filteringArraysScopes(allElements, removeElementsFromList) {
        return allElements.filter((el) => !removeElementsFromList.includes(el));
      }

    const submissionHandleElement = (selectedData) => {

            const selectedExercisesIds = selectedData
            .filter((el) => el.value === true)
            .map((a) => a.exerciseId);
      
          const unSelectedExercisesIds = selectedData
            .filter((el) => el.value === false || !el.value)
            .map((a) => a.exerciseId);

            const finallyExercises = filteringArraysScopes(selectedExercisesIds, unSelectedExercisesIds)

            setActiveSelectedExercise(finallyExercises)
            console.log(activeSelectedExercise)
    }

    const allocateExercises = "Exercises succesfully allocated!";
    const planDeleted = "Plan succesfully deleted!";
    const addExerciseToPlan = "Add Exercises to plan";
    const noExerciseInPlan = "There are no added exercises in this Plan";
    const returnToCategories = "return to categories"

    return (
        <div className="container">
            <div className="container__title">
                <Return />
                {plan && <h2>{plan.title}</h2>}
                <div onClick={() => setBottomSheet(true)}><Icon name={"plus"} fill={"#5E4AE3"} text={addExerciseToPlan} /></div>
            </div>

            <input
                className="search"
                type='text'
                onChange={filterExercises}
                placeholder={"find exercises"}
            />

            <CheckboxGenericComponent dataList={exercises} displayedValue={"name"}  onSelect={submissionHandleElement} selectAll={true} />)

            {/* {exercises ? results.map((exercise) => <GenericElement handleElement={submissionHandleElement} id={exercise.exerciseId} checkbox={true} headline={exercise.name} subline={`${exercise.series} / ${exercise.times}`} image={exercise.files && exercise.files[0]} exercise={exercise} />)
                : noExerciseInPlan} */}

            <ReactBottomsheet
                visible={selectedElementsBottomSheet}
                onClose={() => setSelectedElementsBottomSheet(false)}
                appendCancelBtn={false}>

                <div>
                    {activeSelectedExercise.length == 1 ?
                        <h1>Only one element is checked</h1>

                        : <h1>More elements is checked</h1>
                    }
                </div>
            </ReactBottomsheet>






            <ReactBottomsheet
                visible={bottomSheet}
                onClose={() => setBottomSheet(false)}
                appendCancelBtn={false}>

                <div>
                    {categoryExercises ?
                        <div>
                            <p onClick={() => setCategoryExercises()}><Icon name={"arrow-left"} fill={"#5E4AE3"} />{returnToCategories}</p>
                            <CheckboxList dataList={categoryExercises} displayedValue={"name"} onSelect={selectActiveId} selectAll={true} />
                            <Button className="btn btn--primary btn--lg" onClick={assignExerciseToPlan} name={"Assign Exercises to Plan"}></Button>
                        </div>
                        :
                        categories ?
                            categories.map((category, i) =>
                                <div key={i} className="micro-bottom" onClick={() => loadExercises(category.categoryId)}>
                                    <h3>{category.title}</h3>
                                    <Icon name={"plus"} fill={"#5E4AE3"} />
                                </div>)
                            : <p>Currently there is not category</p>
                    }}
                </div>
            </ReactBottomsheet>





        </div>
    );
}


export default Plan;