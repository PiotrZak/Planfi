import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { history as historyPropTypes } from 'history-prop-types';
import Icon from 'components/atoms/Icon';

const Return = ({ history, fill }) => <Icon name="arrow-left" fill={fill} onClick={() => history.goBack()} />;

Return.propTypes = {
  history: PropTypes.shape(historyPropTypes).isRequired,
  fill: PropTypes.string,
};

Return.defaultProps = {
  fill: ({ theme }) => theme.colorInputActive,
};

export default withRouter(Return);
