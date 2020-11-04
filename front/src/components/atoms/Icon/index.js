import React from 'react';
import { ReactSVG } from 'react-svg';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSVG = styled(ReactSVG)`
  cursor: pointer;
`;

const Icon = ({
  name, fill, width, height, onClick,
}) => {
  const selectedIcon = `../icons/library/${name}.svg`;
  return (
    <StyledSVG
      src={selectedIcon}
      fill={fill}
      onClick={onClick}
      beforeInjection={(svg) => {
        svg.setAttribute('fill', fill);
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
      }}
    />
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  onClick: PropTypes.func,
};

Icon.defaultProps = {
  width: '1.5rem',
  height: '1.5rem',
  fill: '#222',
};

export default Icon;
