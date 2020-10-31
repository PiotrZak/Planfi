import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  text-align: left;

  background-color: ${({ theme }) => theme.colorGray90};
  width: calc(100% - 3.2rem);
  height: 100%;
  color: ${({ theme }) => theme.colorGray10};
  
  margin: 0 1.6rem;
`;

const AuthTemplate = ({ children }) => (
  <Container>
    {children}
  </Container>
);

AuthTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthTemplate;
