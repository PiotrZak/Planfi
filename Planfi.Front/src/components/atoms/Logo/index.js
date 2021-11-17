import React from 'react'
import styled from 'styled-components'

const StyledLogo = styled.img`
  width: 10rem;
  margin-top: 0;
  margin: 0 auto 10rem auto;
`

const Logo = (props) => <StyledLogo {...props} />

export default Logo
