import React from 'react';
import { ReactSVG } from 'react-svg';

export const Icon = ({
  name, text, fill, width, height,
}) => {
  const selectedIcon = `../icons/library/${name}.svg`;

  return (
    <ReactSVG
      src={selectedIcon}
      fill={fill}
      beforeInjection={(svg) => {
        fill && svg.setAttribute('fill', fill);
        svg.setAttribute('width', width || '38px');
        svg.setAttribute('height', height || '38px;');
      }}
    />
  );
};
export default Icon;
