import React from 'react';
import Icon from 'components/atoms/Icon';
import styled from 'styled-components';
import "react-multi-carousel/lib/styles.css";
import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
import StyledReactBottomSheet, { PanelContainer, PanelItem, } from 'components/organisms/BottomSheet'
import { translate } from 'utils/Translation';
import { planService } from "services/planService";
import { useNotificationContext, ADD } from 'support/context/NotificationContext';

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

export const PlansExercises = ({
    selectedExercise,
    theme,
    planPanel,
    setPlanPanel,
    planId,
    refreshData,
}) => {

    const { notificationDispatch } = useNotificationContext();

    const unAssignFromPlan = () => {

        const unAssignFromPlanModel = {
            planId: planId,
            exerciseId: selectedExercise
        }
        planService.unAssignExercises(unAssignFromPlanModel)
            .then(() => {
                notificationDispatch({
                    type: ADD,
                    payload: {
                        content: { success: 'OK', message: translate('PlanEdited') },
                        type: 'positive'
                    }
                })
                refreshData()
                setPlanPanel('none')
            })
            .catch((error) => {
                notificationDispatch({
                    type: ADD,
                    payload: {
                        content: { error: error, message: translate('ErrorAlert') },
                        type: 'error'
                    }
                })
            });
    }

    const history = useHistory();
    const editExercise = () => {
        history.push({
            pathname: `/edit-exercise/${selectedExercise}`,
            state: { selectedExercise: selectedExercise, ifPlanEdited: true },
        })
    }

    return (
        <StyledReactBottomSheet
            showBlockLayer={false}
            className={""}
            visible={planPanel}
            onClose={() => setPlanPanel('none')}
            appendCancelBtn={false}>
            {isMobile ?
                <>
                    {selectedExercise.length > 1 ?
                        < PanelItem onClick={() => unAssignFromPlan()}>
                            <p>{translate('UnassignExercise')}</p>
                        </PanelItem>
                        :
                        <>
                            < PanelItem onClick={() => unAssignFromPlan()}>
                                <p>{translate('UnassignExercise')}</p>
                            </PanelItem>
                            <PanelItem onClick={() => editExercise()}>
                                <p>{translate('EditExercise')}</p>
                            </PanelItem>
                        </>
                    }
                </>
                :
                <>
                    <PanelContainer>
                        <PanelItem>
                            <IconWrapper>
                                <Icon name="check" fill={theme.colorInputActive} />
                            </IconWrapper>
                            {selectedExercise.length} {translate('Selected')}
                        </PanelItem>
                        <PanelItem onClick={() => unAssignFromPlan()}>
                            {translate('UnassignExercise')}
                        </PanelItem>
                        {selectedExercise.length < 2 &&
                            <PanelItem onClick={() => editExercise()}>
                                {translate('EditExercise')}
                            </PanelItem>
                        }
                    </PanelContainer>
                </>}
        </StyledReactBottomSheet>
    );
}