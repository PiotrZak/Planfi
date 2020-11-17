import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const returnIconCode = (iconCode) => css`
   :before{
       content: "\\${iconCode}";
    }
`;

const handleIconName = (name) => {
  switch (name) {
    case 'ellipsis-h':
      return returnIconCode('e900');
    case 'angle-down':
      return returnIconCode('e90d');
    case 'angle-up':
      return returnIconCode('e90e');
    case 'arrow-circle-right':
      return returnIconCode('e90f');
    case 'arrow-left':
      return returnIconCode('e910');
    case 'arrow-right':
      return returnIconCode('e911');
    case 'check':
      return returnIconCode('e912');
    case 'check-circle':
      return returnIconCode('e913');
    case 'clipboard-notes':
      return returnIconCode('e914');
    case 'draggabledots':
      return returnIconCode('e915');
    case 'dumbbell':
      return returnIconCode('e916');
    case 'exclamation-triangle':
      return returnIconCode('e901');
    case 'heart':
      return returnIconCode('e902');
    case 'image-plus':
      return returnIconCode('e903');
    case 'list-ul':
      return returnIconCode('e904');
    case 'minus-circle':
      return returnIconCode('e905');
    case 'paperclip':
      return returnIconCode('e906');
    case 'plus':
      return returnIconCode('e907');
    case 'plus-circle':
      return returnIconCode('e908');
    case 'question-circle':
      return returnIconCode('e909');
    case 'search':
      return returnIconCode('e90a');
    case 'union':
      return returnIconCode('e90b');
    case 'user-circle':
      return returnIconCode('e90c');
  }
};

const FontIcon = styled.span`
  font-family: 'icomoon', sans-serif;

  font-size: ${({ size }) => size};
  color: ${({ color }) => color};
  cursor: ${({ cursorType }) => cursorType};

  ${({ name }) => handleIconName(name)}
`;

const Icon = ({
  size, color, name, cursorType, ...rest
}) => <FontIcon name={name} size={size} color={color} cursorType={cursorType} {...rest} />;

Icon.propTypes = {
  name: PropTypes.oneOf([
    'ellipsis-h', 'angle-down', 'angle-up', 'arrow-circle-right', 'arrow-left',
    'arrow-right', 'check', 'check-circle', 'clipboard-notes', 'draggabledots',
    'dumbbell', 'exclamation-triangle', 'heart', 'image-plus',
    'list-ul', 'minus-circle', 'paperclip', 'plus', 'plus-circle',
    'question-circle', 'search', 'union', 'user-circle',
  ]).isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  cursorType: PropTypes.string,
};

Icon.defaultProps = {
  size: '1rem',
  color: 'red',
  cursorType: 'default',
};

export default Icon;
