import React from 'react';
import styled from 'styled-components';
// todo - test if image appear after adding exercises & add circle elements
import Image from 'components/atoms/Image';
import StyledReactBottomSheet, {
  StyledReactBottomSheetExtended, BottomNav, BottomNavItem, BottomItem,
} from 'components/organisms/BottomSheet';
import { Headline, Subline } from 'components/typography';

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

const GenericElementImageEmpty = styled.div`
      background-color: ${({ theme }) => theme.colorGray60};
      width: 4.8rem;
      height: 4.8rem;
`;

const GenericElementImage = styled.div`
    border-radius: 3px;
    margin-right: 8px;
    width: 4.8rem;
    height: 4.8rem;
`;

const GenericElement = ({
  headline,
  subline,
  image,
  theme,
  circle,
}) => (
  theme == 'light' ? (
    <BottomItem>
      <Headline>{headline}</Headline>
    </BottomItem>
  )
    : (
      <GenericElementContainer>
        {image
          ? <GenericElementImage><Image url={image} /></GenericElementImage>
          : <GenericElementImageEmpty />}
        <GenericElementInfo>
          <Headline>{headline}</Headline>
          <Subline>{subline}</Subline>
        </GenericElementInfo>
      </GenericElementContainer>
    )
);

export default GenericElement;
