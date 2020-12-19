import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import Paragraph from 'components/atoms/Paragraph';
import Icon from 'components/atoms/Icon';
import { useNotificationContext, REMOVE } from 'support/context/NotificationContext';
import { darkTheme } from 'theme/darkTheme';

const handleAlertType = (type, theme) => {
  switch (type) {
    case 'positive':
      return css`${theme.colorSuccessLight}`;
    case 'neutral':
      return css` ${theme.colorSuccessLight}`;
    case 'error':
      return css` ${theme.colorErrorLight}`;
    case 'warning':
      return css`${theme.colorWarningLight}`;
    default:
      return css` ${theme.colorSuccessLight}`;
  }
};

const handleIconType = (type) => {
  switch (type) {
    case 'positive':
      return 'check-circle';
    case 'warning':
      return 'circle';
    case 'error':
      return 'exclamation-triangle';
    default:
      return 'check-circle';
  }
};

const handleIconColor = (type, theme) => {
  switch (type) {
    case 'positive':
      return theme.colorSuccessDefault;
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
  position: absolute;
  top: 0;
  width:100%;
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

const Alert = ({ notification }) => {
  const { notificationDispatch } = useNotificationContext();

  // todo - take context from global
  const theme = darkTheme;
  const timeToRemove = 15000;

  useEffect(() => {
    if (notification.length > 0) {
      setTimeout(() => { notificationDispatch({ type: REMOVE, payload: { id: notification[0].id } }); }, timeToRemove);
    }
  });

  return (
    <>
      {notification && notification.map((n) => (
        <Wrapper type={n.type} theme={theme} key={n.id}>
          <LeftContainer>
            <IconWrapper>
              <Icon name={handleIconType(n.type)} fill={handleIconColor(n.type, theme)} />
            </IconWrapper>
            <StyledParagraph type="body-3-medium">{JSON.stringify(n.content.message)}</StyledParagraph>
          </LeftContainer>
          <RightContainer>
            <Icon name="union" size="1.2rem" onClick={() => notificationDispatch({ type: REMOVE, payload: { id: n.id } })} cursorType="pointer" />
          </RightContainer>
        </Wrapper>
      ))}
    </>
  );
};

export default Alert;
