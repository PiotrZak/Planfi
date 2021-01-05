import React, { useState, useEffect } from 'react';
import { userService } from 'services/userServices';
import styled from 'styled-components';
import { organizationService } from 'services/organizationServices';
import { commonUtil } from 'utils/common.util';
import Loader from 'components/atoms/Loader';
import { translate } from 'utils/Translation';
import Icon from 'components/atoms/Icon';
import { CheckboxGenericComponent } from "components/organisms/CheckboxGeneric"
import Button from "components/atoms/Button"
import { Headline } from 'components/typography';
import { StyledReactBottomSheetExtended, BottomNav, BottomNavItem } from 'components/organisms/BottomSheet'
import { useNotificationContext, ADD } from 'support/context/NotificationContext';

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

export const BottomNavTitle = styled.div`
    display:flex;
    align-items:center;
    margin:0.2rem 0 0 1.6rem;
`

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
  const { notificationDispatch } = useNotificationContext();

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
        notificationDispatch({
          type: ADD,
          payload: {
              content: { success: 'OK', message: translate('TrainersAssignedToUser') },
              type: 'positive'
          }
      })
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
          <IconWrapper>
            <Icon name="arrow-left" fill={theme.colorInputActive} />
          </IconWrapper><p onClick={() => closeAssignPlansToUser()}>{translate('CloseMenu')}</p>
        </BottomNavItem>
        <BottomNavItem>
        <IconWrapper>
          <Icon name="check" fill={theme.colorInputActive} />
        </IconWrapper>
          <p>{activeUsers.length} {translate('SelectedUsers')}</p>
        </BottomNavItem>
      </BottomNav>
      <BottomNavTitle><h4>{translate('SelectFromTrainers')}</h4></BottomNavTitle>
        <Loader isLoading={isLoading}>
        {trainers ?
          <CheckboxGenericComponent
            dataType="users"
            theme = "light"
            displayedValue="firstName"
            dataList={trainers}
            onSelect={getSelectedTrainerIds} />
          : <h1>{translate('NoUsers')}</h1>}
        </Loader>
        <Button disabled={activeTrainers.length === 0} type="submit" buttonType="primary" size="lg" buttonPlace="auth" onClick={assignUserToTrainer}>
          {activeTrainers.length === 0 ? translate('SelectTrainers') : translate('AssignTrainersToClients')}
        </Button>

    </StyledReactBottomSheetExtended>
  );
};
