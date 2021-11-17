import { css } from 'styled-components'

// set button type
const handleButtonPlace = (buttonPlace) => {
  switch (buttonPlace) {
    case 'auth':
      return css`
        width: 100%;
        margin-top: 0.3rem;
      `
    case 'bottom':
      return css`
        @media screen and (max-width: 80rem) {
          width: 100%;
          margin-top: 0.3rem;
          bottom: 0;
          position: fixed;
          margin-left: -1.5rem;
        }
        @media screen and (min-width: 80rem) {
          width: 100%;
          margin-top: 0.3rem;
        }
      `
    default:
      return null
  }
}

export default handleButtonPlace
