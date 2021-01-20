import React, { useEffect, useState } from 'react';
import { organizationService } from 'services/organizationServices';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import { useUserContext } from 'support/context/UserContext';
import GlobalTemplate from 'templates/GlobalTemplate';
import { useThemeContext } from 'support/context/ThemeContext';
import { translate } from 'utils/Translation';
import { useNotificationContext } from 'support/context/NotificationContext';
import Nav from 'components/atoms/Nav';
import Search from 'components/molecules/Search';
import Heading from 'components/atoms/Heading';
import Loader from 'components/atoms/Loader';
import styled from 'styled-components';
import { userService } from 'services/userServices';
import { Role } from 'utils/role';
import { commonUtil } from 'utils/common.util';


import { AssignUsersToTrainer } from './AssignUsersToTrainer';
import { AssignUsersToTrainers } from './micromodules/AssignUsersToTrainers';
import { AssignUsersToPlans } from './micromodules/AssignUsersToPlan';

const Container = styled.div`
  text-align: center;
`;

const Clients = () => {

  const { theme } = useThemeContext();
  const { user } = useUserContext();
  const { notificationDispatch } = useNotificationContext();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [bottomSheet, setBottomSheet] = useState('none');


  const [activeUsers, setActiveUsers] = useState([]);
  const [assignTrainer, setAssignTrainer] = useState('none');

  const [users, setUsers] = useState([]);

  const { role, userId, organizationId } = user;

  const getOrganizationClients = () => {
    setIsLoading(true);
    organizationService
      .getOrganizationClients(organizationId)
      .then((data) => {
        console.log(data)
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getClientsByTrainer = () => {
    userService.allClientsByTrainer(userId)
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    if (role === Role.Trainer) {
      // getClientsByTrainer();
      getOrganizationClients();
    }
    if (role === Role.Owner) {
      getOrganizationClients();
    }
  }, []);

  const submissionHandleElement = (selectedData) => {
    const selectedUsers = commonUtil.getCheckedData(selectedData, 'userId');
    setActiveUsers(selectedUsers);
    if (selectedUsers.length > 0) {
      setAssignTrainer('flex');
    } else {
      setAssignTrainer('none');
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
        </Nav>
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
      {user.role != "Owner" ?
        <AssignUsersToTrainer
          theme={theme}
          userId={userId}
          organizationId={user.organizationId}
          assignTrainer={assignTrainer}
          setAssignTrainer={setAssignTrainer}
          bottomSheet={bottomSheet}
          setBottomSheet={setBottomSheet}
          activeUsers={activeUsers}
        />
        :
        <>
        <AssignUsersToTrainers
          theme={theme}
          userId={userId}
          organizationId={user.organizationId}
          assignTrainer={assignTrainer}
          setAssignTrainer={setAssignTrainer}
          bottomSheet={bottomSheet}
          setBottomSheet={setBottomSheet}
          activeUsers={activeUsers}
        />
      </>
      }
    </>
  );
};

export default Clients;
