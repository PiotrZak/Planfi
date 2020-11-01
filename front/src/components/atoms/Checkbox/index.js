import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';
import PropTypes from 'prop-types';

const TYPE = {
  FORMIK: 'formik',
};

const StyledCheckboxFormik = styled(Field)`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 1rem;
`;

const Checkbox = (props) => {
  if (props.checkboxType === TYPE.FORMIK) {
    return <StyledCheckboxFormik {...props} />;
  }
};

Checkbox.propTypes = {
  checkboxType: PropTypes.oneOf([TYPE.FORMIK]).isRequired,
};

export default Checkbox;
