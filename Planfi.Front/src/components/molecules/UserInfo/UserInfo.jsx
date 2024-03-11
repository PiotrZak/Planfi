import React from 'react'
import Avatar from 'components/molecules/Avatar'
import styled from 'styled-components'
import Paragraph from 'components/atoms/Paragraph'

const UserInfoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const Container = styled.div``

const StyledParagraph = styled(Paragraph)`
  margin: 0;
  ${({ notFirst, theme }) => notFirst && `color: ${theme.colorSecondary};`}
`

// eslint-disable-next-line react/prop-types
export const UserInfo = ({ user }) => {
  const {
    // eslint-disable-next-line react/prop-types
    firstName,
    lastName,
    roleName,
    phoneNumber,
  } = user

  return (
    <UserInfoContainer>
      <Container>
        <Avatar
          userId = {user.userId}
          avatar={user.avatar}
          firstName={user.firstName}
          lastName={user.lastName}
          size="lg"
        />
        <StyledParagraph type="Label-Button">
          {`${firstName} ${lastName}`}
        </StyledParagraph>
        <StyledParagraph type="body-3-regular" notFirst>
          {roleName}
        </StyledParagraph>
        <StyledParagraph type="body-3-regular" notFirst>
          {phoneNumber}
        </StyledParagraph>
      </Container>
    </UserInfoContainer>
  )
}
