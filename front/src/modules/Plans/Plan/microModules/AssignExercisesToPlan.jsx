import React, { useState } from 'react';
import Icon from 'components/atoms/Icon';
import "react-multi-carousel/lib/styles.css";
import styled from 'styled-components';
import { StyledReactBottomSheetExtended, PanelContainer, PanelItem, MobilePanelItem, StyledMobileReactBottomSheet, BottomItem} from 'components/organisms/BottomSheet'
import { ExerciseDetailsPanel } from './ExerciseDetailsPanel';
import { Headline, Subline } from '../../../../components/typography';


const noExercises = "No exercises"
const plansSelected = '';
const returnToSubMenu = '';
const assignToPlan = '';


const BottomNav = styled.div`
    display:flex;
    background: ${({ theme }) => theme.white};
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

// export default AssignExercisesToPlan;