import React from 'react';
import { withRouter } from 'react-router-dom';
import Icon from "./Icon"

const Return = ({ history }) =>
    <div onClick={() => history.goBack()} alt="Go back">
        <Icon name={"arrow-left"} fill={"#5E4AE3"} />
    </div>


export default withRouter(Return);