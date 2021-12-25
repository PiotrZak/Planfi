import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
  max-width: 343px;
  margin: 4.4rem 1.6rem 2.4rem 1.6rem;
  display: flex;
  flex-direction: column;
  text-align: left;
  background-color: ${({ theme }) => theme.colorGray90};
  color: ${({ theme }) => theme.colorGray10};

  @media screen and (min-width: 80rem) {
    margin: 0;
    position: absolute;
    min-width: 70rem;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
`

const AuthTemplate = ({ children }) => <Container>{children}</Container>

AuthTemplate.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthTemplate