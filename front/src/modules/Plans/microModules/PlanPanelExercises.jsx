import React from 'react';
import { planService } from "services/planService";
import { Link} from 'react-router-dom';
import { alertActions } from 'redux/actions/alert.actions'
import { useDispatch } from 'react-redux';
import Icon from "common/Icon"
import "react-multi-carousel/lib/styles.css";
import { isMobile } from "react-device-detect";

//todo - care about lang
import messages from 'lang/eng'

var ReactBottomsheet = require('react-bottomsheet');

export const PlanPanelExercises = ({ activeSelectedExercise, id, setSelectedElementsBottomSheet, selectedElementsBottomSheet, props }) => {

    const dispatch = useDispatch()

    const unAssignExerciseToPlan = () => {
        const data = { planId: id.id, exerciseId: activeSelectedExercise }
        planService
            .unAssignExercises(data)
            .then(() => {
                dispatch(alertActions.success(messages.plans.unAllocateExercises))
                setSelectedElementsBottomSheet(false)
            })
            .catch((error) => {
                dispatch(alertActions.error(error))
            });
    }

    const editExercise = () => {
        // <button className='bottom-sheet-item'><Link to={{
        //     pathname: `/edit-exercise/${props.location.state.id}`,
        //     state: { activeSelectedExercise: activeSelectedExercise }
        // }}>{editExercise}</Link></button>
    }

    return (
        <ReactBottomsheet
            showBlockLayer={false}
            className="bottomsheet-without-background"
            visible={selectedElementsBottomSheet}
            onClose={() => setSelectedElementsBottomSheet(false)}
            appendCancelBtn={false}>
            {isMobile ?
                <>
                    <button onClick={() => unAssignExerciseToPlan()} className="bottom-sheet-item">{messages.plans.unAssignFromPlan}</button>
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
                        <p>{activeSelectedExercise.length} {messages.plans.selected}</p>
                        <div onClick={() => unAssignExerciseToPlan()} className="bottom-sheet-item__content"><Icon height={"18px"} name="trash" fill="#C3C3CF" />{messages.plans.unAssignFromPlan}</div>
                        {/* {activeSelectedExercise.length < 2 &&
                            <button className='bottom-sheet-item'><Link to={{
                                pathname: `/edit-exercise/${props.location.state.id}`,
                                state: { activeSelectedExercise: activeSelectedExercise }
                            }}>{editExercise}</Link></button> */}
                        }
                    </div>
                </>
            }
        </ReactBottomsheet>
    )
}