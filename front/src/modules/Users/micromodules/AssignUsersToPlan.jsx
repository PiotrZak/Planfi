import React, { useState, useEffect } from 'react';
import { userService } from 'services/userServices';
import { planService } from 'services/planService';
import styled from 'styled-components';
import { commonUtil } from 'utils/common.util';
import Icon from 'components/atoms/Icon';
import { CheckboxGenericComponent } from "components/organisms/CheckboxGeneric"
import Button from "components/atoms/Button"
import { translate } from 'utils/Translation';
import Loader from 'components/atoms/Loader';
import { StyledReactBottomSheetExtended, BottomNav, BottomNavItem } from 'components/organisms/BottomSheet'
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import Search from 'components/molecules/Search';
import { useUserContext } from 'support/context/UserContext';

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

const ModalButtonContainer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
`;

export const BottomNavTitle = styled.div`
    display:flex;
    align-items:center;
    margin:0.2rem 0 0 1.6rem;
`

export const AssignUsersToPlans = ({
    theme,
    assignPlan,
    setAssignPlan,
    activeUsers,
    setBottomSheet,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [plans, setPlans] = useState();
    const [activePlans, setActivePlans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useUserContext();

    const { notificationDispatch } = useNotificationContext();

    useEffect(() => {
        getPlans(user.organizationId);
        if (activeUsers == 0) {
            setAssignPlan('none')
        }
    }, [activeUsers]);

    const closeAssignPlansToUser = () => {
        setBottomSheet('flex');
        setAssignPlan('none');
    };

    const filterPlans = (event) => {
        setSearchTerm(event.target.value);
    };

    const plansResults = !searchTerm
        ? plans
        : plans.filter((plan) => plan.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()));

        const getPlans = (id) => {
            planService
              .getOrganizationPlans(id)
              .then((data) => {
                setPlans(data);
                setIsLoading(false)
              })
              .catch((error) => {
                console.error(error);
              });
          };

    const getSelectedPlanIds = (selectedData) => {
        const selectedPlans = commonUtil.getCheckedData(selectedData, 'planId');
        setActivePlans(selectedPlans);
    };

    const assignUserToPlan = () => {
        const data = { clientIds: activeUsers, planIds: activePlans };

        userService
            .assignPlanToUser(data)
            .then(() => {
                notificationDispatch({
                    type: ADD,
                    payload: {
                        content: { success: 'OK', message: translate('PlansAssignedToUser') },
                        type: 'positive'
                    }
                })
                setAssignPlan('none');
                setBottomSheet('none');
            })
            .catch((error) => {
                console.log(error)
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
        <StyledReactBottomSheetExtended
            showBlockLayer={false}
            visible={assignPlan}
            className={""}
            onClose={() => setBottomSheet(false)}
            appendCancelBtn={false}
        >
            <BottomNav>
                <BottomNavItem>
                    <IconWrapper>
                        <Icon name="arrow-left" fill={theme.colorInputActive} />
                    </IconWrapper>
                    <p onClick={() => closeAssignPlansToUser()}>{translate('CloseMenu')}</p>
                </BottomNavItem>
                <BottomNavItem>
                    <IconWrapper>
                        <Icon name="check" fill={theme.colorInputActive} />
                    </IconWrapper>
                    <p>{activeUsers.length} {translate('SelectedUsers')}</p>
                </BottomNavItem>
            </BottomNav>
            <BottomNavTitle><h4>{translate('SelectFromPlans')}</h4></BottomNavTitle>
            <Search typeInput="light" callBack={filterPlans} placeholder={translate('PlanSearch')} />
            <Loader isLoading={isLoading}>
                {plans ?
                    <CheckboxGenericComponent
                        dataType="plans"
                        theme="light"
                        displayedValue="title"
                        dataList={plansResults}
                        onSelect={getSelectedPlanIds} />
                    : <p>{translate('NoPlans')}</p>}
            </Loader>
            <ModalButtonContainer>
                <Button disabled={activePlans.length === 0} type="submit" buttonType="primary" size="lg" buttonPlace="auth" onClick={assignUserToPlan}>
                    {activePlans.length === 0 ? translate('SelectPlan') : translate('AssignPlanToUsers')}
                </Button>
            </ModalButtonContainer>
        </StyledReactBottomSheetExtended>
    );
};