import React, { useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import Icon from 'components/atoms/Icon';
import { CheckboxGenericComponent } from "components/organisms/CheckboxGeneric"
import { translate } from 'utils/Translation';
import Loader from 'components/atoms/Loader';
import { StyledReactBottomSheetExtended, BottomNav, BottomNavItem } from 'components/organisms/BottomSheet'
import Search from 'components/molecules/Search';
import { useUserContext } from 'support/context/UserContext';
import { useQuery, gql } from '@apollo/client';

const SearchLightContainer = styled.div`
      margin: 1.6rem 1.6rem 0 1.6rem;
`;

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
    assignUserToPlan,
    setBottomSheet,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const user = JSON.parse((localStorage.getItem('user')));

    const PLANS = gql`{
        plans(where: {organizationId: "${user.organizationId}"})
        {
          creatorId
          creatorName
          planId
          title
         }
        }
      `;

      const {
        loading, error, data, refetch: _refetch,
      } = useQuery(PLANS);
      const refreshData = useCallback(() => { setTimeout(() => _refetch(), 200); }, [_refetch]);

    useEffect(() => {
        refreshData();
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

    let results;
    if(data){
    results = !searchTerm
      ? data.plans
      : data.plans.filter((plan) => plan.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
    }

    const getSelectedPlanId = (plan) => {
        assignUserToPlan(activeUsers, plan.planId)
    }

    if (loading) return <Loader isLoading={loading} />;
    if (error) return <p>Error :(</p>;

    return (
        <StyledReactBottomSheetExtended
            showBlockLayer={false}
            visible={assignPlan}
            className={""}
            onClose={() => setBottomSheet('none')}
            appendCancelBtn={false}
        >
            <BottomNav>
                <BottomNavItem>
                <h4>{translate('SelectFromPlans')}</h4>
                    <IconWrapper onClick={() => closeAssignPlansToUser()}>
                    <Icon name="union" fill={theme.colorGray70} />
                    </IconWrapper>
                </BottomNavItem>
            </BottomNav>
            <SearchLightContainer>
            <Search typeInput="light" callBack={filterPlans} placeholder={translate('PlanSearch')} />
            </SearchLightContainer>
                {data.plans.length > 1 ?
                    <CheckboxGenericComponent
                        dataType="plans"
                        theme="light"
                        displayedValue="title"
                        dataList={results}
                        onClick = {getSelectedPlanId}
                        interaction={false}
                        />
                    : <p>{translate('NoPlans')}</p>}
            <ModalButtonContainer>
            </ModalButtonContainer>
        </StyledReactBottomSheetExtended>
    );
};