import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Paragraph from 'components/atoms/Paragraph';
import Icon from 'components/atoms/Icon';
import { useThemeContext } from 'support/context/ThemeContext';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colorGray80};
  border-radius: 4px;
`;

const Circle = styled.div`
  background: ${({ theme }) => theme.colorGray70};
  border-radius: 50%;
  width: 3.2rem;
  height: 3.2rem;
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
  }
};

const Avatar = styled.img`
  border-radius: 4px;
  ${({ type }) => handleAvatarType(type)};
`;

const GenericElementRefactor = ({
  HeadLine,
  SubLine,
  AvatarType,
  SecondaryMenu,
}) => {
  const { theme } = useThemeContext();

  return (
    <Wrapper>
      <Avatar type={AvatarType} />
      <Paragraph type="Label-Button">{HeadLine}</Paragraph>
      <Paragraph type="body-3-regular">{SubLine}</Paragraph>
      <Circle>
        <Icon name="draggabledots" color={theme.white} />
      </Circle>
    </Wrapper>
  );
};

GenericElementRefactor.propTypes = {
  Headline: PropTypes.string.isRequired,
  Subline: PropTypes.string.isRequired,
  Avatar: PropTypes.oneOf(['circle', 'square']),
};

export default GenericElementRefactor;
