import React from 'react'
import { withTheme } from 'styled-components'
import AuthTemplate from 'templates/AuthTemplate'
import Icon from 'components/atoms/Icon'
import Center from 'components/atoms/Center'
import AuthRedirectButton from 'components/atoms/AuthRedirectButton'
import PropTypes from 'prop-types'

const AuthInfo = ({ theme, iconName, route, title }) => (
  <AuthTemplate>
    <Center place="authInfo">
      <Icon
        name={iconName}
        height="5.2rem"
        width="5.2rem"
        fill={theme.colorInputActive}
      />
      <h3>{title}</h3>
      <AuthRedirectButton route={route} title="Wróć do ekranu logowania" />
    </Center>
  </AuthTemplate>
)

AuthInfo.propTypes = {
  iconName: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default withTheme(AuthInfo)
