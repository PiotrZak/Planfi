import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userService } from 'services/userServices';
import styled from 'styled-components';
import { organizationService } from 'services/organizationServices';
import { commonUtil } from 'utils/common.util';
import { Loader } from 'components/atoms/Loader';
import Icon from 'components/atoms/Icon';
import { CheckboxGenericComponent } from "components/organisms/CheckboxGeneric"
import Button from "components/atoms/Button"
import { Headline, MainHeadline } from 'components/typography';
import StyledReactBottomSheet, { StyledReactBottomSheetExtended, BottomNav, BottomNavItem, BottomItem } from 'components/organisms/BottomSheet'

const assignPlanToUserNotification = "Users assigned to Trainer!"
const selectFromPlans = "Select From Plans"
const noUsers = "No Users"
const returnToSubMenu = "return to sub menu"

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

export const AssignUsersToTrainers = ({
  theme,
  organizationId,
  assignTrainer,
  setAssignTrainer,
  activeUsers,
  setBottomSheet,
}) => {

  const [trainers, setTrainers] = useState();
  const [activeTrainers, setActiveTrainers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllTrainers();
    if (activeUsers == 0) {
      setAssignTrainer('none')
    }
  }, [activeUsers]);

  const closeAssignPlansToUser = () => {
    setBottomSheet('flex');
    setAssignTrainer('none');
  };

  const getAllTrainers = () => {
    organizationService
      .getOrganizationTrainers(organizationId)
      .then((data) => {
        setTrainers(data);
        setIsLoading(false);
      })
      .catch(() => {
      });
  };

  const getSelectedTrainerIds = (selectedData) => {
    const selectedTrainers = commonUtil.getCheckedData(selectedData, 'userId');
    setActiveTrainers(selectedTrainers);
  };

  const assignUserToPlan = () => {
    const data = { userIds: activeUsers, trainerIds: activeTrainers };
    userService
      .assignUsersToTrainer(data)
      .then(() => {
        setAssignTrainer('none')
        setBottomSheet('none');
      })
      .catch((error) => {
      });
  };

  return (
    <StyledReactBottomSheetExtended
      showBlockLayer={false}
      visible={assignTrainer}
      className={""}
      onClose={() => setBottomSheet('none')}
      appendCancelBtn={false}
    >
      <BottomNav>
        <BottomNavItem>
          <Headline>{activeUsers.length}selected</Headline>
        </BottomNavItem>
        <IconWrapper>
          <Icon name="check" fill={theme.colorInputActive} />
        </IconWrapper>
        <BottomNavItem>
          <IconWrapper>
            <Icon name="arrow-left" fill={theme.colorInputActive} />
          </IconWrapper>
          <p onClick={() => closeAssignPlansToUser()}>
            {returnToSubMenu}
          </p>
        </BottomNavItem>
      </BottomNav>
      <div>
        <h4>{selectFromPlans}</h4>
        {/* <Loader isLoading={isLoading}> */}
        {trainers ?
          <CheckboxGenericComponent
            dataType="users"
            displayedValue="firstName"
            dataList={trainers}
            onSelect={getSelectedTrainerIds} />
          : <h1>{noUsers}</h1>}
        {/* </Loader> */}
        <Button disabled={activeTrainers.length === 0} className="btn btn--primary btn--lg" onClick={assignUserToPlan} name={activeTrainers.length === 0 ? "Select Plan" : "Assign Trainers to Users"} />
      </div>

    </StyledReactBottomSheetExtended>
  );
};
