import React, { useState } from 'react';
import Icon from 'components/atoms/Icon';
import "react-multi-carousel/lib/styles.css";
import styled from 'styled-components';
import Button from "components/atoms/Button"
import Counter from "components/atoms/Counter"
import { StyledReactBottomSheetExtended, BottomNav, BottomNavItem, BottomItem} from 'components/organisms/BottomSheet'
import { Headline, Subline, MainHeadline } from 'components/typography';

const plansSelected = '';
const returnToSubMenu = '';
const assignToPlan = 'Assign exercise to plan';
const repeat = "Repeats:"
const exerciseTime = "Exercise time:"
const series = "Series:"
const weight = "Weight:"


const ExerciseAddItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin:1.8rem 1.8rem;
`;

export const ExerciseDetailsPanel = ({
    exercise,
    openExerciseDetailsPlan,
    setOpenExerciseDetailsPlan,
    setAssignExercises
}) => {

    const [exerciseData, setExerciseData] = useState([])


    const updateExercise = () =>{

        const exerciseModel = {}
        console.log(exerciseData)

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

    const openTest = () => {
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
            <BottomNavItem onClick={() => openTest()}>
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

            <Button type="submit" buttonType="primary" size="lg" buttonPlace="auth">{assignToPlan}</Button>
        </StyledReactBottomSheetExtended>
    )
}