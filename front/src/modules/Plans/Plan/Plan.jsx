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

import { PlansPanel } from "./microModules/PlansPanel"
import { AssignExercisesToPlan } from "./microModules/AssignExercisesToPlan"
import { PlanPanelExercises } from "./microModules/PlanPanelExercises"

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

const Plan = (props) => {

    const { theme } = useThemeContext();
    const [plan, setPlan] = useState();


    const [bottomSheet, setBottomSheet] = useState('none')
    const [assignExercise, setAssignExercises] = useState('none')
    const [selectedElementsBottomSheet, setSelectedElementsBottomSheet] = useState('none')


    const [exercises, setExercises] = useState()
    const [activeExercise, setActiveExercise] = useState([])
    const [activeSelectedExercise, setActiveSelectedExercise] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState()
    const [categoryExercises, setCategoryExercises] = useState([])


    const { match } = props;
    let id = match.params.id;
    console.log(id)

    useEffect(() => {
        getPlan(id)
        getAllCategories()
        getPlanExercise(id.id)
    }, [id]);


    const getPlan = useCallback((id) => {
        planService
            .getPlanById(id)
            .then((data) => {
                setPlan(data);
            })
            .catch((error) => {
            });
        },[])

    const getAllCategories = useCallback(() => {
        categoryService
            .getAllCategories()
            .then((data) => {
                setCategories(data);
                setIsLoading(false);
            })
            .catch(() => {
            });
    },[])

    const getPlanExercise = useCallback((id) => {
        exerciseService
            .getExercisesByPlan(id)
            .then((data) => {
                console.log(data)
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
                console.log(data)
                setCategoryExercises(data);
                setIsLoading(false)
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
        const data = { planId: id, exerciseId: activeExercise }
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
                    {plan && <h2>{plan.title}</h2>}
                    {plan &&
                        <IconWrapper>
                            <Icon onClick={() => setBottomSheet('flex')} name="plus" fill={theme.colorInputActive} />
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
            <PlanPanelExercises
                id={id.id}
                categories={categories}
                setSelectedElementsBottomSheet={setSelectedElementsBottomSheet}
                activeSelectedExercise={activeSelectedExercise}
                selectedElementsBottomSheet={selectedElementsBottomSheet}
                props={props} />
        </>
    );
}

export default Plan;