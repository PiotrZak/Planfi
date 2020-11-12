import React from 'react';
import styled from 'styled-components';
import breakPointSize from 'utils/rwd';
import PropTypes from 'prop-types';
import Menu from 'components/organisms/Menu';

const Wrapper = styled.div`
  display: flex;

  @media only screen and ${breakPointSize.xs}{
    flex-direction: column;
  }
`;

const MenuTemplate = ({ children }) => (
  <Wrapper>
    <Menu />
    {children}
  </Wrapper>
);

MenuTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MenuTemplate;
