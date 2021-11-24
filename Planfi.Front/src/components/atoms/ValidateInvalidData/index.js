import React from 'react'
import Paragraph from 'components/atoms/Paragraph'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const ErrorText = styled.div`
  color: ${({ theme }) => theme.colorErrorDefault};
  font-size: 1.2rem !important;
  margin-top: 1.2rem;
`

const ValidateInvalidData = ({ errors, touched, text, inputName }) => {
  const toReturn = text

  if (errors[inputName] && touched[inputName]) {
    return <ErrorText>{toReturn}</ErrorText>
  } else return null
}

ValidateInvalidData.propTypes = {
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
}

export default ValidateInvalidData
