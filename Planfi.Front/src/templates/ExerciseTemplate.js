import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  text-align: left;

  background-color: ${({ theme }) => theme.colorGray90};
  color: ${({ theme }) => theme.colorGray10};

  margin: 2rem 1.6rem;
`;

const ExerciseTemplate = ({ children }) => (
  <Container>
    {children}
  </Container>
);

ExerciseTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ExerciseTemplate;
