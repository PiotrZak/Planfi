import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { history as historyPropTypes } from 'history-prop-types';
import SvgArrowLeft from 'assets/iconComponents/ArrowLeft';

const Return = ({ history, fill }) => <SvgArrowLeft fill={fill} onClick={() => history.goBack()} />;

Return.propTypes = {
  history: PropTypes.shape(historyPropTypes).isRequired,
  fill: PropTypes.string,
};

Return.defaultProps = {
  fill: ({ theme }) => theme.colorInputActive,
};

export default withRouter(Return);
