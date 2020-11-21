import React from 'react';
import { planService } from "services/planService";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from 'components/atoms/Icon';
import "react-multi-carousel/lib/styles.css";
import { isMobile } from "react-device-detect";
import StyledReactBottomSheet, { PanelContainer, PanelItem, MobilePanelItem, StyledMobileReactBottomSheet, } from 'components/organisms/BottomSheet'
import { translate } from 'utils/Translation';

const EditExercise = "Edit Exercise";
const DeleteExercise = "Delete Exercise";


const IconWrapper = styled.div`
    margin-top: .4rem;
`;

export const PlanPanelExercises = ({
    selectedExercise,
    id,
    setSelectedElementsBottomSheet,
    bottomSheet,
    props,
    theme,
}) => {

    const unAssignExerciseToPlan = () => {
        const data = { planId: id, exerciseId: selectedExercise }
        planService
            .unAssignExercises(data)
            .then(() => {
                setSelectedElementsBottomSheet(false)
            })
            .catch((error) => {
            });
    }

    const editExercise = () => {
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

                    <button onClick={() => unAssignExerciseToPlan()} className="bottom-sheet-item">
                        {/* {messages.plans.unAssignFromPlan} */}
                    </button>
                    {selectedExercise.length < 2 &&
                        <button className='bottom-sheet-item'><Link to={{
                            pathname: `/edit-exercise/${props.location.state.id}`,
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
                                    pathname: `/edit-exercise/${props.location.state.id}`,
                                    state: { selectedExercise: selectedExercise }
                                }}>{editExercise}</Link>
                                <Icon name="edit" fill={theme.colorInputActive} />{translate('EditExercise')}
                            </PanelItem>
                        }
                    </PanelContainer>
                </>}
        </StyledReactBottomSheet>
    )
}