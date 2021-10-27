import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from 'components/atoms/Icon';

const Return = ({ fill }) => <Icon name="arrow-left" fill={fill} />;

Return.propTypes = {
  fill: PropTypes.string,
};

Return.defaultProps = {
  fill: ({ theme }) => theme.colorInputActive,
};

export default withRouter(Return);
