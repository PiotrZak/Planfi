import React, { useEffect, useState } from 'react';
import styled, { css, withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import Paragraph from 'components/atoms/Paragraph';
import Icon from 'components/atoms/Icon';
import Random from 'utils/Random';

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

const Alert = ({
  type, message, autoRemove, time, theme,
}) => {
  const [alert, setAlert] = useState([]);
  const [ID] = useState(Random(1, 999999999));

  const setAlertData = () => ({
    timeCreated: new Date().getTime(),
    timeToRemove: time,
    ID,
  });

  useEffect(() => {
    if (autoRemove) {
      if (alert.length === 0) {
        setTimeout(() => {
          setAlert(setAlertData);
        }, 100);
      }
    }

    const alertAutoRemoverTimer = setInterval(() => {
      const currentTime = new Date().getTime();

      if (alert.timeCreated + alert.timeToRemove < currentTime) {
        try{
          document.getElementById(alert.ID).remove();
        } catch {
          window.clearInterval(alertAutoRemoverTimer)
        }
      }
    }, (100));
  });

  const close = (e) => {
    e.target.parentNode.parentNode.parentNode.parentNode.remove();
  };

  return (
    <Wrapper type={type} id={ID}>
      <LeftContainer>
        <IconWrapper>
          <Icon name="check-circle" fill={handleIconColor(type, theme)} />
        </IconWrapper>
        <StyledParagraph type="body-3-medium">{message}</StyledParagraph>
      </LeftContainer>
      <RightContainer>
        <Icon name="Union" width="1.2rem" height="1.2rem" onClick={(e) => close(e)} />
      </RightContainer>
    </Wrapper>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['error', 'warning', 'neutral']).isRequired,
  message: PropTypes.string.isRequired,
  autoRemove: PropTypes.bool,
  time: PropTypes.number,
};

Alert.defaultProps = {
  autoRemove: false,
  time: 3000,
};

export default withTheme(Alert);
