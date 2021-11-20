import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import handleTextType from 'support/TextType'

// Detect TextArea status
const handleBorderColor = (theme, disabled, error) => {
  if (disabled) {
    return theme.colorGray90
  }
  if (error) {
    return theme.colorErrorDefault
  }
  return theme.colorDisabled
}

// basic TextArea
const StyledTextArea = styled.textarea`
  outline: none;
  padding: 0.6rem 1.6rem;
  border-radius: 3px;

  ${() => handleTextType('body-3-regular')};

  color: ${({ disabled, theme }) =>
    disabled ? theme.colorDisabled : theme.colorPrimary};
  background: ${({ disabled, theme }) =>
    disabled ? theme.colorGray90 : theme.colorGray80};
  border: 1px solid
    ${({ theme, disabled, error }) => handleBorderColor(theme, disabled, error)};

  :focus {
    border: 1px solid ${({ theme }) => theme.colorNeutralDark};
    background: ${({ theme }) => theme.colorGray70};
  }
`

const TextArea = (props) => <StyledTextArea {...props} />

TextArea.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
}

TextArea.defaultProps = {
  disabled: false,
  error: false,
}

export default TextArea
