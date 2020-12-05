import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { history as historyPropTypes } from 'history-prop-types';
import Icon from 'components/atoms/Icon';

const Return = ({ history, color }) => <Icon name="arrow-left" color={color} onClick={() => history.goBack()} cursorType="pointer" />;

Return.propTypes = {
  history: PropTypes.shape(historyPropTypes).isRequired,
  color: PropTypes.string,
};

Return.defaultProps = {
  color: ({ theme }) => theme.colorInputActive,
};

export default withRouter(Return);
