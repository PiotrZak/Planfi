import React, { useEffect, useState } from 'react';
import { organizationService } from 'services/organizationServices';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import { useUserContext } from 'support/context/UserContext';
import GlobalTemplate from 'templates/GlobalTemplate';
import { useThemeContext } from 'support/context/ThemeContext';
import { translate } from 'utils/Translation';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import Nav from 'components/atoms/Nav';
import Search from 'components/molecules/Search';
import Heading from 'components/atoms/Heading';
import Loader from 'components/atoms/Loader';
import styled from 'styled-components';
import { userService } from 'services/userServices';
import { Role } from 'utils/role';
import { commonUtil } from 'utils/common.util';
import InviteUserModal from './InviteUsersModal';
import SmallButton from 'components/atoms/SmallButton';

import { ClientPanel } from './ClientPanel';
import { ClientOwnerPanel } from './ClientOwnerPanel';

import { UsersPanel } from './micromodules/UsersPanel';
import { AssignUsersToTrainers } from './micromodules/AssignUsersToTrainers';
import { AssignUsersToPlans } from './micromodules/AssignUsersToPlan';

const Container = styled.div`
  text-align: center;
`;

const Clients = () => {

  const { theme } = useThemeContext();
  const { userContext } = useUserContext();
  const { notificationDispatch } = useNotificationContext();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [bottomSheet, setBottomSheet] = useState('none');
  const [openInviteUserModal, setOpenInviteUserModal] = useState(false);

  const [activeUsers, setActiveUsers] = useState([]);
  const [assignPlan, setAssignPlan] = useState('none');
  const [assignTrainer, setAssignTrainer] = useState('none');

  const [users, setUsers] = useState([]);

  const user = JSON.parse((localStorage.getItem('user')));

  const getOrganizationClients = () => {
    setIsLoading(true);
    organizationService
      .getOrganizationClients(user.organizationId)
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getOrganizationClients();
  }, []);

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

  const submissionHandleElement = (selectedData) => {
    const selectedUsers = commonUtil.getCheckedData(selectedData, 'userId');
    setActiveUsers(selectedUsers);
    if (selectedUsers.length > 0) {
      if (user.role == "Owner") {
        setBottomSheet('flex');
      }
      else {
        setAssignTrainer('flex');
      }
    } else {
      if (user.role == "Owner") {
        setBottomSheet('none');
      }
      else {
        setAssignTrainer('none');
      }
    }
  };

  const filterUsers = (event) => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
    ? users
    : users.filter((User) => User.firstName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <GlobalTemplate>
        <Nav>
          <Heading>{translate('Clients')}</Heading>
          <SmallButton iconName="plus" onClick={() => setOpenInviteUserModal(true)} />
        </Nav>
        <InviteUserModal role={Role.User} openModal={openInviteUserModal} onClose={() => setOpenInviteUserModal(false)} />
        <Container>
          <Search placeholder={translate('Find')} callBack={filterUsers} />
        </Container>
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
      </GlobalTemplate>
      {user.role &&
      user.role != "Owner" ?
        <ClientPanel
        theme={theme}
        userId={user.userId}
        organizationId={user.organizationId}
        assignTrainer={assignTrainer}
        setAssignTrainer={setAssignTrainer}
        bottomSheet={bottomSheet}
        setBottomSheet={setBottomSheet}
        activeUsers={activeUsers}
      />
        :
        <>
        <>
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
        </>
        
      }
    </>
  );
};

export default Clients;
