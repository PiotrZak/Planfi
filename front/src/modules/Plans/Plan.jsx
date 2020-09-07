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
import Button from "../../common/MenuButton/MenuButton"
import { CheckboxList } from '../../common/CheckboxList';
var ReactBottomsheet = require('react-bottomsheet');

export const Plan = (props) => {

    const [plan, setPlan] = useState();
    const [exercises, setExercises] = useState()
    const [activeExercise, setActiveExercise] = useState([])
    const [searchTerm, setSearchTerm] = React.useState("");

    const [categories, setCategories] = useState()
    const [categoryExercises, setCategoryExercises] = useState()

    const [bottomSheet, setBottomSheet] = useState(false)

    const history = useHistory();
    const { match } = props;
    let id = match.params;

    const dispatch = useDispatch()

    useEffect(() => {
        getPlan(id.id)
        getAllCategories()
        assignExerciseToPlan()
        getPlanExercise(id.id)
    }, [id.id]);


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
                console.log(data)
            })
            .catch((error) => {
            });
    }

    const assignExerciseToPlan = () => {

        const data = { planId: id.id, exerciseId: activeExercise }

        planService
            .assignExercises(data)
            .then(() => {
                console.log('success')
            })
            .catch((error) => {
                console.log(error)
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

            {exercises ? results.map((exercise) => <Button headline={exercise.name} subline={exercise.description} image={exercise.files && exercise.files[0]} exercise={exercise} />)
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
                            <h1 onClick={assignExerciseToPlan}>Assign Exercises to Plan</h1>
                            {/* <Button className="btn btn--primary btn--lg" onClick={assignExerciseToPlan} name={"Assign Exercises to Plan"}></Button> */}
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