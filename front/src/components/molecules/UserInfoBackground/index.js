import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledUserInfoBackground = styled.div`
  width: 100%;
  padding-top: 2.6rem;
  margin-bottom: 1.6rem;
  background-color: ${({ theme }) => theme.colorGray70};

`;

const UserInfoBackground = ({ children }) => (
  <StyledUserInfoBackground>
    {children}
  </StyledUserInfoBackground>
);

UserInfoBackground.propTypes = {
  children: PropTypes.node.isRequired,
  place: PropTypes.oneOf(['User', 'MyProfile']).isRequired,
};

export default UserInfoBackground;
