import React from 'react'
import styled from 'styled-components'
import Button from 'components/atoms/Button'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const StyledLink = styled(Link)`
  width: 100%;
`

const AuthRedirectButton = ({ route, title }) => (
  <StyledLink to={route}>
    <Button type="submit" buttonType="primary" size="lg" buttonPlace="auth">
      {title}
    </Button>
  </StyledLink>
)

AuthRedirectButton.propTypes = {
  route: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default AuthRedirectButton
