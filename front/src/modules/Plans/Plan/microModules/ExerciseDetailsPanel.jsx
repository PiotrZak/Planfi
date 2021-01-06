import React, { useState } from 'react';
import Icon from 'components/atoms/Icon';
import "react-multi-carousel/lib/styles.css";
import styled from 'styled-components';
import Button from "components/atoms/Button"
import Counter from "components/atoms/Counter"
import { planService } from "services/planService";
import { StyledReactBottomSheetExtended, BottomNav, BottomNavItem, BottomItem} from 'components/organisms/BottomSheet'
import { Headline, MainHeadline } from 'components/typography';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import { translate } from 'utils/Translation';
import { weightToChange, timesToChange, seriesToChange, repeatsToChange } from 'support/magicVariables';

const ExerciseAddItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin:1.8rem 1.8rem;
`;

export const ExerciseDetailsPanel = ({
    planId,
    exercise,
    openExerciseDetailsPlan,
    setOpenExerciseDetailsPlan,
    setAssignExercises
}) => {

    const { notificationDispatch } = useNotificationContext();
    const [exerciseData, setExerciseData] = useState([])

    const updateExercise = () =>{

        const exerciseModel = {
            exerciseModel: {
                repeats: exerciseData.repeat,
                times: exerciseData.times,
                series: exerciseData.series,
                weight: exerciseData.weight,
            },
            planId: planId,
            exerciseId: [exercise.exerciseId],
        }
        planService
            .assignExercises(exerciseModel)
            .then(() => {
                notificationDispatch({
                    type: ADD,
                    payload: {
                      content: { success: 'OK', message: translate('ExerciseAssignedToPlan') },
                      type: 'positive',
                    },
                  });
                  returnToExercises()
            })
            .catch((error) => {
                notificationDispatch({
                    type: ADD,
                    payload: {
                      content: { error, message: translate('ErrorAlert') },
                      type: 'error',
                    },
                  });
            });
    }

    const handleRepeat = (data) => {
        setExerciseData({ ...exerciseData, repeat: data})
    }
    const handleSeries = (data) => {
        setExerciseData({ ...exerciseData, series: data})
    }

    const handleTime = (data) => {
        setExerciseData({ ...exerciseData, times: data})
    }

    const handleWeight = (data) => {
        setExerciseData({ ...exerciseData, weight: data})
    }

    const returnToExercises = () => {

        setOpenExerciseDetailsPlan('none')
        setAssignExercises('flex')
    }

    return (
        <StyledReactBottomSheetExtended
            showBlockLayer={false}
            visible={openExerciseDetailsPlan}
            className={""}
            onClose={() => setOpenExerciseDetailsPlan('none')}
            appendCancelBtn={false}>
            <BottomNav>
            <BottomNavItem onClick={() => returnToExercises()}>
                    <Icon name="arrow-left" fill="#5E4AE3" />
                    {translate('ReturnToSubMenuExercises')}
                </BottomNavItem>
                <BottomNavItem>
                    <MainHeadline>{exercise.name}</MainHeadline>
                </BottomNavItem>
            </BottomNav>

            <ExerciseAddItem>
                <Headline>{translate('Repeat')}</Headline>
                <Counter defaultValue = {0} valueToChange = {repeatsToChange} handleData={handleRepeat} unit ={''}/>
            </ExerciseAddItem>

            <ExerciseAddItem>
                <Headline>{translate('ExerciseTime')}</Headline>
                <Counter defaultValue = {0} valueToChange = {timesToChange} handleData={handleTime} unit = {'s'}/>
            </ExerciseAddItem>

            <ExerciseAddItem>
                <Headline>{translate('Series')}</Headline>
                <Counter defaultValue = {0} valueToChange = {seriesToChange} handleData={handleSeries}  unit ={''}/>
            </ExerciseAddItem>

            <ExerciseAddItem>
                <Headline>{translate('Weight')}</Headline>
                <Counter defaultValue = {0} valueToChange = {weightToChange} handleData={handleWeight} unit = {'kg'} />
            </ExerciseAddItem>

            <Button onClick = {updateExercise} type="submit" buttonType="primary" size="lg" buttonPlace="auth">{translate('AssignToPlan')}</Button>
        </StyledReactBottomSheetExtended>
    )
}
