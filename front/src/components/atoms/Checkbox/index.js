import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';
import PropTypes from 'prop-types';

export const CHECKBOX_TYPE = {
  FORMIK: 'formik',
  GENERIC_ELEMENT: 'generic_element',
};

const StyledCheckboxFormik = styled(Field)`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 1rem;
`;

const StyledCheckboxGenericElement = styled.input.attrs({ type: 'checkbox' })`
  width: 2.4rem;
  height: 2.4rem;
`;

const Checkbox = (props) => {
  if (props.checkboxType === CHECKBOX_TYPE.FORMIK) {
    return <StyledCheckboxFormik {...props} />;
  } if (props.checkboxType === CHECKBOX_TYPE.GENERIC_ELEMENT) {
    return <StyledCheckboxGenericElement {...props} />;
  }
  return false;
};

Checkbox.propTypes = {
  checkboxType: PropTypes.oneOf([CHECKBOX_TYPE.FORMIK, CHECKBOX_TYPE.GENERIC_ELEMENT]).isRequired,
};

export default Checkbox;
