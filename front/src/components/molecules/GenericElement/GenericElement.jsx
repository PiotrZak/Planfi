import React from 'react';
import styled from 'styled-components';
// todo - test if image appear after adding exercises & add circle elements
import Image from 'components/atoms/Image';

const GenericElementContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: ${({ theme }) => theme.colorGray80};
  padding: 1.8rem 4.2rem;
  margin: 0.8rem 0;
  height: 7.2rem;
  border-radius: 4px;
  color:white;
  z-index:2;
  &:hover {
      cursor:pointer;
    }
`;

const GenericElementInfo = styled.div`
  color: ${({ theme }) => theme.colorPrimary};
  font-size: 1.4rem;
  line-height: 2.1rem;
  text-decoration:none;
  text-align:left;
`;
const Headline = styled.h4`
  margin: 0 0 0 0;
  font-size:1.4rem;
`;

const Subline = styled.p`
  margin: 0 0 0 0;
  font-size:1.1rem;
`;

const GenericElementCircle = styled.div`
  border-radius: 50%;
`;

const GenericElementSquare = styled.div`

`;

const GenericElementImage = styled.div`
    border-radius: 3px;
    margin-right: 8px;
    width: 4.8rem;
    height: 4.8rem;
`;

const GenericElementImageEmpty = styled.div`
      background-color: $color-gray-60;
      width: 4.8rem;
      height: 4.8rem;
`;

const GenericElement = ({
  headline,
  subline,
  image,
  circle,
}) => (
  <GenericElementContainer>
    {image
      ? <GenericElementImage><Image url={image} /></GenericElementImage>
      : <GenericElementImageEmpty />}
    <GenericElementInfo>
      <Headline>{headline}</Headline>
      <Subline>{subline}</Subline>
    </GenericElementInfo>
  </GenericElementContainer>
);

export default GenericElement;
