import React, { useState, useEffect, useCallback } from 'react';
import { exerciseService } from "services/exerciseService";
import Icon from 'components/atoms/Icon';
import styled from 'styled-components';
import { commonUtil } from "utils/common.util"
import "react-multi-carousel/lib/styles.css";
import { planService } from "services/planService";
import Search from "components/molecules/Search"
import { translate } from 'utils/Translation';
import BackTopNav from 'components/molecules/BackTopNav';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import GlobalTemplate, { Nav } from "templates/GlobalTemplate"
import { useThemeContext } from 'support/context/ThemeContext';
import { categoryService } from "services/categoryService";

//panels
import { AssignExercisesToPlan } from './AssignExercisesToPlan';
import { PlanPanelExercises } from '../../../modules/Exercises/Category/PlanPanelExercises';
import PlansPanel from "./PlansPanel"

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

const Plan = (props) => {

    const { theme } = useThemeContext();
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
    let id = match.params.id;

    useEffect(() => {
        getPlan(id.id)
        getAllCategories()
        getPlanExercise(id.id)
    }, [id]);


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

    const getPlanExercise = useCallback((id) => {
        exerciseService
            .getExercisesByPlan(id)
            .then((data) => {
                setExercises(data);
                setIsLoading(false)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const loadExercises = (id) => {
        exerciseService
            .getExercisesByCategory(id)
            .then((data) => {
                // data.length == 0 && dispatch(alertActions.warn('This category do not have exercises!'));
                setCategoryExercises(data);
            })
            .catch((error) => {
            });
    }

    const openAssignExercises = (id) => {
        loadExercises(id)
        if (categoryExercises.length > 0) {
            setAssignExercises('flex');
            setBottomSheet('none');
        }
    }


    const assignExerciseToPlan = () => {
        const data = { planId: id.id, exerciseId: activeExercise }
        planService
            .assignExercises(data)
            .then(() => {
                setBottomSheet('none')
                setAssignExercises(false)
            })
            .catch((error) => {
            });
    }


    const openBottomSheet = () => {
        setBottomSheet('flex')
        setSelectedElementsBottomSheet('none')
    }

    const closeAssignExercises = () => {
        setBottomSheet('flex');
        setAssignExercises('none');
    };

    const submissionHandleElement = (selectedData) => {
        const selectedExercises = commonUtil.getCheckedData(selectedData, "exerciseId")
        setActiveSelectedExercise(selectedExercises)
        selectedExercises.length > 0 ? setSelectedElementsBottomSheet('flex') : setSelectedElementsBottomSheet('none');
    }

    const filterExercises = event => {
        setSearchTerm(event.target.value);
    };

    const results = !searchTerm
        ? exercises
        : exercises.filter(exercise =>
            exercise.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );

    return (
        <>
            <GlobalTemplate>
                <Nav>
                    <BackTopNav />
                    {Plan && <h2>{Plan.title}</h2>}
                    {Plan &&
                        <IconWrapper>
                            <Icon onClick={() => openBottomSheet()} name="plus" fill={theme.colorInputActive} />
                        </IconWrapper>
                    }
                </Nav>
                <Search callBack={filterExercises} placeholder={translate('ExerciseSearch')} />
                {results ?
                    <CheckboxGenericComponent
                        dataType="exercises"
                        displayedValue={"name"}
                        dataList={results}
                        onSelect={submissionHandleElement} />
                    :
                    <p>{translate('NoExercises')}</p>}
            </GlobalTemplate>
            <PlansPanel
                theme = {theme}
                categories={categories}
                bottomSheet={bottomSheet}
                openAssignExercises={openAssignExercises}
                setBottomSheet={setBottomSheet}
                isLoading={isLoading} />
            <AssignExercisesToPlan
                setAssignExercises={setAssignExercises}
                assignExerciseToPlan={assignExerciseToPlan}
                closeAssignExercises={closeAssignExercises}
                assignExercise={assignExercise}
                activeExercise={activeExercise}
                categoryExercises={categoryExercises}
                setActiveExercise={setActiveExercise} />
            {/* <PlanPanelExercises
                theme={theme}
                d={id.id}
                categories={categories}
                // selectedExercise={selectedExercise}
                setSelectedElementsBottomSheet={setSelectedElementsBottomSheet}
                activeSelectedExercise={activeSelectedExercise}
                selectedElementsBottomSheet={selectedElementsBottomSheet}
                props={props} /> */}
        </>
    );
}

export default Plan;