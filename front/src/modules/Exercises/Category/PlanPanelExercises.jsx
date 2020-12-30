import React from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import Icon from 'components/atoms/Icon';
import "react-multi-carousel/lib/styles.css";
import { isMobile } from "react-device-detect";
import StyledReactBottomSheet, { PanelContainer, PanelItem, StyledMobileReactBottomSheet, } from 'components/organisms/BottomSheet'
import { translate } from 'utils/Translation';

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
                {/* todo - make it works */}
                    <StyledMobileReactBottomSheet>
                        {selectedExercise.length > 1 ?
                            < PanelItem onClick={() => deleteExercise()}>
                                {selectedExercise.length > 1
                                    ? <p>{translate('DeleteCategory')}</p>
                                    : <p>{translate('DeleteCategories')}</p>
                                }
                            </PanelItem>
                            :
                            <>
                                < PanelItem onClick={() => deleteExercise()}>
                                    {selectedExercise.length > 1
                                        ? <p>{translate('DeleteCategory')}</p>
                                        : <p>{translate('DeleteCategories')}</p>
                                    }
                                </PanelItem>
                                <PanelItem onClick={() => editExercise()}>
                                    <p>{translate('EditCategory')}</p>
                                </PanelItem>
                            </>
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
                            {selectedExercise.length} {translate('Selected')}
                        </PanelItem>
                        <PanelItem onClick={() => deleteExercise()}>
                            <Icon name="trash" fill={theme.colorInputActive} />{translate('DeleteExercise')}
                        </PanelItem>
                        {selectedExercise.length < 2 &&
                            <PanelItem onClick={() => editExercise()}>
                                <Icon name="edit" fill={theme.colorInputActive} />{translate('EditExercise')}
                            </PanelItem>
                        }
                    </PanelContainer>
                </>}
        </StyledReactBottomSheet>
    )
}
