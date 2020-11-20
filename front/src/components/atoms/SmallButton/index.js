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
  font-weight: bold;

  outline: none;
  border: none;

  color: ${({ theme }) => theme.colorWhite};

  //center icon
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ buttonType, theme }) => handleButtonType(buttonType, theme)};

  ${({ buttonShape }) => buttonShape === 'circle' && 'border-radius: 50%;'
    || buttonShape === 'square' && 'border-radius: 2px;'
    || 'border-radius: 50%;'
};
`;

const SmallButton = ({
  iconName,
  iconColor,
  iconSize,
  buttonType,
  buttonShape,
  onClick,
}) => (
  <SmallButtonStyled buttonType={buttonType} buttonShape={buttonShape} onClick={onClick}>
    <Icon name={iconName} color={iconColor} size={iconSize} cursorType="pointer" />
  </SmallButtonStyled>
);

SmallButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  iconSize: PropTypes.string,
  buttonType: PropTypes.oneOf(['primary', 'secondary', 'dangerous', 'regular']),
  buttonShape: PropTypes.oneOf(['square', 'circle']),
};

SmallButton.defaultProps = {
  iconColor: 'white',
  iconSize: '1.5rem',
  buttonType: 'primary',
  buttonShape: 'circle',
};

export default SmallButton;
