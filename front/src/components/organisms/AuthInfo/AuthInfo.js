import React from 'react';
import AuthTemplate from 'templates/AuthTemplate';
import Icon from 'components/atoms/Icon';
import Center from 'components/atoms/Center';
import AuthRedirectButton from 'components/atoms/AuthRedirectButton';
import PropTypes from 'prop-types';
import { useThemeContext } from 'support/context/ThemeContext';
import { translate } from 'utils/Translation';

const AuthInfo = ({
  iconName, route, title,
}) => {
  const { theme } = useThemeContext();

  return (
    <AuthTemplate>
      <Center place="authInfo">
        {/* eslint-disable-next-line react/prop-types */}
        <Icon name={iconName} size="5.2rem" color={theme.colorInputActive} />
        <h3>{title}</h3>
        <AuthRedirectButton route={route} title={translate('BackToLogin')} />
      </Center>
    </AuthTemplate>
  );
};

AuthInfo.propTypes = {
  iconName: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default AuthInfo;
