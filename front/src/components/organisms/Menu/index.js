import React, { useState, useEffect } from 'react';
import { routes } from 'utils/routes';
import { withRouter, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Icon from 'components/atoms/Icon';
import { Role } from 'utils/role';
import breakPointSize from 'utils/rwd';
import { useThemeContext } from 'support/context/ThemeContext';

// eslint-disable-next-line no-shadow
const getUsersRoute = (currentUser) => {
  switch (currentUser.role) {
    case Role.Admin:
      return routes.users;
    case Role.Owner:
      return routes.organizationUsers;
    case Role.Trainer:
      return routes.organizationClients;
    case Role.User:
      return routes.organizationClients;
    case null:
      return routes.users;
    default:
      return routes.organizationClients;
  }
};

const Wrapper = styled.div`
  position: fixed;
  height: 100vh;

  display: flex;
  flex-direction: column;

  justify-content: center;
  background: ${({ theme }) => theme.colorGray80};
  padding: .7rem 0;

  @media only screen and ${breakPointSize.xs} {
   width: 100%;
   flex-direction: row;
   align-items: center;
   left: 0;
   bottom: 0;
   height: 5.2rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  background: ${({ theme }) => theme.colorGray80};
  padding: .7rem 0;

  @media only screen and ${breakPointSize.xs} {
     width: 100%;
     padding-bottom: 1rem;
     flex-direction: row;
     justify-content: space-around;
     border-top: 1px solid ${({ theme }) => theme.colorInputBorder};
  };
`;

const Square = styled.div`
  height: 4.2rem;
  width: 4.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 .5rem;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;

const StyledSquare = styled(Square)`

  ${({ active,  }) => active && `
      border-radius: .8rem;
      width:42px;
      height:42px;
      background: #5E4AE3;
  `}
`;

const MenuOption = (iconName,route, fillFunc) => {

const [active, setActive] = useState(false)
const [currentUrl, setCurrentUrl] = useState('');

useEffect(() => {

  if(window.location.href.split('/')[3].includes(route.substring(1,4))){
    setActive(true)
  }
  else{
    setActive(false)
  }

}, [window.location.href]);

return(
  <StyledNavLink active={active} to={route}>
    <StyledSquare active = {active}>
      <Icon name={iconName} fill={fillFunc} size="2rem" />
    </StyledSquare>
  </StyledNavLink>
)
};

// eslint-disable-next-line react/prop-types
const Menu = () => {
  const currentUser = JSON.parse((localStorage.getItem('user')));
  const [currentUrl, setCurrentUrl] = useState('');
  const { theme } = useThemeContext();

  useEffect(() => {
    const currentUrl = window.location.href.split('/');
    setCurrentUrl(currentUrl[3]);
  }, [window.location.href]);

  const changeIconColor = (currentUrl, route) =>   (currentUrl.includes(route.substring(1,4)) ? theme.colorPrimary : theme.colorDisabled);

  const toRender = (currentUser) => {
    switch (currentUser.role) {
      case Role.Owner:
        return (
          <>
            {MenuOption('dumbbell', routes.categories, changeIconColor(currentUrl, routes.categories))}
            {MenuOption('list-ul', getUsersRoute(currentUser), changeIconColor(currentUrl, routes.organizationTrainers))}
            {MenuOption('clipboard-notes', routes.plans, changeIconColor(currentUrl, routes.plans))}
            {MenuOption('heart', routes.clients, changeIconColor(currentUrl, routes.clients))}
            {MenuOption('user-circle', routes.myProfile, changeIconColor(currentUrl, routes.myProfile))}
          </>
        );
      case Role.Trainer:
        return (
          <>
            {MenuOption('dumbbell', routes.categories, changeIconColor(currentUrl, routes.categories))}
            {MenuOption('list-ul', routes.plans, changeIconColor(currentUrl, routes.plans))}
            {MenuOption('heart', routes.clients, changeIconColor(currentUrl, routes.clients))}
            {MenuOption('user-circle', routes.myProfile, changeIconColor(currentUrl, routes.myProfile))}
          </>
        );
      case Role.User:
        return (
          <>
            {MenuOption('user-circle', routes.myProfile, changeIconColor(currentUrl, routes.myProfile))}
          </>
        );
      default:
        return (
          <>
            {MenuOption('user-circle', routes.myProfile, changeIconColor(currentUrl, routes.myProfile))}
          </>
        );
    }
  };

  return (
    <Wrapper>
      <Container>
        {toRender(currentUser)}
      </Container>
    </Wrapper>
  );
};

export default withRouter(Menu);
