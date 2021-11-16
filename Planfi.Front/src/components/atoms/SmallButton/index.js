import React from 'react';
import styled from 'styled-components';
import handleButtonType from 'support/ButtonType';
import PropTypes from 'prop-types';
import Icon from 'components/atoms/Icon';

// set button type
const SmallButtonStyled = styled.div`
  width: 3.2rem;
  height: 3.2rem;

  cursor: pointer;

  outline: none;
  border: none;

  color: ${({ theme }) => theme.colorWhite};

  //center icon
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ buttonType, theme }) => handleButtonType(buttonType, theme)};

  ${({ color }) => color && `background: ${color} !important;`};
`;

const SmallButtonSquareStyled = styled(SmallButtonStyled)`
  border-radius: 2px;
`;

const SmallButtonCircleStyled = styled(SmallButtonStyled)`
  border-radius: 50%;
`;

const SmallButton = ({
  iconName,
  fill,
  size,
  buttonType,
  buttonShape,
  onClick,
  color,

}) => {
  
  const iconJSX = <Icon name={iconName} fill={fill} size={size} />;

  return (
    buttonShape === 'circle' ? (
      <SmallButtonCircleStyled buttonType={buttonType} onClick={onClick} color={color}>
        {iconJSX}
      </SmallButtonCircleStyled>
    ) : (
      <SmallButtonSquareStyled buttonType={buttonType} onClick={onClick} color={color}>
        {iconJSX}
      </SmallButtonSquareStyled>
    )
  );
};


export default SmallButton;
