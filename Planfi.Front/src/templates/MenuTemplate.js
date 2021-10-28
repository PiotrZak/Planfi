import React from 'react';
import styled from 'styled-components';
import breakPointSize from 'utils/rwd';
import PropTypes from 'prop-types';
import Menu from 'components/organisms/Menu';
import { useScrollData } from "scroll-data-hook";
import { ScrollContext } from 'support/context/ScrollContext';

const Wrapper = styled.div`
  overflow-y:scroll;
  @media only screen and ${breakPointSize.xs}{
    flex-direction: column;
  }
`;

const MenuTemplate = ({ children }) => {

const { position } = useScrollData();
const currentUser = JSON.parse((localStorage.getItem('user')));

console.log(currentUser)
return(
  <Wrapper id ="scroll">
    {currentUser && <Menu />}
    <ScrollContext.Provider value = {{ position}} >
    <div className ="scroll">
    {children}
    </div>
    </ScrollContext.Provider >
  </Wrapper>
)
};

MenuTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MenuTemplate;
