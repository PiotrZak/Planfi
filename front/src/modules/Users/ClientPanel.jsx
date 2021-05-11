import React, {useEffect} from 'react';
import styled from 'styled-components';
import { isMobile } from "react-device-detect";
import { translate } from 'utils/Translation';
import StyledReactBottomSheet, { PanelContainer, PanelItem, } from 'components/organisms/BottomSheet'
import { AssignUsersToPlans } from './micromodules/AssignUsersToPlan';
import { useUserContext } from 'support/context/UserContext';

export const BottomNavTitle = styled.div`
    display:flex;
    align-items:center;
    margin:0.2rem 0 0 1.6rem;
`

export const ClientPanel = ({
  theme,
  assignUserToMe,
  assignTrainer,
  setAssignTrainer,
  activeUsers,
  assignUserToPlan,
  setBottomSheet,
  setAssignPlan,
  assignPlan,
}) => {

  const { user } = useUserContext();


  useEffect(() => {
    if (activeUsers == 0) {
      setAssignTrainer('none')
    }
}, [activeUsers]);

  const openAssignPlansToUsers = () => {
    setAssignPlan("flex");
    setAssignTrainer("none");
};

  return (
      <>
    <StyledReactBottomSheet
      showBlockLayer={false}
      visible={assignTrainer}
      className={""}
      onClose={() => setBottomSheet('none')}
      appendCancelBtn={false}
    >
            {isMobile ?
                <>
                      <PanelItem onClick={() => assignUserToMe(activeUsers)}>
                            {translate('AssignToMe')}
                        </PanelItem>
                        <PanelItem onClick={() => openAssignPlansToUsers()}>
                            {translate('AssignPlanText')}
                        </PanelItem>
                </>
                :
                <>
                    <PanelContainer>
                      <PanelItem onClick={() => assignUserToMe(activeUsers)}>
                            {translate('AssignToMe')}
                        </PanelItem>
                        <PanelItem onClick={() => openAssignPlansToUsers()}>
                            {translate('AssignPlanText')}
                        </PanelItem>
                    </PanelContainer>
                </>
            }
    </StyledReactBottomSheet>
            <AssignUsersToPlans
            assignUserToPlan={assignUserToPlan}
            theme={theme}
            organizationId={user.organizationId}
            assignPlan={assignPlan}
            setAssignPlan={setAssignPlan}
            activeUsers={activeUsers}
            setBottomSheet ={setBottomSheet}            
          />
          </>
  );
};
