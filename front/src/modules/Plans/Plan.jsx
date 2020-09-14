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
import { Loader } from "../../common/Loader"
import { Button } from "../../common/buttons/Button"
import { CheckboxGenericComponent } from "../../common/CheckboxGenericComponent"
import { CheckboxList } from '../../common/CheckboxList';
import Spacer from "../../common/Spacer"
import { commonUtil } from "../../../src/utils/common.util"

var ReactBottomsheet = require('react-bottomsheet');

export const Plan = (props) => {

    const [plan, setPlan] = useState();
    const [exercises, setExercises] = useState()

    const [activeExercise, setActiveExercise] = useState([])
    const [activeSelectedExercise, setActiveSelectedExercise] = useState([])

    const [isLoading, setIsLoading] = useState(true)


    const [searchTerm, setSearchTerm] = useState("");

    const [categories, setCategories] = useState()
    const [categoryExercises, setCategoryExercises] = useState()

    const [selectedElementsBottomSheet, setSelectedElementsBottomSheet] = useState(false)

    const [editable, setEditable] = useState(false)
    const [bottomSheet, setBottomSheet] = useState(false)

    const history = useHistory();
    const { match } = props;
    let id = match.params;

    const dispatch = useDispatch()

    useEffect(() => {
        getPlan(id.id)
        getAllCategories()
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
                setIsLoading(false)
            })
            .catch((error) => {
            });
    }

    const assignExerciseToPlan = () => {
        const data = { planId: id.id, exerciseId: activeExercise }
        planService
            .assignExercises(data)
            .then(() => {
                dispatch(alertActions.success(allocateExercises))
                setBottomSheet(false)
            })
            .catch((error) => {
                dispatch(alertActions.error(error))
            });
    }

    const unAssignExerciseToPlan = () => {
        console.log(activeExercise)
        const data = { planId: id.id, exerciseId: activeSelectedExercise }
        planService
            .unAssignExercises(data)
            .then(() => {
                dispatch(alertActions.success(unAllocateExercises))
                setSelectedElementsBottomSheet(false)
            })
            .catch((error) => {
                dispatch(alertActions.error(error))
            });
    }

    const deletePlan = () => {
        planService
            .deletePlanById(id.id)
            .then(() => {
                dispatch(alertActions.success(planDeleted))
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
        const selectedExercises = commonUtil.getCheckedData(selectedData, "exerciseId")
        setActiveExercise(selectedExercises)
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

    const submissionHandleElement = (selectedData) => {

        const selectedExercises = commonUtil.getCheckedData(selectedData, "exerciseId")
        setActiveSelectedExercise(selectedExercises)
  
        if (activeSelectedExercise.length > 0) {
            setEditable(true)
            setSelectedElementsBottomSheet(true)
        }
    }

    const allocateExercises = "Exercises succesfully allocated!";
    const unAssignFromPlan = "Unassign from plan"
    const unAllocateExercises = "Exercises succesfully deleted!";
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


            <Search callBack = {filterExercises}/>
            <Spacer h={90} />

            <Loader isLoading={isLoading}>
                {results ? <CheckboxGenericComponent dataType={"exercises"} dataList={results} displayedValue={"name"} onSelect={submissionHandleElement} /> : <h1>{noExerciseInPlan}</h1>}
            </Loader>

            <ReactBottomsheet
                visible={selectedElementsBottomSheet}
                onClose={() => setSelectedElementsBottomSheet(false)}
                appendCancelBtn={false}>

                <div>
                    {activeSelectedExercise.length == 1 ?
                        <div onClick={() => unAssignExerciseToPlan()} className="micro-bottom">
                            {/* todo - edit */}
                            <p >{unAssignFromPlan}</p>
                            {/* <button className='bottom-sheet-item'><Link to={{
                                pathname: `/edit-exercise/${props.location.state.id}`,
                                state: { activeSelectedExercise: activeSelectedExercise }
                            }}>Edit</Link></button> */}
                        </div>
                        : <div className="micro-bottom"><p onClick={() => unAssignExerciseToPlan()}>Delete</p></div>
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

const Search = ({callBack}) => {
    return(
        <div class="search-box">
        <input onChange={callBack} class="search-txt" type="text" placeholder="What are you looking for?" />
        <a class="search-btn" href="#">
            <div className="search-box__icon"><Icon name={"search"} fill={"#5E4AE3"} width={"24px"} height={"24px"} /></div>
        </a>
    </div>
    )
}


export default Plan;