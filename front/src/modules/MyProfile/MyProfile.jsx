import React, {
  useState, useEffect,
} from 'react';
import styled from 'styled-components';
import { UserInfo } from 'components/molecules/UserInfo/UserInfo';
import { useThemeContext } from 'support/context/ThemeContext';
import { userService } from 'services/userServices';
import { useUserContext } from 'support/context/UserContext';
import { TrainerClients } from 'modules/Users/UserProfile/TrainerClients';
import { UserPlans } from 'modules/Users/UserProfile/UserPlans';
import { MyProfilePanel } from 'modules/MyProfile/MyProfilePanel';

import EditUserPasswordModal from 'modules/MyProfile/EditProfile/EditUserPassword';
import EditUserEmailModal from 'modules/MyProfile/EditProfile/EditUserEmail';
import EditUserDataModal from 'modules/MyProfile/EditProfile/EditUserData';
import MyProfileTemplate from 'templates/MyProfileTemplate';
import Icon from 'components/atoms/Icon';
import { translate } from 'utils/Translation';
import UserInfoBackground from 'components/molecules/UserInfoBackground';
import SwitchedButton from 'components/molecules/SwitchedButton';
import { Role } from 'utils/role';
import { ClientTrainers } from 'modules/Users/UserProfile/ClientTrainers';
import { TrainerPlans } from 'modules/Users/UserProfile/TrainerPlans';
import Search from 'components/molecules/Search';

const Container = styled.div`
  margin: 0 1.6rem;
`;

const ContainerCentred = styled.div`
  margin-top: 4.7rem;
  margin-bottom: 1rem;
`;

const IconContainer = styled.div`
  margin-left: 1.8rem;
`;

export const MyProfile = ({ toggleTheme, toggleLanguage }) => {
  const { user } = useUserContext();
  const { theme } = useThemeContext();
  const [updatedUser, setUpdatedUser] = useState(user);
  const [toRender, setToRender] = useState(null);

  useEffect(() => {
    setUpdatedUser(user);
    getUserById();
  }, []);

  const getUserById = () => {
    userService
      .getUserById(user.userId)
      .then((data) => {
        setUpdatedUser(data);
      })
      .catch((error) => {
      });
  };

  const [bottomSheet, setBottomSheet] = useState('none');

  const [openEditUserData, setOpenEditUserData] = useState(false);
  const [openEditMailModal, setOpenEditMailModal] = useState(false);
  const [openEditUserPasswordModal, setOpenEditUserPasswordModal] = useState(false);

  const renderGenericElement = (tab) => {
    const { role, userId } = user;

    if (role === Role.Trainer) {
      if (tab === 'first') {
        setToRender(<TrainerClients id={userId} />);
      } else if (tab === 'second') {
        setToRender(<TrainerPlans id={userId} />);
      } else {
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
    if (user.role === Role.Trainer) {
      return (
        <SwitchedButton
          firstButtonText={translate('MyPlans')}
          firstButtonFunc={() => renderGenericElement('first')}
          secondButtonText={translate('MyClients')}
          secondButtonFunc={() => () => renderGenericElement('second')}
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
  };

  return (
    <>
      <MyProfileTemplate>
        <UserInfoBackground place="MyProfile">
          <IconContainer>
            <Icon name="cog" size="2rem" onClick={() => alert('Add functionality')} />
          </IconContainer>
          <ContainerCentred>
            {user && <UserInfo user={updatedUser} />}
          </ContainerCentred>
          {renderSwitchedButton()}
        </UserInfoBackground>
        <Container>
          <Search placeholder={translate('Find')} callback={alert('add search')} />
          {toRender}
        </Container>
        <EditUserDataModal
          id={user.userId}
          openModal={openEditUserData}
          onClose={() => setOpenEditUserData(false)}
        />
        <EditUserEmailModal
          id={user.userId}
          openModal={openEditMailModal}
          onClose={() => setOpenEditMailModal(false)}
        />
        <EditUserPasswordModal
          id={user.userId}
          openModal={openEditUserPasswordModal}
          onClose={() => setOpenEditUserPasswordModal(false)}
        />
      </MyProfileTemplate>
      <MyProfilePanel
        setOpenEditUserData={setOpenEditUserData}
        setOpenEditMailModal={setOpenEditMailModal}
        setOpenEditUserPasswordModal={setOpenEditUserPasswordModal}
        theme={theme}
        bottomSheet={bottomSheet}
        setBottomSheet={setBottomSheet}
      />
    </>
  );
};

export default MyProfile;
