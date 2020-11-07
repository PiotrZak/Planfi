import React, { useEffect, useState, useContext } from 'react';
import styled, { css, withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import Paragraph from 'components/atoms/Paragraph';
import Icon from 'components/atoms/Icon';
import Random from 'utils/Random';
import { useNotificationContext, REMOVE } from '../../../support/context/NotificationContext'
import { ThemeContext } from 'views/Root';
import { mainTheme } from '../../../theme/mainTheme';

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

const Alert = ({ notification }) => {
  const { notificationDispatch } = useNotificationContext();

  //todo! make works with theme context
  // const { theme } = useContext(ThemeContext);

  const timeToRemove = 1000;

  const [theme] = useState(mainTheme)
  console.log(notification)

  useEffect(() => {
    setTimeout(function(){notificationDispatch({ type: REMOVE, payload: { id: notification.id }})} , timeToRemove);
  })

  function renderItem(content) {
    if (typeof content === 'function') {
      return content();
    } else {
      return <pre>{JSON.stringify(content, null, 2)}</pre>;
    }
  }

  return (
    <>
      {notification && notification.map(n => {
        return (
          <Wrapper key={n.id}>
            <LeftContainer>
              <IconWrapper>
                <Icon name="check-circle" fill={handleIconColor(notification.type, theme)} />
              </IconWrapper>
              <StyledParagraph type="body-3-medium">{renderItem(n.content)}</StyledParagraph>
            </LeftContainer>
            <RightContainer>
              <Icon name="Union" width="1.2rem" height="1.2rem" onClick={() => notificationDispatch({ type: REMOVE, payload: { id: n.id } })} />
            </RightContainer>
          </Wrapper>
        );
      })}
    </>
  );
};

export default withTheme(Alert);
