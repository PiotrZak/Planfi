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
import Button from "./../../common/MenuButton/MenuButton"
import { CheckboxList } from '../../common/CheckboxList';
var ReactBottomsheet = require('react-bottomsheet');

export const Plan = (props) => {

    const [plan, setPlan] = useState();
    const [exercises, setExercises] = useState()

    const [categories, setCategories] = useState()
    const [categoryExercises, setCategoryExercises] = useState()

    const [bottomSheet, setBottomSheet] = useState(false)

    const history = useHistory();
    const { match } = props;
    let id = match.params;

    const dispatch = useDispatch()

    useEffect(() => {
        getPlan(id.id)
        assignExerciseToPlan()
        // getPlanExercise(id.id)
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

    // const getPlanExercise = (id) => {
    //     exerciseService
    //         .getExercisesByPlan(id)
    //         .then((data) => {
    //             setExercises(data);
    //             console.log(data)
    //         })
    //         .catch((error) => {
    //         });
    // }

    const assignExerciseToPlan = () => {
        categoryService
            .getAllCategories()
            .then((data) => {
                console.log(data)
                setCategories(data)
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

    const selectActiveId = (selectedData) => {
        const categoryIds = selectedData
            .filter((el) => el.value === true)
            .map((a) => a.categoryId);

        console.log(categoryIds)
    }

    const loadExercises = (id) => {
        exerciseService
            .getExercisesByCategory(id)
            .then((data) => {
                console.log(data)
                setCategoryExercises(data);
            })
            .catch((error) => {
            });
    }


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
                type='text'
                onChange={filterExercises}
                placeholder={"find exercises"}
            />



            {exercises ? exercises.map((exercise) => <Button headline={exercise.name} subline={exercise.description} image={exercise.files[0]} exercise={exercise} />)
                : noExerciseInPlan}

            <ReactBottomsheet
                visible={bottomSheet}
                onClose={() => setBottomSheet(false)}
                appendCancelBtn={false}>

                <div>
                    {categoryExercises ?
                        <div>
                            <p onClick={() => setCategoryExercises()}><Icon name={"arrow-left"} fill={"#5E4AE3"} />{returnToCategories}</p>
                            <CheckboxList dataList={categoryExercises} displayedValue={"name"} onSelect={selectActiveId} selectAll={true} />
                        </div>
                        :
                        categories ?
                            categories.map((category, i) =>
                                <div key = {i}className="micro-bottom" onClick={() => loadExercises(category.categoryId)}>
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