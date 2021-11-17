import styled from 'styled-components';
import handleTextType from 'support/TextType';

const Paragraph = styled.p`
  ${({ type }) => handleTextType(type)}
`;

export default Paragraph;
