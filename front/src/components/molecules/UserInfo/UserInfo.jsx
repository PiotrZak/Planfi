import React from 'react';
import { Avatar } from 'components/molecules/Avatar';
import styled from 'styled-components';
import Paragraph from 'components/atoms/Paragraph';

const UserInfoContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const StyledParagraph = styled(Paragraph)`
  margin: 0;

  ${({ notFirst, theme }) => notFirst && `color: ${theme.colorSecondary};`}
`;

// eslint-disable-next-line react/prop-types
export const UserInfo = ({ user }) => {
  const {
    // eslint-disable-next-line react/prop-types
    avatar, userId, firstName, lastName, role, phoneNumber,
  } = user;

  return (
    <UserInfoContainer>
      {user
      && (
        <div>
          <Avatar avatar={avatar} id={userId} />
          <StyledParagraph type="Label-Button">
            {`${firstName} ${lastName}`}
          </StyledParagraph>
          <StyledParagraph type="body-3-regular" notFirst>{role}</StyledParagraph>
          <StyledParagraph type="body-3-regular" notFirst>{phoneNumber}</StyledParagraph>
        </div>
      )}
    </UserInfoContainer>
  );
};
