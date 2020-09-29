import React from 'react';
import { withRouter } from 'react-router-dom';
import Icon from './Icon';

const Return = ({ history, fill }) => (
  <div onClick={() => history.goBack()} alt="Go back">
    <Icon name="arrow-left" fill={fill || '#5E4AE3'} />
  </div>
);

export default withRouter(Return);
