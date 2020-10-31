import React from 'react';
import styled from 'styled-components';

const StyledLogo = styled.img`
   width: 10rem;
   height: 10rem;
   
   margin: 10rem auto;
`;

const Logo = (props) => <StyledLogo {...props} />;

export default Logo;
