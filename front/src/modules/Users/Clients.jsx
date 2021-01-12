import React, { useEffect, useState } from 'react';
import React, { useState, useEffect } from 'react';
import { organizationService } from 'services/organizationServices';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import { useUserContext } from 'support/context/UserContext';
import GlobalTemplate from 'templates/GlobalTemplate';
import { useThemeContext } from 'support/context/ThemeContext';
import SmallButton from 'components/atoms/SmallButton';
import { translate } from 'utils/Translation';
import { useNotificationContext } from 'support/context/NotificationContext';
import Loader from 'components/atoms/Loader';
import ScrollContainer from 'components/atoms/ScrollContainer';
import Nav from 'components/atoms/Nav';
import Search from 'components/molecules/Search';
import Heading from 'components/atoms/Heading';
import { translate } from 'utils/Translation';
import SmallButton from 'components/atoms/SmallButton';
import Search from 'components/molecules/Search';
import { userService } from 'services/userServices';
import { ADD, useNotificationContext } from 'support/context/NotificationContext';
import { useUserContext } from 'support/context/UserContext';
import { commonUtil } from 'utils/common.util';
import ScrollContainer from 'components/atoms/ScrollContainer';
import Loader from 'components/atoms/Loader';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import styled from 'styled-components';
import Paragraph from 'components/atoms/Paragraph';
import { Role } from 'utils/role';

const SearchContainer = styled.div`
  margin-bottom: .8rem;
`;

const Container = styled.div`
  text-align: center;
`;

const StyledParagraph = styled(Paragraph)`
  color: ${(theme) => theme.colorSecondary};
  margin: 0;
`;

const Title = styled.h3`
  margin: 0;
  padding: 0;
`;

const Clients = () => {
  const { user } = useUserContext();
  const { notificationDispatch } = useNotificationContext();

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeUsers, setActiveUsers] = useState([]);
  const [assignPlan, setAssignPlan] = useState('none');

  const [bottomSheet, setBottomSheet] = useState('none');

  const [isLoading, setIsLoading] = useState(false);
  const [openInviteUserModal, setOpenInviteUserModal] = useState(false);

  const deleteUser = () => {
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
            type: 'error',
          },
        });
      });
  };

  const getAllUsersTrainer = () => {
    setIsLoading(true);
    userService
      .allClientsByTrainer(user.id)
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllUsersOwner = () => {
    setIsLoading(true);
    userService
      .allClients(user.id)
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (user.role === Role.Owner) {
      getAllUsersOwner();
    } else if (user.role === Role.Trainer) {
      getAllUsersTrainer();
    }
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

  const renderUsers = () => {
    if (users.length >= 1) {
      return (
        <>
          <SearchContainer>
            <Search placeholder={translate('Find')} callBack={filterUsers} />
          </SearchContainer>
          <ScrollContainer mobileHeight="17rem" desktopHeight="14rem">
            <CheckboxGenericComponent
              dataType="users"
              displayedValue="firstName"
              dataList={results}
              onSelect={submissionHandleElement}
            />
          </ScrollContainer>
        </>
      );
    }
    return (
      <Container>
        <Title>{translate('NoClients')}</Title>
        <StyledParagraph type="body-2-regular">{translate('NoAddClients')}</StyledParagraph>
      </Container>
    );
  };

  return (
    <GlobalTemplate>
      <Nav>
        <Heading>{translate('Clients')}</Heading>
        <SmallButton iconName="plus" />
      </Nav>
      {renderUsers()}
    </GlobalTemplate>

import styled from 'styled-components';
import { userService } from 'services/userServices';

const Container = styled.div`
  margin-bottom: .8rem;
`;

const Clients = () => {

  const { theme } = useThemeContext();
  const { user } = useUserContext();
  const { notificationDispatch } = useNotificationContext();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [users, setUsers] = useState([]);

  const getAllClients = () => {
    setIsLoading(true);
    organizationService
      .getOrganizationClients(user.organizationId)
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllClients();
  }, []);

  const filterUsers = (event) => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
    ? users
    : users.filter((User) => User.firstName.toLowerCase().includes(searchTerm.toLowerCase()));

return(
  <GlobalTemplate>
    <Nav>
      <Heading>{translate('Clients')}</Heading>
      <SmallButton iconName="plus" />
    </Nav>
    <Container>
          <Search placeholder={translate('Find')} callBack={filterUsers} />
        </Container>
        <ScrollContainer>
          <Loader isLoading={isLoading}>
            {users
              ? (
                <CheckboxGenericComponent
                  dataType="users"
                  displayedValue="firstName"
                  dataList={results}
                  // onSelect={submissionHandleElement}
                />
              )
              : <h1>{translate('NoUsers')}</h1>}
          </Loader>
        </ScrollContainer>
  </GlobalTemplate>
  );
};

export default Clients;
