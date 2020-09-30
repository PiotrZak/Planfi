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
  width,
  height,
  buttonType,
  buttonShape,

}) => (
  buttonShape === 'circle' ? (
    <SmallButtonCircleStyled buttonType={buttonType}>
      <Icon name={iconName} fill={fill} width={width} height={height} />
    </SmallButtonCircleStyled>
  ) : (
    <SmallButtonSquareStyled buttonType={buttonType}>
      <Icon name={iconName} fill={fill} width={width} height={height} />
    </SmallButtonSquareStyled>
  )
);

SmallButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  buttonType: PropTypes.oneOf(['primary', 'secondary', 'dangerous', 'regular']),
  buttonShape: PropTypes.oneOf(['square', 'circle']),
};

SmallButton.defaultProps = {
  fill: 'white',
  width: '1.5rem',
  height: '1.5rem',
  buttonType: 'primary',
  buttonShape: 'circle',
};

export default SmallButton;
