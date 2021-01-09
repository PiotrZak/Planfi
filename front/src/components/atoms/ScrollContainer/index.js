import React from 'react';
import styled from 'styled-components';
import breakPointSize from 'utils/rwd';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  overflow-y: auto;
  height: calc(100vh - ${({ desktopHeight }) => desktopHeight});

  @media only screen and ${breakPointSize.xs} {
    height: calc(100vh - ${({ mobileHeight }) => mobileHeight});
  }
`;

const ScrollContainer = ({ children, mobileHeight, desktopHeight }) => (
  <Wrapper mobileHeight={mobileHeight} desktopHeight={desktopHeight}>
    {children}
  </Wrapper>
);

ScrollContainer.propTypes = {
  children: PropTypes.node.isRequired,
  mobileHeight: PropTypes.string,
  desktopHeight: PropTypes.string,
};

ScrollContainer.defaultProps = {
  desktopHeight: '10rem',
  mobileHeight: '13rem',
};

export default ScrollContainer;
