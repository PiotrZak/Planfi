import React from 'react';
import Icon from "common/Icon"
import "react-multi-carousel/lib/styles.css";
import { Button } from "common/buttons/Button"
import { CheckboxGenericComponent } from "common/CheckboxGenericComponent"
import { commonUtil } from "utils/common.util"
import { isMobile } from "react-device-detect";

//todo - care about lang
import messages from 'lang/eng'

var ReactBottomsheet = require('react-bottomsheet');

export const AssignExercisesToPlan = ({ setAssignExercises, assignExerciseToPlan, closeAssignExercises, assignExercise, activeExercise, categoryExercises, setActiveExercise }) => {

    const selectActiveId = (selectedData) => {
        const selectedExercises = commonUtil.getCheckedData(selectedData, "exerciseId")
        setActiveExercise(selectedExercises)
    }

    return (
        <ReactBottomsheet
            showBlockLayer={false} z
            className={!isMobile && "bottomsheet-without-background"}
            visible={assignExercise}
            onClose={() => setAssignExercises(false)}
            appendCancelBtn={false}>
            <div>
                <div>
                    <div className="bottom-nav">
                        <div className="bottom-nav__item">
                            <Icon name="check" fill="#2E6D2C" />
                            <p>
                                {activeExercise.length}
                                {messages.plans.selected}
                            </p>
                        </div>
                        <div onClick={() => closeAssignExercises()} className="bottom-nav__item">
                            <Icon name="arrow-left" fill="#5E4AE3" />
                            <p>
                                {messages.plans.returnToSubMenu}
                            </p>
                        </div>
                    </div>
                    <CheckboxGenericComponent className="bottom-item" dataType="exercises" displayedValue="name" dataList={categoryExercises} onSelect={selectActiveId} />
                    <Button disabled={activeExercise.length === 0} className="btn btn--primary btn--lg" onClick={assignExerciseToPlan} name={messages.plans.assignToPlan}></Button>
                </div>
                }}
        </div>
        </ReactBottomsheet>
    )
}