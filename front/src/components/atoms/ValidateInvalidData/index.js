import React from 'react';
import Paragraph from 'components/atoms/Paragraph';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colorErrorDefault};
`;

const ValidateInvalidData = ({
  errors, touched, text, inputName,
}) => {
  const toReturn = <Paragraph type="body-3-regular">{text}</Paragraph>;

  if (errors[inputName] && touched[inputName]) {
    return (
      <ErrorText>
        {toReturn}
      </ErrorText>
    );
  }

  return toReturn;
};

ValidateInvalidData.propTypes = {
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
};

export default ValidateInvalidData;
