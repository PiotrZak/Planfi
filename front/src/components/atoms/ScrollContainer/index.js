import React from 'react';
import styled from 'styled-components';
import breakPointSize from 'utils/rwd';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  overflow-y: auto;
  height: calc(100vh - 10rem);

  @media only screen and ${breakPointSize.xs} {
    height: calc(100vh - 13rem);
  }
`;

const ScrollContainer = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
);

ScrollContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ScrollContainer;
