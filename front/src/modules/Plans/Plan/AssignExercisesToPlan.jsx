import React from 'react';
import Icon from 'components/atoms/Icon';
import "react-multi-carousel/lib/styles.css";
import Button from "components/atoms/Button"
import { commonUtil } from "utils/common.util"
import { isMobile } from "react-device-detect";
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import StyledReactBottomSheet, { PanelContainer, PanelItem, MobilePanelItem, StyledMobileReactBottomSheet, } from 'components/organisms/BottomSheet'


const plansSelected = '';
const returnToSubMenu = '';
const assignToPlan = '';

export const AssignExercisesToPlan = ({
    setAssignExercises,
    assignExerciseToPlan,
    closeAssignExercises,
    assignExercise,
    activeExercise,
    categoryExercises,
    setActiveExercise }) => {

    const selectActiveId = (selectedData) => {
        const selectedExercises = commonUtil.getCheckedData(selectedData, "exerciseId")
        setActiveExercise(selectedExercises)
    }

    return (
        <StyledReactBottomSheet
            showBlockLayer={false}
            visible={assignExercise}
            className={""}
            onClose={() => setAssignExercises('none')}
            appendCancelBtn={false}>
            <div>
                <div>
                    {/* todo - bottom-nav */}
                    <div className="bottom-nav">
                        <div className="bottom-nav__item">
                            <Icon name="check" fill="#2E6D2C" />
                            <p>
                                {activeExercise.length} {plansSelected}
                            </p>
                        </div>
                        <div onClick={() => closeAssignExercises()} className="bottom-nav__item">
                            <Icon name="arrow-left" fill="#5E4AE3" />
                            <p>
                                {returnToSubMenu}
                            </p>
                        </div>
                    </div>
                    <CheckboxGenericComponent
                        dataType="exercises"
                        displayedValue={"name"}
                        dataList={categoryExercises}
                        onSelect={selectActiveId} />
                    <Button disabled={activeExercise.length === 0} className="btn btn--primary btn--lg" onClick={assignExerciseToPlan} name={assignToPlan}></Button>
                </div>
                }}
        </div>
        </StyledReactBottomSheet>
    )
}