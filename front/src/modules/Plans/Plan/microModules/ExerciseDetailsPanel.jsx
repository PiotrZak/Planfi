import React, { useState } from 'react';
import Icon from 'components/atoms/Icon';
import "react-multi-carousel/lib/styles.css";
import styled from 'styled-components';
import Button from "components/atoms/Button"
import Counter from "components/atoms/Counter"
import { commonUtil } from "utils/common.util"
import { isMobile } from "react-device-detect";
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import { StyledReactBottomSheetExtended, PanelContainer, PanelItem, MobilePanelItem, StyledMobileReactBottomSheet, } from 'components/organisms/BottomSheet'

const plansSelected = '';
const returnToSubMenu = '';
const assignToPlan = '';

const Headline = styled.h4`
  margin: 0 0 0 0;
  font-size:1.4rem;
`;

const BottomNav = styled.div`
    display:flex;
    background: ${({ theme }) => theme.colorGray90};
`;

const BottomNavItem = styled.div`
        display:flex;
        align-items:center;
        margin:0 0 0 3.6rem;
`

const repeat = "Repeats:"
const exerciseTime = "Exercise time:"
const series = "Series:"
const load = "Weight:"

const Subline = styled.p`
margin: 0 0 0 0;
font-size:1.1rem;
`;


export const ExerciseDetailsPanel = ({
    exercise,
    openExerciseDetailsPlan,
    setOpenExerciseDetailsPlan,
    setAssignExercises
}) => {

    const [exerciseData, setExerciseData] = useState([])

    const handleSeries = (data) => {
        setExerciseData({ ...exerciseData, series: data + 1 })
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
                <BottomNavItem>
                    <Icon name="check" fill="#2E6D2C" />
                    <Headline>{exercise.name}</Headline>
                </BottomNavItem>
                <BottomNavItem onClick={() => openTest()}>
                    <Icon name="arrow-left" fill="#5E4AE3" />
                    {returnToSubMenu}
                </BottomNavItem>
            </BottomNav>
            
            <Subline>{repeat}</Subline>
            <Counter handleData={handleSeries} />

            <Subline>{exerciseTime}</Subline>
            <Counter handleData={handleSeries} />

            <Subline>{series}</Subline>
            <Counter handleData={handleSeries} />
            
            <Subline>{load}</Subline>
            <Counter handleData={handleSeries} />
            {/* <Button disabled={activeExercise.length === 0} className="btn btn--primary btn--lg" onClick={assignExerciseToPlan} name={assignToPlan}></Button> */}
        </StyledReactBottomSheetExtended>
    )
}