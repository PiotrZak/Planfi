import React, { useState, useEffect } from 'react';
import { commonUtil } from 'utils/common.util';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import { useUserContext } from 'support/context/UserContext';
import { userService } from 'services/userServices';
import GlobalTemplate from 'templates/GlobalTemplate';
import { useThemeContext } from 'support/context/ThemeContext';
import SmallButton from 'components/atoms/SmallButton';
import { translate } from 'utils/Translation';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import Loader from 'components/atoms/Loader';
import ScrollContainer from 'components/atoms/ScrollContainer';
import Nav from 'components/atoms/Nav';
import Search from 'components/molecules/Search';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading';
import { organizationService } from 'services/organizationServices';
import { AssignUsersToTrainers } from './micromodules/AssignUsersToTrainers';
import { AssignUsersToPlans } from './micromodules/AssignUsersToPlan';
import { UsersPanel } from './micromodules/UsersPanel';
import InviteUserModal from './InviteUsersModal';

const Container = styled.div`
  margin-bottom: .8rem;
`;

const OrganizationTrainers = () => {
  const { theme } = useThemeContext();
  const { user } = useUserContext();
  const { notificationDispatch } = useNotificationContext();

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeUsers, setActiveUsers] = useState([]);

  const [bottomSheet, setBottomSheet] = useState('none');
  const [assignPlan, setAssignPlan] = useState('none');
  const [assignTrainer, setAssignTrainer] = useState('none');

  const [isLoading, setIsLoading] = useState(false);
  const [openInviteUserModal, setOpenInviteUserModal] = useState(false);

  const deleteUser = () => {
    userService
      .deleteUsers(activeUsers)
      .then((data) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: 'OK', message: translate('UserDeleted') },
            type: 'positive',
          },
        });
      })
      .catch((error) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { error, message: translate('ErrorAlert') },
            type: 'error',
          },
        });
      });
  };

  const getAllUsers = () => {
    setIsLoading(true);
    organizationService
      .getOrganizationTrainers(user.organizationId)
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const submissionHandleElement = (selectedData) => {
    const selectedUsers = commonUtil.getCheckedData(selectedData, 'userId');
    setActiveUsers(selectedUsers);
    if (selectedUsers.length > 0) {
      setBottomSheet('flex');
    } else {
      setBottomSheet('none');
      setAssignPlan('none');
    }
  };

  const filterUsers = (event) => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
    ? users
    : users.filter((User) => {
      const userName = `${User.firstName} ${User.lastName}`;

      return userName.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <>
      <GlobalTemplate>
        <Nav>
          <Heading>{translate('Trainers')}</Heading>
          <SmallButton iconName="plus" onClick={() => setOpenInviteUserModal(true)} />
        </Nav>
        <InviteUserModal openModal={openInviteUserModal} onClose={() => setOpenInviteUserModal(false)} />
        <Container>
          <Search placeholder={translate('Find')} callBack={filterUsers} />
        </Container>
        <ScrollContainer mobileHeight="17rem" desktopHeight="14rem">
          <Loader isLoading={isLoading}>
            {users
              ? (
                <CheckboxGenericComponent
                  dataType="users"
                  displayedValue="firstName"
                  dataList={results}
                  onSelect={submissionHandleElement}
                />
              )
              : <h1>{translate('NoUsers')}</h1>}
          </Loader>
        </ScrollContainer>
      </GlobalTemplate>
      <UsersPanel
        deleteUser={deleteUser}
        theme={theme}
        bottomSheet={bottomSheet}
        setBottomSheet={setBottomSheet}
        activeUsers={activeUsers}
        setAssignPlan={setAssignPlan}
        setAssignTrainer={setAssignTrainer}
      />
      <AssignUsersToPlans
        theme={theme}
        organizationId={user.organizationId}
        assignPlan={assignPlan}
        setAssignPlan={setAssignPlan}
        bottomSheet={bottomSheet}
        setBottomSheet={setBottomSheet}
        activeUsers={activeUsers}
      />
      <AssignUsersToTrainers
        theme={theme}
        organizationId={user.organizationId}
        assignTrainer={assignTrainer}
        setAssignTrainer={setAssignTrainer}
        bottomSheet={bottomSheet}
        setBottomSheet={setBottomSheet}
        activeUsers={activeUsers}
      />
    </>
  );
};

export default OrganizationTrainers;
