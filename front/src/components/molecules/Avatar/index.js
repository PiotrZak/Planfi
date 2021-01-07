import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Paragraph from 'components/atoms/Paragraph';

const handleTextSize = (size) => {
  if (size === 'sm') {
    return 'body-3-medium';
  } if (size === 'md') {
    return 'body-2-medium';
  } if (size === 'lg') {
    return 'body-1-medium';
  }
  // defualt return sm
  return 'body-3-medium';
};

const handleAvatarSize = (size) => {
  if (size === 'sm') {
    return `
      height: 3.2rem;
      width: 3.2rem;
    `;
  } if (size === 'md') {
    return `
      height: 4rem;
      width: 4rem;
    `;
  } if (size === 'lg') {
    return `
      height: 7.2rem;
      width: 7.2rem;
    `;
  }
  // defualt return sm
  return `
      height: 3.2rem;
      width: 3.2rem;
    `;
};

const StyledAvatar = styled.img`
  ${({ size }) => handleAvatarSize(size)};
  border-radius: 50%;
  object-fit: cover;
`;

const EmptyAvatar = styled.div`
  ${({ size }) => handleAvatarSize(size)};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colorGray40};
  border: 1px solid ${({ theme }) => theme.colorGray50};
`;

const StyledParagraph = styled(Paragraph)`
  color: ${({ theme }) => theme.colorPrimary};
`;

const renderAvatar = (user, size) => {
  const { avatar, firstName, lastName } = user;
  console.log(avatar);

  if (avatar === null) {
    const initials = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
    return (
      <EmptyAvatar size={size}>
        <StyledParagraph type={handleTextSize(size)}>{initials}</StyledParagraph>
      </EmptyAvatar>
    );
  }
  return <StyledAvatar src={`data:image/jpeg;base64,${avatar}`} size={size} />;
};

const Avatar = ({ user, size }) => <>{renderAvatar(user, size)}</>;

Avatar.propTypes = {
  user: PropTypes.object.isRequired,
  size: PropTypes.oneOf(['sm, md, lg']),

};

Avatar.propTypes = {
  size: 'sm',
};

export default Avatar;
