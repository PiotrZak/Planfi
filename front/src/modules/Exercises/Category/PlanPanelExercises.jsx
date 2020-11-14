import React from 'react';
import { planService } from "services/planService";
import { exerciseService } from "services/exerciseService";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from 'components/atoms/Icon';
import "react-multi-carousel/lib/styles.css";
import { isMobile } from "react-device-detect";
import StyledReactBottomSheet, { PanelContainer, PanelItem, MobilePanelItem, StyledMobileReactBottomSheet, } from 'components/organisms/BottomSheet'
import { translate } from 'utils/Translation';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';

const EditExercise = "Edit Exercise";
const DeleteExercise = "Delete Exercise";
const ExercisesDeleted = "The exercises succesfully deleted!"


const IconWrapper = styled.div`
    margin-top: .4rem;
`;

export const PlanPanelExercises = ({
    selectedExercise,
    setSelectedElementsBottomSheet,
    bottomSheet,
    theme,
}) => {
    const { notificationDispatch } = useNotificationContext();

    const editExercise = () => {
    }

    const deleteExercise = () => {
        exerciseService
            .deleteExerciseById(selectedExercise)
            .then((data) => {
                notificationDispatch({
                    type: ADD,
                    payload: {
                      content: { success: 'OK', message: translate('ExercisesDeleted') },
                      type: 'positive'
                    }
                  })
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

    return (
        <StyledReactBottomSheet
            showBlockLayer={false}
            className="bottomsheet-without-background"
            visible={bottomSheet}
            onClose={() => setSelectedElementsBottomSheet(false)}
            appendCancelBtn={false}>
            {isMobile ?
                <>
                    <>
                        <StyledMobileReactBottomSheet>
                            <MobilePanelItem>
                                {selectedExercise.length == 1
                                    ? <p>{translate('DeleteCategory')}</p>
                                    : <p>{translate('DeleteCategory')}</p>
                                }
                            </MobilePanelItem>
                            <MobilePanelItem>
                                {selectedExercise.length == 1 &&
                                    <p>{translate('EditCategory')}</p>
                                }
                            </MobilePanelItem>
                        </StyledMobileReactBottomSheet>
                    </>

                    <button onClick={() => deleteExercise} className="bottom-sheet-item">
                        {/* {messages.plans.unAssignFromPlan} */}
                    </button>
                    {selectedExercise.length < 2 &&
                        <button className='bottom-sheet-item'><Link to={{
                            pathname: `/edit-exercise/${selectedExercise}`,
                            state: { selectedExercise: selectedExercise }
                        }}>{editExercise}</Link></button>
                    }
                </>
                :
                <>
                    <PanelContainer>
                        <PanelItem>
                            <IconWrapper>
                                <Icon name="check" fill={theme.colorInputActive} />
                            </IconWrapper>
                            {selectedExercise.length} {translate('selected')}
                        </PanelItem>
                        <PanelItem onClick={() => deleteExercise()}>
                            <Icon name="trash" fill={theme.colorInputActive} />{translate('DeleteExercise')}
                        </PanelItem>
                        {selectedExercise.length < 2 &&
                            <PanelItem>
                                <Link to={{
                                    pathname: `/edit-exercise/${selectedExercise}`,
                                    state: { selectedExercise: selectedExercise }
                                }}>{editExercise}
                                <Icon name="edit" fill={theme.colorInputActive} />{translate('EditExercise')}
                                </Link>
                            </PanelItem>
                        }
                    </PanelContainer>
                </>}
        </StyledReactBottomSheet>
    )
}