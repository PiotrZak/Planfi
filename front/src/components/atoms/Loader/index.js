import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const handleLoaderType = (type, color) => {
  switch (type) {
    case 'spinner':
      return <Spinner color={color} />;
    case 'dots':
      return <Dots color={color} />;
    default:
      return <Spinner color={color} />;
  }
};

const handleColor = (theme, color) => {
  switch (color) {
    case 'primary':
      return theme.colorPrimaryDefault;
    case 'gray110':
      return theme.colorGray110;
    default:
      return theme.colorPrimaryDefault;
  }
};

const Spinner = styled.div`
  border: .5rem solid transparent;
  border-top: .5rem solid ${({ theme, color }) => handleColor(theme, color)};
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation: spin 2s linear infinite;

  //animation
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Dots = styled.div`
  position: relative;
  top: -1rem;
  width: 1rem;
  height: 1rem;
  border-radius: .5rem;
  background-color: ${({ theme, color }) => handleColor(theme, color)};
  color: ${({ theme, color }) => handleColor(theme, color)};
  transform-origin: .5rem 1.5rem;
  -webkit-animation: dot-windmill 2s infinite linear;
  animation: dot-windmill 2s infinite linear;

  ::before, ::after {
    content: '';
    display: inline-block;
    position: absolute;
  }

  ::before {
    left: -.866rem;
    top: 1.5rem;
    width: 1rem;
    height: 1rem;
    border-radius: .5rem;
    background-color: ${({ theme, color }) => handleColor(theme, color)};
    color: ${({ theme, color }) => handleColor(theme, color)};
  }

  ::after {
    left: .866rem;
    top: 1.5rem;
    width: 1rem;
    height: 1rem;
    border-radius: .5rem;
    background-color: ${({ theme, color }) => handleColor(theme, color)};
    color: ${({ theme, color }) => handleColor(theme, color)};
  }

  @-webkit-keyframes dot-windmill {
    0% {
      transform: rotateZ(0deg) translate3d(0, 0, 0);
    }
    100% {
      transform: rotateZ(720deg) translate3d(0, 0, 0);
    }
  }

  @keyframes dot-windmill {
    0% {
      transform: rotateZ(0deg) translate3d(0, 0, 0);
    }
    100% {
      transform: rotateZ(720deg) translate3d(0, 0, 0);
    }
  }
`;

const Loader = ({
  children, type, color, isLoading,
}) => {
  const returnLoader = handleLoaderType(type, color);
  return (
    <>
      {isLoading ? returnLoader : <>{children}</>}
    </>
  );
};

Loader.propTypes = {
  type: PropTypes.oneOf(['spinner', 'dots']).isRequired,
  color: PropTypes.oneOf(['primary', 'gray110']).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
