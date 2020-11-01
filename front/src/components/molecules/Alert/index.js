import React from 'react';
import styled, { css, withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import Paragraph from 'components/atoms/Paragraph';
import Icon from 'components/atoms/Icon';

const handleAlertType = (type, theme) => {
  switch (type) {
    case 'neutral':
      return css` ${theme.colorSuccessLight}`;
    case 'error':
      return css` ${theme.colorErrorLight}`;
    case 'warning':
      return css`${theme.colorWarningLight}`;
    default:
      return css`${theme.colorSuccessLight}`;
  }
};

const handleIconColor = (type, theme) => {
  switch (type) {
    case 'neutral':
      return theme.colorSuccessDefault;
    case 'error':
      return theme.colorErrorDefault;
    case 'warning':
      return theme.colorWarningDark;
    default:
      return theme.colorSuccessDefault;
  }
};

const Wrapper = styled.div`
  min-width: 28.3rem;
  padding-left: 1.8rem;
  padding-right: 2.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  background: ${({ type, theme }) => handleAlertType(type, theme)};
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  line-height: 2.3rem;
`;

const RightContainer = styled.div``;

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

const StyledParagraph = styled(Paragraph)`
  margin-left: 1.8rem;
`;

const Alert = ({ type, message, theme }) => (
  <Wrapper type={type}>
    <LeftContainer>
      <IconWrapper>
        <Icon name="check-circle" fill={handleIconColor(type, theme)} />
      </IconWrapper>
      <StyledParagraph type="body-3-medium">{message}</StyledParagraph>
    </LeftContainer>
    <RightContainer>
      <Icon name="union" width="1.2rem" height="1.2rem" />
    </RightContainer>
  </Wrapper>
);

Alert.propTypes = {
  type: PropTypes.oneOf(['error', 'warning', 'neutral']).isRequired,
  message: PropTypes.string.isRequired,
};

export default withTheme(Alert);
