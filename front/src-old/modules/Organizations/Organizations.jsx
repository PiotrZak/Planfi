import React, { useContext } from 'react';
import { organizationService } from 'services/organizationServices';
import Icon from 'common/Icon';
import Return from 'common/Return';
import { CheckboxGenericComponent } from 'common/CheckboxGenericComponent';
import { Loader } from 'common/Loader';
import { commonUtil } from 'utils/common.util';
import { alertActions } from 'redux/actions/alert.actions';
import { useDispatch } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { organizationsTitle } from 'lang/en';
import { ThemeContext } from 'App';

export const Organizations = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`container ${theme}`}>
      <div className="container__title">
        <Return />
        <h2>{organizationsTitle}</h2>
      </div>
    </div>
  );
};

export default Organizations;
