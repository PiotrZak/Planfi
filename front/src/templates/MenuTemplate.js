import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import breakPointSize from 'utils/rwd';
import PropTypes from 'prop-types';
import Menu from 'components/organisms/Menu';
import { useScrollData } from "scroll-data-hook";
import { ScrollProvider } from '../support/context/ScrollContext';
import { ScrollContext } from 'support/context/ScrollContext';

const Wrapper = styled.div`
  overflow-y:scroll;
  @media only screen and ${breakPointSize.xs}{
    flex-direction: column;
  }
`;

const MenuTemplate = ({ children }) => {

  const {
    scrolling,
    time,
    speed,
    direction,
    position,
    relativeDistance,
    totalDistance
  } = useScrollData();

  const tes2t = document.body.scrollTop;
  const test = window.pageYOffset 

  console.log(position)
console.log(test)
console.log(tes2t)

return(

  <Wrapper id ="scroll">
    <Menu />
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
