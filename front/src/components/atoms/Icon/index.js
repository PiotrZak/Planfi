import React from 'react';
import { ReactSVG } from 'react-svg';
import PropTypes from 'prop-types';

const Icon = ({
  name, fill, width, height,
}) => {
  const selectedIcon = `../icons/library/${name}.svg`;

  return (
    <ReactSVG
      src={selectedIcon}
      fill={fill}
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
  fill: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

Icon.defaultProps = {
  width: '1.5rem',
  height: '1.5rem',
};

export default Icon;
