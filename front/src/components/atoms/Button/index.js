import styled from 'styled-components';
import handleButtonType from './ButtonType';

// Set button size
const handleButtonSize = (size) => {
  switch (size) {
    case 'sm':
      return '2.4rem';
    case 'md':
      return '3.2rem';
    case 'lg':
      return '4.8rem';
    default:
      return '2.4rem';
  }
};

const Button = styled.button`

  //button default styles
  padding: 0 1.6rem;
  cursor: pointer;
  font-weight: bold;
  border-radius: 2px;

  outline: none;
  border: none;
  
  color: ${({ theme }) => theme.colorWhite};

  //button size
  height: ${({ size }) => handleButtonSize(size)};
  
  //disabled button 
  :disabled{
    color: ${({ theme }) => theme.colorDisabled};
    background: ${({ theme }) => theme.colorGray30};

    //overwrite hover effect for disabled button
    &:hover {
      background: ${({ theme }) => theme.colorGray30} !important;
    }
  }
  
  ${({ buttonType, theme }) => handleButtonType(buttonType, theme)};  
`;

export default Button;
