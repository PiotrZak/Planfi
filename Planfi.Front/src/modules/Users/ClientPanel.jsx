import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import { translate } from "utils/Translation";
import StyledReactBottomSheet, {
  PanelContainer,
  PanelItem,
} from "components/organisms/BottomSheet";
import { AssignUsersToPlans } from "./micromodules/AssignUsersToPlan";
import { useUserContext } from "support/context/UserContext";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

export const BottomNavTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 0.2rem 0 0 1.6rem;
`;

export const ClientPanel = ({
  theme,
  assignUserToMe,
  assignTrainer,
  setAssignTrainer,
activeUsers,
  assignUserToPlan,
  setAssignPlan,
  assignPlan,
  setBottomSheet,
}) => {
  const { user } = useUserContext();

  //bottom logic
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (activeUsers.length == 0) {
      setAssignTrainer("none");
    }
  }, [activeUsers]);

  const openAssignPlansToUsers = () => {
    setAssignPlan("flex");
    setAssignTrainer("none");
  };

  const ref = useRef(null);
  useOnClickOutside(ref, () => setAssignTrainer("none"));

  return (
    <div ref={ref}>
      <React.Fragment>
        <StyledReactBottomSheet
          showBlockLayer={false}
          visible={assignTrainer}
          className={""}
          onClose={() => setOpen(false)}
          appendCancelBtn={false}
        >
          {isMobile ? (
            <>
              <PanelItem onClick={() => assignUserToMe(activeUsers)}>
                {translate("AssignToMe")}
              </PanelItem>
              <PanelItem onClick={() => openAssignPlansToUsers()}>
                {translate("AssignPlanText")}
              </PanelItem>
            </>
          ) : (
            <>
              <PanelContainer>
                <PanelItem onClick={() => assignUserToMe(activeUsers)}>
                  {translate("AssignToMe")}
                </PanelItem>
                <PanelItem onClick={() => openAssignPlansToUsers()}>
                  {translate("AssignPlanText")}
                </PanelItem>
              </PanelContainer>
            </>
          )}
        </StyledReactBottomSheet>
        <AssignUsersToPlans
          assignUserToPlan={assignUserToPlan}
          theme={theme}
          organizationId={user.organizationId}
          assignPlan={assignPlan}
          setAssignPlan={setAssignPlan}
          activeUsers={activeUsers}
          setBottomSheet={setBottomSheet}
        />
      </React.Fragment>
    </div>
  );
};
