import React, {
  useState, useEffect,
} from 'react';
import { UserInfo } from 'components/molecules/UserInfo/UserInfo';
import { userService } from 'services/userServices';
import BackTopNav from 'components/molecules/BackTopNav';
import MyProfileTemplate from 'templates/MyProfileTemplate';
import { translate } from 'utils/Translation';
import UserInfoBackground from 'components/molecules/UserInfoBackground';
import { Role } from 'utils/role';
import styled, { css } from 'styled-components';
import breakPointSize from 'utils/rwd';
import Nav from 'components/atoms/Nav';
import Loader from 'components/atoms/Loader';
import { trainerTabs, clientTabs } from '../Users/ProfileTabs'

const Container = styled.div`
  margin: auto;
  width: 74%;

  @media screen and ${breakPointSize.xs} {
    width: 100%;

    ${({ type }) => type === 'entry' && css`
      width: calc(100% - 3.2rem);
      margin: 0 1.6rem;
    `
  }
  }
`;

const ContainerCentred = styled.div`
  margin-top: 4.8rem;
  margin-bottom: 1.2rem;
`;

export const User = (props) => {

  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const [toRender, setToRender] = useState(null);
  const userId = props.location.state.id
  const currentUser = JSON.parse((localStorage.getItem('user')));

  useEffect(() => {
    getUserById(userId);
  }, []);

  const getUserById = () => {
    userService
      .getUserById(userId)
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
      });
  };

  const selectRole = () => {
    return user && user.role.name === Role.User ? clientTabs : trainerTabs;
  }

  const [active, setActive] = useState(0);

  return (
    <>
      <MyProfileTemplate>
        <UserInfoBackground>
          <Loader isLoading={isLoading} >
            <Container>
              <Nav>
                <BackTopNav text={user && user.firstName} />
              </Nav>
              <ContainerCentred>
                {user && <UserInfo user={user} />}
              </ContainerCentred>
              <div className="tabs">
                {/* {selectRole().map(({ id, icon, title }) => <TabItemComponent
                  key={title}
                  icon={icon}
                  title={title}
                  onItemClicked={() => setActive(id)}
                  isActive={active === id}
                />
                )} */}
              </div>
              <div className="content">
                {trainerTabs.map(({ id, content }) => {
                  return active === id ? content : ''
                })}
              </div>
            </Container>
          </Loader>
        </UserInfoBackground>
        <Container type="entry">
          {toRender}
        </Container>
      </MyProfileTemplate>
    </>
  );
};

export default User;
