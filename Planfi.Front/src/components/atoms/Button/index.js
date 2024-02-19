import styled from 'styled-components'
import handleButtonType from 'support/ButtonType'
import handleButtonPlace from 'support/handleButtonPlace'

// Set button size
const handleButtonSize = (size) => {
  switch (size) {
    case 'sm':
      return '2.4rem'
    case 'md':
      return '3.2rem'
    case 'lg':
      return '4.8rem'
    default:
      return '2.4rem'
  }
}

const Button = styled.button`
  padding: 0 1.6rem;
  cursor: pointer;
  font-weight: bold;
  border-radius: 2px;
  outline: none;
  border: none;
  color: ${({ theme }) => theme.colorWhite};
  height: ${({ size }) => handleButtonSize(size)};
  ${({ buttonPlace }) => handleButtonPlace(buttonPlace)};

  :disabled {
    color: ${({ theme }) => theme.colorDisabled};
    background: ${({ theme }) => theme.colorGray30};
    cursor: default;
    &:hover {
      background: ${({ theme }) => theme.colorGray30} !important;
    }
  }

  ${({ buttonType, theme }) => handleButtonType(buttonType, theme)};
`

export default Button
