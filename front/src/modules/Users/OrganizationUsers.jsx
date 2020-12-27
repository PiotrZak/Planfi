import React, { useState, useEffect } from 'react';
import { organizationService } from 'services/organizationServices';
import { commonUtil } from 'utils/common.util';
import styled from 'styled-components';
import { CheckboxGenericComponent } from "components/organisms/CheckboxGeneric"
import { useUserContext } from "../../support/context/UserContext"
import InviteUserModal from './InviteUsersModal';
import { userService } from 'services/userServices';
import GlobalTemplate, { Nav } from "templates/GlobalTemplate"
import { useThemeContext } from 'support/context/ThemeContext';
import { UsersPanel } from "./micromodules/UsersPanel"
import { AssignUsersToPlans } from "./micromodules/AssignUsersToPlan"
import { AssignUsersToTrainers } from "./micromodules/AssignUsersToTrainers"
import SmallButton from 'components/atoms/SmallButton';
import handleTextType from 'support/TextType';
import { translate } from 'utils/Translation';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import Loader from 'components/atoms/Loader';

const UsersFilters = styled.div`
   display:flex;
`;

const Paragraph = styled.p`
  ${() => handleTextType('Label-Button')};
  margin: 0 1.8rem 0 0;
`;

const OrganizationUsers = () => {

  const { theme } = useThemeContext();
  const { user } = useUserContext();
  const { notificationDispatch } = useNotificationContext();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
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

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    setIsLoading(true)
    organizationService
      .getOrganizationUsers(user.organizationId)
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data)
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const submissionHandleElement = (selectedData) => {
    const selectedUsers = commonUtil.getCheckedData(selectedData, 'userId');
    setActiveUsers(selectedUsers);
    if (selectedUsers.length > 0) {
      setBottomSheet('flex');
    } else {
      setBottomSheet('none');
      setAssignPlan(false);
    }
  };


  const filterUsers = (role) => {
    if (role == "All") {
      setFilteredUsers(users)
    }
    else {
      const filteredUsers = users.filter(x => x.role == role)
      setFilteredUsers(filteredUsers)
    }
  }

  return (
    <>
      <GlobalTemplate>
      <Nav>
        <h2>{user.firstName} of - {user.organizationId}</h2>
        <SmallButton iconName="plus" onClick={() => setOpenInviteUserModal(true)} />
        </Nav>
        <UsersFilters>
        <Paragraph onClick={() => filterUsers("User")}>{translate('Clients')}</Paragraph>
        <Paragraph onClick={() => filterUsers("Trainer")}>{translate('Trainers')}</Paragraph>
        <Paragraph onClick={() => filterUsers("All")}>{translate('All')}</Paragraph>
          </UsersFilters>
        <InviteUserModal openModal={openInviteUserModal} onClose={() => setOpenInviteUserModal(false)} />
        <Loader isLoading={isLoading}>
        {filteredUsers ?
          <CheckboxGenericComponent
            dataType="users"
            displayedValue="firstName"
            dataList={filteredUsers}
            onSelect={submissionHandleElement}
          /> :
          <h1>{translate('NoUsers')}</h1>
        }
        </Loader>
      </GlobalTemplate>
      <UsersPanel
        deleteUser={deleteUser}
        theme={theme}
        bottomSheet={bottomSheet}
        setBottomSheet={setBottomSheet}
        activeUsers={activeUsers}
        setAssignPlan={setAssignPlan}
        setAssignTrainer={setAssignTrainer} />
      <AssignUsersToPlans
        organizationId={user.organizationId}
        assignPlan={assignPlan}
        setAssignPlan={setAssignPlan}
        bottomSheet={bottomSheet}
        setBottomSheet={setBottomSheet}
        activeUsers={activeUsers} />
      <AssignUsersToTrainers
        theme={theme}
        organizationId={user.organizationId}
        assignTrainer={assignTrainer}
        setAssignTrainer={setAssignTrainer}
        bottomSheet={bottomSheet}
        setBottomSheet={setBottomSheet}
        activeUsers={activeUsers} />
    </>
  );
};




export default OrganizationUsers;