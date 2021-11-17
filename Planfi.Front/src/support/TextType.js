import { css } from 'styled-components';

const handleTextType = (type) => {
  switch (type) {
    case 'Label-Button':
      return css`
        font-weight: 700;
        font-size: 1.4rem;
        line-height: 2rem;
      `;
    case 'body-1-medium':
      return css`
        font-weight: 500;
        font-size: 1.8rem;
        line-height: 2.7rem;
      `;
    case 'body-1-regular':
      return css`
        font-weight: 400;
        font-size: 1.8rem;
        line-height: 2.7rem;
      `;
    case 'body-2-medium':
      return css`
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2.5rem;
      `;
    case 'body-2-regular':
      return css`
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 2.5rem;
      `;
    case 'body-3-medium':
      return css`
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 2.1rem;
      `;
    case 'body-3-regular':
      return css`
        font-weight: 400;
        font-size: 1.4rem;
        line-height: 2.1rem;
      `;
    case 'small-tag':
      return css`
        font-weight: 600;
        font-size: 1.2rem;
        line-height: 1.8rem;
      `;
    default:
      return css`
        font-weight: 500;
        font-size: 1.8rem;
        line-height: 2.7rem;
      `;
  }
};

export default handleTextType;
