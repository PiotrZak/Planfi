import React from 'react';
import { planService } from "services/planService";
import { Link } from 'react-router-dom';
import Icon from 'components/atoms/Icon';
import "react-multi-carousel/lib/styles.css";
import { isMobile } from "react-device-detect";

import  StyledReactBottomSheet, { PanelContainer, PanelItem, MobilePanelItem, StyledMobileReactBottomSheet, } from 'components/organisms/BottomSheet'
var ReactBottomsheet = require('react-bottomsheet');

const unAllocateExercises = "UnAllocate Exercises"
const unAssignFromPlan = "Unassign from plan"
const plansSelected = "Selected Plans"

export const PlanPanelExercises = ({ activeSelectedExercise, id, setSelectedElementsBottomSheet, selectedElementsBottomSheet, props }) => {


    const unAssignExerciseToPlan = () => {
        const data = { planId: id, exerciseId: activeSelectedExercise }
        planService
            .unAssignExercises(data)
            .then(() => {
                //unallocate communicate
                setSelectedElementsBottomSheet(false)
            })
            .catch((error) => {
            });
    }

    const editExercise = () => {
        // <button className='bottom-sheet-item'><Link to={{
        //     pathname: `/edit-exercise/${props.location.state.id}`,
        //     state: { activeSelectedExercise: activeSelectedExercise }
        // }}>{editExercise}</Link></button>
    }

    return (
        <StyledReactBottomSheet
            showBlockLayer={false}
            className={""}
            visible={selectedElementsBottomSheet}
            onClose={() => setSelectedElementsBottomSheet(false)}
            appendCancelBtn={false}>
            {isMobile ?
                <>
                    <button onClick={() => unAssignExerciseToPlan()} className="bottom-sheet-item">{unAssignFromPlan}</button>
                    {activeSelectedExercise.length < 2 &&
                        <button className='bottom-sheet-item'><Link to={{
                            pathname: `/edit-exercise/${props.location.state.id}`,
                            state: { activeSelectedExercise: activeSelectedExercise }
                        }}>{editExercise}</Link></button>
                    }
                </>
                :
                <>
                    <div className="bottom-sheet-item__oneline">
                        <Icon name="check" fill="#2E6D2C" />
                        <p>{activeSelectedExercise.length} {plansSelected}</p>
                        <div onClick={() => unAssignExerciseToPlan()} className="bottom-sheet-item__content"><Icon height={"18px"} name="trash" fill="#C3C3CF" />{unAssignFromPlan}</div>
                        {/* {activeSelectedExercise.length < 2 &&
                            <button className='bottom-sheet-item'><Link to={{
                                pathname: `/edit-exercise/${props.location.state.id}`,
                                state: { activeSelectedExercise: activeSelectedExercise }
                            }}>{editExercise}</Link></button> */}
                        }
                    </div>
                </>
            }
        </StyledReactBottomSheet>
    )
}