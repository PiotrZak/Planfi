import React from 'react';
import { ErrorMessage } from 'formik';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import handleTextType from 'support/TextType';

const StyledValidationHint = styled.p`
  color: ${({ theme }) => theme.colorErrorDefault};
  margin: .5rem 0 0 0;

  ${() => handleTextType('body-3-regular')};
`;

const ErrorMessageForm = ({ name }) => <ErrorMessage name={name} component={StyledValidationHint} />;

ErrorMessageForm.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ErrorMessageForm;
