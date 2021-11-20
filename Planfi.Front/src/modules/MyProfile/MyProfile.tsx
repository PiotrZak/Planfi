import React, {
  useState, useEffect, SetStateAction,
} from 'react';
import styled, { css } from 'styled-components';
import { UserInfo } from 'components/molecules/UserInfo/UserInfo';
import { useThemeContext } from 'support/context/ThemeContext';
import { userService } from 'services/userServices';
import { MyProfilePanel } from 'modules/MyProfile/MyProfilePanel';
import EditUserPasswordModal from 'modules/MyProfile/EditProfile/EditUserPassword';
import EditUserEmailModal from 'modules/MyProfile/EditProfile/EditUserEmail';
import EditUserDataModal from 'modules/MyProfile/EditProfile/EditUserData';
import MyProfileTemplate from 'templates/MyProfileTemplate';
import Icon from 'components/atoms/Icon';
import UserInfoBackground from 'components/molecules/UserInfoBackground';
import breakPointSize from 'utils/rwd';
import Nav from 'components/atoms/Nav';
import { profileTabs } from '../Users/ProfileTabs'
import { Plans } from 'modules/Users/UserProfile/Plans';
import { Users } from 'modules/Users/UserProfile/Users';
import TabItemComponent from 'components/molecules/TabItemComponent/TabItemComponent';


const Container = styled.div`
  margin: auto;
  width: 74%;

  @media screen and (${breakPointSize.xs}) {
    width: 100%;
    width: calc(100% - 3.2rem);
    margin: 0 1.6rem;
  }
`;

const Wrapper = styled.div`
display: flex;
justify-content: flex-start;
padding: 1rem 0;
color: ${({ theme }) => theme.colorGray10};
&:hover {
    cursor: pointer;
}
`;

const ContainerCentred = styled.div`
  margin-top: 4.8rem;
  margin-bottom: 1.2rem;
`;

interface IMyProfile {
  setUser: () => void;
  toggleTheme: () => void;
  toggleLanguage: () => void;
}

const MyProfile = ({ setUser, toggleTheme, toggleLanguage }: IMyProfile) => {
  const { theme } = useThemeContext();
  // @ts-ignore-start
  const user = JSON.parse((localStorage.getItem('user')));
    // @ts-ignore-end
  const [active, setActive] = useState(0);
  const [updatedUser, setUpdatedUser] = useState(user);
  const [bottomSheet, setBottomSheet] = useState<string | SetStateAction<string> | any>('none');
  const [avatarUpdated, setAvatarUpdated] = useState<boolean>();
  const [openEditUserData, setOpenEditUserData] = useState(false);
  const [openEditMailModal, setOpenEditMailModal] = useState(false);
  const [openEditUserPasswordModal, setOpenEditUserPasswordModal] = useState(false);


  useEffect(() => {
    setUpdatedUser(user);
    getUserById();
  }, [avatarUpdated]);

  const getUserById = () => {
    userService
      .getUserById(user.userId)
      .then((data) => {
        console.log(data)
        setUpdatedUser(data);
      })
      .catch((error) => {
      });
  };


  const renderTab = () => {

    if (active === 1) {
      return <Plans plans={updatedUser.userPlans} />;
    }
    if (active === 2) {
      return <Users users={updatedUser.clientTrainers} />;
    }
    return null;
  }

  return (
    <>
      <MyProfileTemplate>
        <UserInfoBackground>
          <Container>
            <Nav>
              <Wrapper>
                <Icon fill={theme.colorGray10} name="cog" size="2rem" onClick={() => setBottomSheet(!bottomSheet)} cursorType={undefined} />
              </Wrapper>
            </Nav>
            <ContainerCentred>
              <UserInfo user={updatedUser} />
            </ContainerCentred>
            <div className="tabs">
              {profileTabs.map(({ id, icon, titleTrainer, titleClient }) =>
                <TabItemComponent
                  key={updatedUser.roleName == "Trainer" ? titleTrainer : titleClient}
                  icon={icon}
                  title={updatedUser.roleName == "Trainer" ? titleTrainer : titleClient}
                  onItemClicked={() => setActive(id)}
                  isActive={active === id}
                />
              )}
            </div>
            {renderTab()}
          </Container>
        </UserInfoBackground>
      </MyProfileTemplate>
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
      <MyProfilePanel
        setUser={setUser}
        toggleTheme={toggleTheme}
        toggleLanguage={toggleLanguage}
        setOpenEditUserData={setOpenEditUserData}
        setOpenEditMailModal={setOpenEditMailModal}
        setOpenEditUserPasswordModal={setOpenEditUserPasswordModal}
        bottomSheet={bottomSheet}
        setBottomSheet={setBottomSheet}
        setAvatarUpdated={setAvatarUpdated}
        avatarUpdated={avatarUpdated}
      />
    </>
  );
};

export default MyProfile;
