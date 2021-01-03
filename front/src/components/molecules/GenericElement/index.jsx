import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Paragraph from 'components/atoms/Paragraph';
import Icon from 'components/atoms/Icon';
import { useThemeContext } from 'support/context/ThemeContext';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colorGray80};
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

const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: .8rem;
  justify-content: center;

  > p {
    margin: 0;
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

const handleAvatarType = (type) => {
  switch (type) {
    case 'circle':
      return css`
        height: 4rem;
        width: 4rem;
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
  ${({ type }) => handleAvatarType(type)};
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

const Avatar = (type, url, theme) => {
  if (url === 'null') {
    return (
      <NoAvatarSquare>
        <Icon name="image-slash" size="1.4rem" fill={theme.colorSecondary} />
      </NoAvatarSquare>
    );
  }
  return <StyledAvatar type={type} url={url} />;
};

const GenericElement = ({
  HeadLine,
  SubLine,
  AvatarType,
  AvatarURL,
  SecondaryMenu,
  onMenuClick,
  onSecondaryMenuClick,
  ...rest
}) => {
  const { theme } = useThemeContext();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Wrapper {...rest}>
      <Container>
        {Avatar(AvatarType, AvatarURL, theme)}
        <ContainerText>
          <Paragraph type="Label-Button">{HeadLine}</Paragraph>
          <Paragraph type="body-3-regular">{SubLine}</Paragraph>
        </ContainerText>
      </Container>
      <ContainerMenu>
        <Circle onClick={onMenuClick}>
          <Icon name="ellipsis-h" size="2rem" />
        </Circle>
        {SecondaryMenu && (
          <Circle onClick={onSecondaryMenuClick} lastMenu>
            <Icon name="draggabledots" size="2rem" />
          </Circle>
        )}
      </ContainerMenu>
    </Wrapper>
  );
};

GenericElement.propTypes = {
  HeadLine: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  SubLine: PropTypes.string,
  AvatarType: PropTypes.oneOf(['circle', 'square', 'noAvatar']),
  AvatarURL: PropTypes.string,
  SecondaryMenu: PropTypes.bool,
  onMenuClick: PropTypes.func,
  onSecondaryMenuClick: PropTypes.func,
};

GenericElement.defaultProps = {
  AvatarType: 'noAvatar',
  AvatarURL: 'null',
  SecondaryMenu: false,
};

export default GenericElement;
