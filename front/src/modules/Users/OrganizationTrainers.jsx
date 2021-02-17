import React, { useEffect, useState, useCallback} from 'react';
import { commonUtil } from 'utils/common.util';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import GlobalTemplate from 'templates/GlobalTemplate';
import { useThemeContext } from 'support/context/ThemeContext';
import { translate } from 'utils/Translation';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import Loader from 'components/atoms/Loader';
import ScrollContainer from 'components/atoms/ScrollContainer';
import Nav from 'components/atoms/Nav';
import Search from 'components/molecules/Search';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading';
import { useQuery, gql } from '@apollo/client';
import SmallButton from 'components/atoms/SmallButton';
import InviteUserModal from './InviteUsersModal';
import { Role } from 'utils/role';

const Container = styled.div`
  margin-bottom: .8rem;
`;

const OrganizationTrainers = () => {
  const { theme } = useThemeContext();
  const { notificationDispatch } = useNotificationContext();
  const [openInviteUserModal, setOpenInviteUserModal] = useState(false);

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeUsers, setActiveUsers] = useState([]);

  const [bottomSheet, setBottomSheet] = useState('none');
  const [assignPlan, setAssignPlan] = useState('none');
  const [assignTrainer, setAssignTrainer] = useState('none');

  const [isLoading, setIsLoading] = useState(false);

  const user = JSON.parse((localStorage.getItem('user')));

  const Trainers = gql`{
    users(where: {organizationId: "${user.organizationId}" role: "${Role.Trainer}"})
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
  } = useQuery(Trainers);
  const refreshData = useCallback(() => { setTimeout(() => _refetch(), 200); }, [_refetch]);

  useEffect(() => {
    refreshData();
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

  let results;
  if(data){
  results = !searchTerm
    ? data.users
    : data.users.filter((user) => {
      const userName = `${user.firstName} ${user.lastName}`;
      return userName.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  if (loading) return <Loader isLoading={loading} />;
  if (error) return <p>Error :(</p>;


  return (
      <GlobalTemplate>
        <Nav>
          <Heading>{translate('Trainers')}</Heading>
          <SmallButton iconName="plus" onClick={() => setOpenInviteUserModal(true)} />
        </Nav>
        <InviteUserModal role = {Role.Trainer}  openModal={openInviteUserModal} onClose={() => setOpenInviteUserModal(false)} />
        <Container>
          <Search placeholder={translate('Find')} callBack={filterUsers} />
        </Container>
        <ScrollContainer mobileHeight="17rem" desktopHeight="14rem">
          <Loader isLoading={isLoading}>
            {results.length > 0
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
  );
};

export default OrganizationTrainers;
