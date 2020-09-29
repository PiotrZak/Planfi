import React  from 'react';
import {Icon} from "../Icon"

export const Button = ({
    id,
    className,
    icon,
    disabled,
    color,
    name,
    type,
    onClick,
  }) => {

      return (
        <button
          className = {className}
          onClick={onClick}
          color={color}
          disabled={disabled}
          id={id}
          type={type}
        >
        {icon && <Icon/>}
          {name}
        </button>
      );
    }