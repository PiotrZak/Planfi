import React, { useState } from 'react';
import Icon from 'components/atoms/Icon';
import "react-multi-carousel/lib/styles.css";
import styled from 'styled-components';
import Button from "components/atoms/Button"
import { commonUtil } from "utils/common.util"
import { isMobile } from "react-device-detect";
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import { StyledReactBottomSheetExtended, PanelContainer, PanelItem, MobilePanelItem, StyledMobileReactBottomSheet, } from 'components/organisms/BottomSheet'
import { ExerciseDetailsPanel } from './ExerciseDetailsPanel';


const noExercises = "No exercises"
const plansSelected = '';
const returnToSubMenu = '';
const assignToPlan = '';

const BottomItem = styled.div`
    border:1px solid ${({ theme }) => theme.colorGray90};
    padding:1.6rem;
    color:white;
    margin:1.8rem 1.8rem;
    background: ${({ theme }) => theme.colorGray90};
    border-radius:8px;
    &:hover{
      cursor:pointer;
    }
`

const BottomNav = styled.div`
    display:flex;
    background: ${({ theme }) => theme.colorGray90};
`;

const BottomNavItem = styled.div`
    display:flex;
    align-items:center;
    margin:0 0 0 3.6rem;
`
export const AssignExercisesToPlan = ({
    setAssignExercises,
    assignExerciseToPlan,
    closeAssignExercises,
    assignExercise,
    activeExercise,
    categoryExercises,
    setActiveExercise }) => {

    const [selectedExercise, setSelectedExercise] = useState([])
    const [openExerciseDetailsPlan, setOpenExerciseDetailsPlan] = useState('none')

    const openExerciseDetailsPanel = (exercise) => {
        setSelectedExercise(exercise)
        setAssignExercises('none')
        setOpenExerciseDetailsPlan('flex')
    }

    const MainHeadline = styled.h2`
        margin: 0 0 0 0;
        font-size:2.8rem;
    `;

    const Headline = styled.h4`
        margin: 0 0 0 0;
        font-size:1.4rem;
    `;

    const Subline = styled.p`
        margin: 0 0 0 0;
        font-size:1.1rem;
    `;

    return (
        <>
        <StyledReactBottomSheetExtended
            showBlockLayer={false}
            visible={assignExercise}
            className={""}
            onClose={() => setAssignExercises('none')}
            appendCancelBtn={false}>
            <BottomNav>
                <BottomNavItem>
                    <Icon name="check" fill="#2E6D2C" />
                    {activeExercise.length} {plansSelected}
                </BottomNavItem>
                <BottomNavItem onClick={() => closeAssignExercises()}>
                    <Icon name="arrow-left" fill="#5E4AE3" />
                    {returnToSubMenu}
                </BottomNavItem>
            </BottomNav>
            {categoryExercises ?
                categoryExercises.map((element, i) =>
                    <BottomItem onClick={() => openExerciseDetailsPanel(element)}>
                        <Headline>{element.name}</Headline>
                        <Subline>{element.exerciseId}</Subline>
                        <Subline>{`${element.series} / ${element.times}`}</Subline>
                    </BottomItem>
                )
                : <p>{noExercises}</p>
            }
            }}
        </StyledReactBottomSheetExtended>
        <ExerciseDetailsPanel
                setOpenExerciseDetailsPlan={setOpenExerciseDetailsPlan}
                openExerciseDetailsPlan={openExerciseDetailsPlan}
                exercise={selectedExercise} 
                setAssignExercises = {setAssignExercises}/>
        </>
    )
}