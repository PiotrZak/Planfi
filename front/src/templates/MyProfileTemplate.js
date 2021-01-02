import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import breakPointSize from 'utils/rwd';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  background-color: ${({ theme }) => theme.colorGray90};
  width: 100%;
  height: 100%;
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
