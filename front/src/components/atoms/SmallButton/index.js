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

  //correct 2.3px from top of icon
  ::before{
    content: '';
    margin-top: 0.3rem;
  }

  ${({ buttonType, theme }) => handleButtonType(buttonType, theme)};
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
  iconWidth,
  iconHeight,
  buttonType,
  buttonShape,
  onClick,

}) => (
  buttonShape === 'circle' ? (
    <SmallButtonCircleStyled buttonType={buttonType} onClick={onClick}>
      <Icon name={iconName} fill={fill} width={iconWidth} height={iconHeight} />
    </SmallButtonCircleStyled>
  ) : (
    <SmallButtonSquareStyled buttonType={buttonType} onClick={onClick}>
      <Icon name={iconName} fill={fill} width={iconWidth} height={iconHeight} />
    </SmallButtonSquareStyled>
  )
);

SmallButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  fill: PropTypes.string,
  iconWidth: PropTypes.string,
  iconHeight: PropTypes.string,
  buttonType: PropTypes.oneOf(['primary', 'secondary', 'dangerous', 'regular']),
  buttonShape: PropTypes.oneOf(['square', 'circle']),
};

SmallButton.defaultProps = {
  fill: 'white',
  iconWidth: '1.5rem',
  iconHeight: '1.5rem',
  buttonType: 'primary',
  buttonShape: 'circle',
};

export default SmallButton;
