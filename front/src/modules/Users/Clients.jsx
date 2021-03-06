import React, { useEffect, useState, useCallback} from 'react';
import { organizationService } from 'services/organizationServices';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
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
import { useQuery, gql } from '@apollo/client';
import { Role } from 'utils/role';
import { commonUtil } from 'utils/common.util';
import InviteUserModal from './InviteUsersModal';
import SmallButton from 'components/atoms/SmallButton';

import { ClientPanel } from './ClientPanel';
import { UsersPanel } from './micromodules/UsersPanel';
import { AssignUsersToTrainers } from './micromodules/AssignUsersToTrainers';
import { AssignUsersToPlans } from './micromodules/AssignUsersToPlan';

const Container = styled.div`
  text-align: center;
`;

const Clients = () => {

  const { theme } = useThemeContext();
  const { notificationDispatch } = useNotificationContext();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [bottomSheet, setBottomSheet] = useState('none');
  const [openInviteUserModal, setOpenInviteUserModal] = useState(false);

  const [activeUsers, setActiveUsers] = useState([]);
  const [assignPlan, setAssignPlan] = useState('none');
  const [assignTrainer, setAssignTrainer] = useState('none');
  const user = JSON.parse((localStorage.getItem('user')));
  const [refresh, setRefresh] = useState(false)

  const Clients = gql`{
    users(where: {organizationId: "${user.organizationId}" role: "${Role.User}"})
    {
        userId
        avatar
        firstName
        lastName
        role
     }
    }
  `;

  const {
    loading, error, data, refetch: _refetch,
  } = useQuery(Clients);
  const refreshData = useCallback(() => { setTimeout(() => _refetch(), 200); }, [_refetch]);

  const assignUserToPlan = useCallback((activeUsers, activePlans) => {
    const data = { clientIds: activeUsers, planIds: [activePlans] };

    userService
        .assignPlanToUser(data)
        .then(() => {
            notificationDispatch({
                type: ADD,
                payload: {
                    content: { success: 'OK', message: translate('PlansAssignedToUser') },
                    type: 'positive'
                }
            })
            setRefresh(!refresh)
            setAssignPlan('none');
            setBottomSheet('none');
        })
        .catch((error) => {
            notificationDispatch({
                type: ADD,
                payload: {
                    content: { error: error, message: error.data.messages[0].text},
                    type: 'warning'
                }
            })
        });
}, []);

const deleteUser = useCallback(() => {
  userService
    .deleteUsers(activeUsers)
    .then(() => {
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
          type: 'warning'
        },
      });
    });
},[]);

const assignUserToMe =  useCallback((activeUsers, activeTrainers) => {

  const data = { userIds: activeUsers, trainerIds: [user.userId] };
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
      setRefresh(!refresh)
      setAssignTrainer('none')
      setBottomSheet('none');
    })
    .catch((error) => {
      notificationDispatch({
        type: ADD,
        payload: {
            content: { error: error, message: error.data.messages[0].text},
            type: 'warning'
        }
    })
    });
}, []);

const assignUserToTrainer =  useCallback((activeUsers, activeTrainers) => {

  const data = { userIds: activeUsers, trainerIds: [activeTrainers] };
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
      setRefresh(!refresh)
      setAssignTrainer('none')
      setBottomSheet('none');
    })
    .catch((error) => {
      notificationDispatch({
        type: ADD,
        payload: {
            content: { error: error, message: error.data.messages[0].text},
            type: 'warning'
        }
    })
    });
}, []);

useEffect(() => {
  refreshData();
}, [refreshData])

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

  let results;
  if(data){
  results = !searchTerm
    ? data.users
    : data.users.filter((user) => user.firstName.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  if (loading) return <Loader isLoading={loading} />;
  if (error) return <p>Error :(</p>;

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
          {results.length > 0
            ? (
              <CheckboxGenericComponent
                dataType="users"
                displayedValue="firstName"
                dataList={results}
                onSelect={submissionHandleElement}
                refresh={refresh}
              />
            )
            : <p>{translate('NoUsers')}</p>}
        </Loader>
      </GlobalTemplate>
      {user.role && user.role != Role.Owner ?
        <ClientPanel
        assignUserToMe={assignUserToMe}
        assignPlan={assignPlan}
        assignUserToTrainer={assignUserToTrainer}
        setAssignPlan={setAssignPlan}
        theme={theme}
        userId={user.userId}
        organizationId={user.organizationId}
        assignTrainer={assignTrainer}
        assignUserToPlan={assignUserToPlan}
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
            assignUserToPlan={assignUserToPlan}
            setAssignTrainer={setAssignTrainer}
          />
          <AssignUsersToPlans
            theme={theme}
            organizationId={user.organizationId}
            assignPlan={assignPlan}
            setAssignPlan={setAssignPlan}
            assignUserToPlan={assignUserToPlan}
            bottomSheet={bottomSheet}
            setBottomSheet={setBottomSheet}
            activeUsers={activeUsers}
          />
          <AssignUsersToTrainers
            theme={theme}
            organizationId={user.organizationId}
            assignTrainer={assignTrainer}
            assignUserToTrainer={assignUserToTrainer}
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
