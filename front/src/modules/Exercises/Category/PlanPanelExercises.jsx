import React from 'react';
import { useParams, useHistory } from "react-router-dom";
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
    deleteExercise,
    selectedExercise,
    setSelectedElementsBottomSheet,
    bottomSheet,
    theme,
}) => {
    const history = useHistory();

    const editExercise = () => {
        history.push({
            pathname: `/edit-exercise/${selectedExercise}`,
            state: { selectedExercise: selectedExercise },
          })
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
                        <StyledMobileReactBottomSheet>
                            <PanelItem>
                                {selectedExercise.length == 1
                                    ? <p>{translate('DeleteCategory')}</p>
                                    : <p>{translate('DeleteCategory')}</p>
                                }
                            </PanelItem>
                            {selectedExercise.length < 2 &&
                            <PanelItem>
                                    <p>{translate('EditCategory')}</p>
                            </PanelItem>
                           }
                        </StyledMobileReactBottomSheet>
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
                            <PanelItem onClick = {() => editExercise()}>
                                <Icon name="edit" fill={theme.colorInputActive} />{translate('EditExercise')}
                            </PanelItem>
                        }
                    </PanelContainer>
                </>}
        </StyledReactBottomSheet>
    )
}
