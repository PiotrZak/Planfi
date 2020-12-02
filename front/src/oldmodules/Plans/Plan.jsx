import React, { useState, useEffect } from 'react';
import { planService } from "services/planService";
import { exerciseService } from "services/exerciseService";
import { categoryService } from "services/categoryService";
import { alertActions } from 'redux/actions/alert.actions'
import { useDispatch } from 'react-redux';
import Icon from 'components/atoms/Icon';
import "react-multi-carousel/lib/styles.css";
import { Loader } from 'components/atoms/Loader';
import { CheckboxGenericComponent } from "components/organisms/CheckboxGenericComponent"
import Spacer from "components/atoms/Spacer"
import { commonUtil } from "utils/common.util"
import Search from "components/atoms/Search"

import { PlansPanel } from "./microModules/PlansPanel"
import { AssignExercisesToPlan } from "./microModules/AssignExercisesToPlan"
import { PlanPanelExercises } from "../../modules/Exercises/Category/PlanPanelExercises"

export const Plan = (props) => {

    const [plan, setPlan] = useState();

    const [assignExercise, setAssignExercises] = useState('flex')
    const [exercises, setExercises] = useState()
    const [activeExercise, setActiveExercise] = useState([])
    const [activeSelectedExercise, setActiveSelectedExercise] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState()
    const [categoryExercises, setCategoryExercises] = useState([])
    const [selectedElementsBottomSheet, setSelectedElementsBottomSheet] = useState('none')
    const [bottomSheet, setBottomSheet] = useState('none')

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
                dispatch(alertActions.success(messages.plans.allocateExercises))
                setBottomSheet('none')
                setAssignExercises('noone')
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

    const loadExercises = (id) => {
        exerciseService
            .getExercisesByCategory(id)
            .then((data) => {
                data.length == 0 && dispatch(alertActions.warn('This category do not have exercises!'));
                setCategoryExercises(data);
            })
            .catch((error) => {
            });
    }

    const submissionHandleElement = (selectedData) => {
        const selectedExercises = commonUtil.getCheckedData(selectedData, "exerciseId")
        setActiveSelectedExercise(selectedExercises)
        selectedExercises.length > 0 ? setSelectedElementsBottomSheet(true) : setSelectedElementsBottomSheet(false);
    }

    const openBottomSheet = () => {
        setBottomSheet('flex')
        setSelectedElementsBottomSheet('none')
    }

    const openAssignExercises = (id) => {
        loadExercises(id)
        if (categoryExercises.length > 0) {
            setAssignExercises('flex');
            setBottomSheet('none');
        }
    }

    const closeAssignExercises = () => {
        setBottomSheet('flex');
        setAssignExercises('none');
    };

    return (
        <GlobalTemplate>
            <Nav>
                <BackTopNav />
                {Plan && <h2>{Plan.title}</h2>}
                {Plan &&
                    <IconWrapper>
                        <Icon onClick={() => openBottomSheet()} name="plus" fill={theme.colorInputActive} text={messages.plans.addExerciseToPlan} />
                    </IconWrapper>
                }
            </Nav>
            <Search callBack={filterExercises} />
            <Spacer h={90} />
            <Loader isLoading={isLoading}>
                {results ? <CheckboxGenericComponent dataType={"exercises"} dataList={results} displayedValue={"name"} onSelect={submissionHandleElement} /> : <h1>{messages.plans.noExerciseInPlan}</h1>}
            </Loader>
            <PlansPanel categories={categories} bottomSheet={bottomSheet} openAssignExercises={openAssignExercises} setBottomSheet={setBottomSheet} isLoading={isLoading} />
            <AssignExercisesToPlan setAssignExercises={setAssignExercises} assignExerciseToPlan={assignExerciseToPlan} closeAssignExercises={closeAssignExercises} assignExercise={assignExercise} activeExercise={activeExercise} categoryExercises={categoryExercises} setActiveExercise={setActiveExercise} />
            <PlanPanelExercises id={id.id} categories={categories} setSelectedElementsBottomSheet={setSelectedElementsBottomSheet} activeSelectedExercise={activeSelectedExercise} selectedElementsBottomSheet={selectedElementsBottomSheet} props={props} />
        </GlobalTemplate>
    );
}

export default Plan;