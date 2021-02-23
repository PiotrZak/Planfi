import styled, { css } from 'styled-components';

const handleCenterPlace = (place) => {
  switch (place) {
    case 'authInfo':
      return css`
        width: 100%;
        //height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;          
      `;
    case 'authForm':
      return css`
        display: flex;
        height: calc(100vh - 12rem);
        flex-direction: column;
        justify-content: center;
      `;
    default:
      return null;
  }
};

const Center = styled.div`
  ${({ place }) => handleCenterPlace(place)};
`;

export default Center;
