import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Paragraph from 'components/atoms/Paragraph';
import Icon from 'components/atoms/Icon';
import { useThemeContext } from 'support/context/ThemeContext';
import breakPointSize from 'utils/rwd';

const LightWrapper = styled.div`
  background: ${({ theme }) => theme.colorWhite};
  min-height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom:1px solid ${({ theme }) => theme.colorGray30};
  padding: 0rem 1.6rem;
  margin-left:4.8rem;
  cursor: pointer;
  @media only screen and ${breakPointSize.xs} {
     margin-left:1.6rem;
    }
`;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colorGray80};
  min-height: 72px;
  border-radius: 4px;
display: flex;
  justify-content: space-between;
  padding: 1.2rem 1.6rem;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
`;

const ContainerMenu = styled.div`
  display: flex;
  align-items: center;
`;

const StyledParagraph = styled(Paragraph)`
    margin: 0;
`;

const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: .8rem;
  justify-content: center;
`;

const LightCircle = styled.div`
  background: ${({ theme }) => theme.colorGray30};
  border-radius: 50%;
  width: 3.2rem;
  height: 3.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  ${({ lastMenu }) => lastMenu && 'margin-left: .8rem;'}

  :hover{
    background: ${({ theme }) => theme.colorDisabled};
  }
`;

const Circle = styled.div`
  background: ${({ theme }) => theme.colorGray70};
  border-radius: 50%;
  width: 3.2rem;
  height: 3.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  ${({ lastMenu }) => lastMenu && 'margin-left: .8rem;'}

  :hover{
    background: ${({ theme }) => theme.colorDisabled};
  }
`;

const handleavatarType = (type) => {
  switch (type) {
    case 'circle':
      return css`
        height: 4rem;
        width: 4rem;s
        border-radius: 50%;
      `;
    case 'square':
      return css`
        height: 4.8rem;
        width: 4.8rem;
        border-radius: 3px;
      `;
    case 'noAvatar':
      return css``;
    default:
      return css`
        height: 4.8rem;
        width: 4.8rem;
        border-radius: 3px;
      `;
  }
};

const StyledAvatar = styled.img`
  border-radius: 4px;
  ${({ type }) => handleavatarType(type)};
`;

const NoAvatarSquare = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: .3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colorGray50};
`;

const ImageContainer = styled.img`
  height: 100%;
  width: auto;
  object-fit: cover;
  border-radius: 4px;
  ${({ type }) => handleavatarType(type)};
`;


const Avatar = (type, url, theme) => {

  const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(url)));

  if(type == 'initials'){
    return null
  }
  if(type == "noAvatar"){
    return null
  }
  if (url == null || url == "null" || !url || url.length < 10) {
    return (
      <NoAvatarSquare>
        <Icon name="image-slash" size="1.8rem" fill={theme.colorSecondary} />
      </NoAvatarSquare>
    );
  }
  else{
    return(
      <ImageContainer src={`data:image/jpeg;base64,${base64String}`} />
    )
  }
};

const GenericElement = ({
  headline,
  subline,
  avatarType,
  avatarUrl,
  onMenuClick,
  version,
  ...rest
}) => {
  const { theme } = useThemeContext();

  return (
    <>
    {version == 'light'
  ? <LightWrapper {...rest}>
  <Container>
    {Avatar(avatarType, avatarUrl, theme)}
    <ContainerText>
      <StyledParagraph type="Label-Button">{headline}</StyledParagraph>
      <StyledParagraph type="body-3-regular">{subline}</StyledParagraph>
    </ContainerText>
  </Container>
  <ContainerMenu>
    <LightCircle onClick={onMenuClick}>
      <Icon name="arrow-right" size="2rem" />
    </LightCircle>
  </ContainerMenu>
  </LightWrapper>
:    <Wrapper {...rest}>
<Container>
  {Avatar(avatarType, avatarUrl, theme)}
  <ContainerText>
    <StyledParagraph type="Label-Button">{headline}</StyledParagraph>
    <StyledParagraph type="body-3-regular">{subline != undefined && subline}</StyledParagraph>
  </ContainerText>
</Container>
<ContainerMenu>
  <Circle onClick={onMenuClick}>
    <Icon name="arrow-right" size="2rem" />
  </Circle>
</ContainerMenu>
</Wrapper>
}
</>
  );
};

export default GenericElement;
