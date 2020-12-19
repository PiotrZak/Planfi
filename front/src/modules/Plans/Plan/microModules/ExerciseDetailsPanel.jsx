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

const plansSelected = '';
const returnToSubMenu = '';
const assignToPlan = 'Assign exercise to plan';
const repeat = "Repeats:"
const exerciseTime = "Exercise time:"
const series = "Series:"
const weight = "Weight:"
const ExerciseAssignedToPlan = "Exercise Assigned to Plan"


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
        setExerciseData({ ...exerciseData, repeat: data + 1 })
    }
    const handleSeries = (data) => {
        setExerciseData({ ...exerciseData, series: data + 1 })
    }

    const handleTime = (data) => {
        setExerciseData({ ...exerciseData, times: data + 1 })
    }

    const handleWeight = (data) => {
        setExerciseData({ ...exerciseData, weight: data + 1 })
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
                    {returnToSubMenu}
                </BottomNavItem>
                <BottomNavItem>
                    <MainHeadline>{exercise.name}</MainHeadline>
                </BottomNavItem>
            </BottomNav>

            <ExerciseAddItem>
                <Headline>{repeat}</Headline>
                <Counter valueToChange = {1} handleData={handleRepeat} unit ={''}/>
            </ExerciseAddItem>

            <ExerciseAddItem>
                <Headline>{exerciseTime}</Headline>
                <Counter valueToChange = {30} handleData={handleTime} unit = {'s'}/>
            </ExerciseAddItem>

            <ExerciseAddItem>
                <Headline>{series}</Headline>
                <Counter valueToChange = {1} handleData={handleSeries}  unit ={''}/>
            </ExerciseAddItem>

            <ExerciseAddItem>
                <Headline>{weight}</Headline>
                <Counter valueToChange = {5} handleData={handleWeight} unit = {'kg'} />
            </ExerciseAddItem>

            <Button onClick = {updateExercise} type="submit" buttonType="primary" size="lg" buttonPlace="auth">{assignToPlan}</Button>
        </StyledReactBottomSheetExtended>
    )
}
