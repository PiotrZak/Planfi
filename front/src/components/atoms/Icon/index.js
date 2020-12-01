import React from 'react';
import { ReactSVG } from 'react-svg';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconsCode = {
  'ellipsis-h': 'e900',
  'angle-down': 'e90d',
  'angle-up': 'e90e',
  'arrow-circle-right': 'e90f',
  'arrow-left': 'e910',
  'arrow-right': 'e911',
  check: 'e912',
  'check-circle': 'e913',
  'clipboard-notes': 'e914',
  draggabledots: 'e915',
  dumbbell: 'e916',
  'exclamation-triangle': 'e901',
  heart: 'e902',
  'image-plus': 'e903',
  'list-ul': 'e904',
  'minus-circle': 'e905',
  paperclip: 'e906',
  plus: 'e907',
  'plus-circle': 'e908',
  'question-circle': 'e909',
  search: 'e90a',
  union: 'e90b',
  'user-circle': 'e90c',
  circle: 'e917',
};

const FontIcon = styled.span`
  font-family: 'icomoon', sans-serif;
  font-size: ${({ size }) => size};
  color: ${({ color }) => color};
  cursor: ${({ cursorType }) => cursorType};
`;

const Icon = ({
  name, fill, width, height, onClick, cursorType,
}) => {
  const selectedIcon = `../icons/library/${name}.svg`;
  return (
    <ReactSVG
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
  name: PropTypes.oneOf([
    'ellipsis-h', 'angle-down', 'angle-up', 'arrow-circle-right', 'arrow-left',
    'arrow-right', 'check', 'check-circle', 'clipboard-notes', 'draggabledots',
    'dumbbell', 'exclamation-triangle', 'heart', 'image-plus',
    'list-ul', 'minus-circle', 'paperclip', 'plus', 'plus-circle',
    'question-circle', 'search', 'union', 'user-circle',
    'circle',
  ]).isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  cursorType: PropTypes.string,
};

Icon.defaultProps = {
  width: '1.5rem',
  height: '1.5rem',
  fill: '#222',
  cursorType: 'pointer',
};

export default Icon;
