import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const handleBgPlace = (place) => {
  if (place === 'User') {
    return css`
      height: 22.2rem;
    `;
  } if (place === 'MyProfile') {
    return css`
      height: 27.8rem;
    `;
  }
  return false;
};

const StyledUserInfoBackground = styled.div`
  width: 100%;
  padding-top: 2.6rem;
  margin-bottom: 1.6rem;
  background-color: ${({ theme }) => theme.colorGray70};

  ${({ place }) => handleBgPlace(place)}
`;

const UserInfoBackground = ({ children, place }) => (
  <StyledUserInfoBackground place={place}>
    {children}
  </StyledUserInfoBackground>
);

UserInfoBackground.propTypes = {
  children: PropTypes.node.isRequired,
  place: PropTypes.oneOf(['User', 'MyProfile']).isRequired,
};

export default UserInfoBackground;
