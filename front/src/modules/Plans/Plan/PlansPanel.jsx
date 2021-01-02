import React from 'react';
import { planService } from "services/planService";
import Icon from 'components/atoms/Icon';
import "react-multi-carousel/lib/styles.css";
import styled from 'styled-components';
import { isMobile } from "react-device-detect";
import "react-multi-carousel/lib/styles.css";
import { translate } from 'utils/Translation';
import StyledReactBottomSheet, { PanelContainer, PanelItem, MobilePanelItem, StyledMobileReactBottomSheet, } from 'components/organisms/BottomSheet'
import { useNotificationContext, ADD } from 'support/context/NotificationContext';

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

const PlansPanel = ({
    openEditModal,
    setOpenEditModal,
    theme,
    bottomSheet,
    setBottomSheet,
    selectedPlans
}) => {

    const { notificationDispatch } = useNotificationContext();

    const deletePlans = () => {
        planService
            .deletePlans(selectedPlans)
            .then(() => {
                setBottomSheet('none')
                notificationDispatch({
                    type: ADD,
                    payload: {
                        content: { success: 'OK', message: translate('PlansDeleted') },
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
    };

    return (
        <StyledReactBottomSheet
            showBlockLayer={false}
            visible={bottomSheet}
            className={""}
            onClose={() => setBottomSheet(false)}
            appendCancelBtn={false}>
            {isMobile ?
                <>
                    <StyledReactBottomSheetExtended>
                        <PanelItem onClick={() => deletePlans()}>
                            {selectedPlans.length == 1
                                ? <p>{translate('DeletePlan')}</p>
                                : <p>{translate('DeletePlans')}</p>
                            }
                        </PanelItem>
                        {selectedPlans.length < 2 &&
                            <PanelItem onClick={setOpenEditModal}>
                                <p>{translate('EditPlan')}</p>
                            </PanelItem>
                        }
                    </StyledReactBottomSheetExtended>
                </>
                :
                <>
                    <PanelContainer>
                        <PanelItem>
                            <IconWrapper>
                                <Icon name="check" fill={theme.colorInputActive} />
                            </IconWrapper>
                             {translate('selected')}
                        </PanelItem>
                        <PanelItem onClick={() => deletePlans()}>
                            <Icon name="trash" fill={theme.colorInputActive} />{translate('DeletePlan')}
                        </PanelItem>
                            <PanelItem onClick={setOpenEditModal}>
                                <Icon name="edit" fill={theme.colorInputActive} />{translate('EditCategory')}
                            </PanelItem>
                    </PanelContainer>
                </>
            }
        </StyledReactBottomSheet>
    )
}

export default PlansPanel;