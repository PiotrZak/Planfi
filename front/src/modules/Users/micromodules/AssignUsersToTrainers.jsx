import React, { useState, useEffect } from 'react';
import { userService } from 'services/userServices';
import styled from 'styled-components';
import { organizationService } from 'services/organizationServices';
import { commonUtil } from 'utils/common.util';
import { Loader } from 'components/atoms/Loader';
import { translate } from 'utils/Translation';
import Icon from 'components/atoms/Icon';
import { CheckboxGenericComponent } from "components/organisms/CheckboxGeneric"
import Button from "components/atoms/Button"
import { Headline } from 'components/typography';
import { StyledReactBottomSheetExtended, BottomNav, BottomNavItem } from 'components/organisms/BottomSheet'

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

  const assignUserToTrainer = () => {
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
          <Headline>{activeUsers.length}{translate('Selected')}</Headline>
        </BottomNavItem>
        <IconWrapper>
          <Icon name="check" fill={theme.colorInputActive} />
        </IconWrapper>
        <BottomNavItem>
          <IconWrapper>
            <Icon name="arrow-left" fill={theme.colorInputActive} />
          </IconWrapper>
          <p onClick={() => closeAssignPlansToUser()}>
          {translate('ReturnToSubMenuPlansClients')}
          </p>
        </BottomNavItem>
      </BottomNav>
      <div>
        <h4>
        {translate('SelectFromPlans')}
        </h4>
        {/* <Loader isLoading={isLoading}> */}
        {trainers ?
          <CheckboxGenericComponent
            dataType="users"
            theme = "light"
            displayedValue="firstName"
            dataList={trainers}
            onSelect={getSelectedTrainerIds} />
          : <h1>{translate('NoUsers')}</h1>}
        {/* </Loader> */}
        <Button disabled={activeTrainers.length === 0} type="submit" buttonType="primary" size="lg" buttonPlace="auth" onClick={assignUserToTrainer}>
          {activeTrainers.length === 0 ? translate('SelectTrainers') : translate('AssignTrainersToClients')}
        </Button>
      </div>

    </StyledReactBottomSheetExtended>
  );
};
