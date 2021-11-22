import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Paragraph from 'components/atoms/Paragraph'
import { imageUrl } from 'services/utils'
import { isValidURL } from 'utils/common.util'
import { bytesArrToBase64 } from 'utils/common.util';

const handleTextSize = (size) => {
  if (size === 'sm') {
    return 'body-3-medium'
  }
  if (size === 'md') {
    return 'body-2-medium'
  }
  if (size === 'lg') {
    return 'body-1-medium'
  }
  // defualt return sm
  return 'body-3-medium'
}

const handleAvatarSize = (size) => {
  if (size === 'sm') {
    return `
      height: 3.2rem;
      width: 3.2rem;
    `
  }
  if (size === 'md') {
    return `
      height: 4rem;
      width: 4rem;
    `
  }
  if (size === 'lg') {
    return `
      height: 7.2rem;
      width: 7.2rem;
    `
  }
  return `
      height: 3.2rem;
      width: 3.2rem;
    `
}

const StyledAvatar = styled.img`
  ${({ size }) => handleAvatarSize(size)};
  border-radius: 50%;
  object-fit: cover;
`

const EmptyAvatar = styled.div`
  ${({ size }) => handleAvatarSize(size)};
  border-radius: 50%;
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colorGray40};
  border: 1px solid ${({ theme }) => theme.colorGray50};
`

const StyledParagraph = styled(Paragraph)`
  color: ${({ theme }) => theme.colorPrimary};
`

const Avatar = ({ userId, avatar, firstName, lastName, size }) => {

  if(avatar){
    console.log(avatar)
    console.log(atob(avatar))
    console.log(atob(bytesArrToBase64(avatar)))
  }
  return (
    <>
      {avatar === null ? (
        <EmptyAvatar size={size}>
          <StyledParagraph type={handleTextSize(size)}>
            {firstName.charAt(0).toUpperCase() +
              lastName.charAt(0).toUpperCase()}
          </StyledParagraph>
        </EmptyAvatar>
      ) : (
        <StyledAvatar
          size={size}
          src={
            isValidURL(atob(avatar))
              ? atob(avatar)
              : `${imageUrl}/${userId + atob(avatar)}?authuser=1`
          }
        />
      )}
    </>
  )
}

export default Avatar
