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
import { StyledReactBottomSheetExtended, BottomNav, BottomNavItem } from 'components/organisms/BottomSheet'
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import Search from 'components/molecules/Search';

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

const SearchLightContainer = styled.div`
      margin: 1.6rem 1.6rem 0 1.6rem;
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

export const AssignUsersToTrainers = ({
  theme,
  organizationId,
  assignTrainer,
  setAssignTrainer,
  activeUsers,
  setBottomSheet,
}) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [trainers, setTrainers] = useState();
  const [activeTrainers, setActiveTrainers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { notificationDispatch } = useNotificationContext();

  useEffect(() => {
    getAllTrainers();
    if (activeUsers === 0) {
      setAssignTrainer('none')
    }
  }, [activeUsers]);

  const closeAssignPlansToUser = () => {
    setBottomSheet('flex');
    setAssignTrainer('none');
  };

  const filterTrainers = (event) => {
    setSearchTerm(event.target.value);
  };

  const trainersResult = !searchTerm
    ? trainers
    : trainers.filter((plan) => plan.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()));


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
          <IconWrapper onClick={() => closeAssignPlansToUser()}>
            <Icon name="union" fill={theme.colorGray70} />
          </IconWrapper>
        </BottomNavItem>
        <BottomNavItem>
        </BottomNavItem>
      </BottomNav>
      <BottomNavTitle><h4>{translate('SelectFromTrainers')}</h4></BottomNavTitle>
      <SearchLightContainer>
        <IconWrapper>
        </IconWrapper>
        <Search typeInput="light" callBack={filterTrainers} placeholder={translate('PlanSearch')} />
      </SearchLightContainer>
      <Loader isLoading={isLoading}>
        {trainersResult ?
          <CheckboxGenericComponent
            dataType="users"
            theme="light"
            displayedValue="firstName"
            dataList={trainers}
            onSelect={getSelectedTrainerIds} />
          : <h1>{translate('NoUsers')}</h1>}
      </Loader>
      <ModalButtonContainer>
        <Button disabled={activeTrainers.length === 0} type="submit" buttonType="primary" size="lg" buttonPlace="auth" onClick={assignUserToTrainer}>
          {activeTrainers.length === 0 ? translate('SelectTrainers') : translate('AssignTrainersToClients')}
        </Button>
      </ModalButtonContainer>
    </StyledReactBottomSheetExtended>
  );
};
