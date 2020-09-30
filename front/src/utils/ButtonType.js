import { css } from 'styled-components';

// set button type
const handleButtonType = (buttonType, theme) => {
  switch (buttonType) {
    case 'primary':
      return css`
        background: ${theme.colorPrimaryDefault};
        
        :hover,
        :active{
          background: ${theme.colorNeutralDark} !important;
        }
      `;
    case 'secondary':
      return css`
        background: ${theme.colorSecondaryDefault};
        
        :hover,
        :active{
          background: ${theme.colorSecondaryDarkest} !important;
        }
      `;
    case 'dangerous':
      return css`
        background: ${theme.colorErrorDefault};
        
        :hover,
        :active{
          background: ${theme.colorErrorDarkest} !important;
        }
      `;
    case 'regular':
      return css`
        background: ${theme.colorGray70};

        :hover,
        :active{
          background: ${theme.colorDisabled} !important;
        }
      `;
    default:
      return css`
        background: ${theme.colorPrimaryDefault} !important;
        
        :hover,
        :active{
          background: ${theme.colorNeutralDark} !important;
        }
      `;
  }
};

export default handleButtonType;
