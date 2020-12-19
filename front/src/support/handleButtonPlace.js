import { css } from 'styled-components';

// set button type
const handleButtonPlace = (buttonPlace) => {
  switch (buttonPlace) {
    case 'auth':
      return css`
        width: 100%;
        margin-top: .3rem;
      `;
    default:
      return null;
  }
};

export default handleButtonPlace;
