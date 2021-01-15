import React, { useEffect, useState } from 'react';
import { organizationService } from 'services/organizationServices';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import { useUserContext } from 'support/context/UserContext';
import GlobalTemplate from 'templates/GlobalTemplate';
import { useThemeContext } from 'support/context/ThemeContext';
import SmallButton from 'components/atoms/SmallButton';
import { translate } from 'utils/Translation';
import { useNotificationContext } from 'support/context/NotificationContext';
import ScrollContainer from 'components/atoms/ScrollContainer';
import Nav from 'components/atoms/Nav';
import Search from 'components/molecules/Search';
import Heading from 'components/atoms/Heading';
import Loader from 'components/atoms/Loader';
import styled from 'styled-components';
import { userService } from 'services/userServices';
import { Role } from 'utils/role';

const Container = styled.div`
  text-align: center;
`;

const Clients = () => {

  const { theme } = useThemeContext();
  const { user } = useUserContext();
  const { notificationDispatch } = useNotificationContext();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [users, setUsers] = useState([]);

  const { role, userId, organizationId } = user;

  const getOrganizationClients = () => {
    setIsLoading(true);
    organizationService
      .getOrganizationClients(organizationId)
      .then((data) => {
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
    getClientsByTrainer();
    }
    if( role === Role.Owner){
      getOrganizationClients();
    }
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
