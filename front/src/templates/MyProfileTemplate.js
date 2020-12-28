import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  color: ${({ theme }) => theme.colorGray10};
`;

const MyProfileTemplate = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
);

MyProfileTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProfileTemplate;
