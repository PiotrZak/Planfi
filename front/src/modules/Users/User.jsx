import React, {
  useState, useEffect,
} from 'react';
import { UserInfo } from 'components/molecules/UserInfo/UserInfo';
import { userService } from 'services/userServices';
import BackTopNav from 'components/molecules/BackTopNav';
import { TrainerClients } from 'modules/Users/UserProfile/TrainerClients';
import { UserPlans } from 'modules/Users/UserProfile/UserPlans';
import MyProfileTemplate from 'templates/MyProfileTemplate';
import { translate } from 'utils/Translation';
import UserInfoBackground from 'components/molecules/UserInfoBackground';
import SwitchedButton from 'components/molecules/SwitchedButton';
import { Role } from 'utils/role';
import { ClientTrainers } from 'modules/Users/UserProfile/ClientTrainers';
import { TrainerPlans } from 'modules/Users/UserProfile/TrainerPlans';
import styled, { css } from 'styled-components';
import breakPointSize from 'utils/rwd';
import Nav from 'components/atoms/Nav';

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

const IconContainer = styled.div`
  margin-left: 1.8rem;
`;

export const User = (props) => {

  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const [activeItem, setActiveItem] = useState('TrainerClients');
  const [toRender, setToRender] = useState(null);
  const [bottomSheet, setBottomSheet] = useState('none');
  const [updatedUser, setUpdatedUser] = useState(user);

  const userId = props.location.state.id

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

  const renderGenericElement = (tab) => {
    const { role, userId } = user;

    if (role === Role.Trainer) {
      if (tab === 'first') {
        setToRender(<TrainerPlans id={userId} />);
      }
      if (tab === 'second') {
        setToRender(<TrainerClients id={userId} />);
      }
    } else if (tab === 'first') {
      setToRender(<UserPlans id={userId} />);
    } else if (tab === 'second') {
      setToRender(<ClientTrainers id={userId} />);
    } else {
      setToRender(<UserPlans id={userId} />);
    }
  };

  const renderSwitchedButton = () => {
    if(user){
    if (user.role === Role.Trainer) {
      return (
        <SwitchedButton
          firstButtonText={translate('MyPlans')}
          firstButtonFunc={() => renderGenericElement('first')}
          secondButtonText={translate('MyClients')}
          secondButtonFunc={() => renderGenericElement('second')}
        />
      );
    }
    return (
      <SwitchedButton
        firstButtonText={translate('MyPlans')}
        firstButtonFunc={() => renderGenericElement('first')}
        secondButtonText={translate('MyTrainers')}
        secondButtonFunc={() => renderGenericElement('second')}
      />
    );
  }
  };

  return (
    <>
    <MyProfileTemplate>
        <UserInfoBackground>
          <Container>
            <Nav>
            <BackTopNav text = {user && user.firstName}/>
            </Nav>
            <ContainerCentred>
              {user && <UserInfo user={user} />}
            </ContainerCentred>
            {renderSwitchedButton()}
          </Container>
        </UserInfoBackground>
        <Container type="entry">
          {toRender}
        </Container>
    </MyProfileTemplate>
    </>
  );
};

export default User;
