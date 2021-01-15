import React, { useState } from 'react';
import Icon from 'components/atoms/Icon';
import "react-multi-carousel/lib/styles.css";
import { StyledReactBottomSheetExtended, BottomNav, BottomNavItem, BottomItem } from 'components/organisms/BottomSheet'
import { ExerciseDetailsPanel } from '../../../../modules/Plans/Plan/microModules/ExerciseDetailsPanel';
import { Headline } from '../../../../components/typography';
import { translate } from 'utils/Translation';

export const AssignExercisesToPlan = ({
    planId,
    setAssignExercises,
    closeAssignExercises,
    assignExercise,
    categoryExercises,
}) => {

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
                    <BottomNavItem onClick={() => closeAssignExercises()}>
                        <Icon name="arrow-left" fill="#5E4AE3" />
                        <Headline>{translate('ReturnToSubMenuCategories')}</Headline>
                    </BottomNavItem>
                </BottomNav>
                {categoryExercises ?
                    categoryExercises.map((element, i) =>
                        <BottomItem onClick={() => openExerciseDetailsPanel(element)}>
                            <Headline>{element.name}</Headline>
                        </BottomItem>
                    )
                    : <p>{translate('NoExercises')}</p>
                }
            </StyledReactBottomSheetExtended>
            <ExerciseDetailsPanel
                planId={planId}
                setOpenExerciseDetailsPlan={setOpenExerciseDetailsPlan}
                openExerciseDetailsPlan={openExerciseDetailsPlan}
                exercise={selectedExercise}
                setAssignExercises={setAssignExercises} />
        </>
    )
}