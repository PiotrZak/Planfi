import React from 'react';
import { Col, Row, Input } from 'reactstrap';
import { Label } from './Label';
import { ValidationHint } from './ValidationHint';

export const FormInput = ({
  name,
  label,
  id,
  maxLength,
  max,
  min,
  defaultValue,
  checked,
  required,
  hasError,
  type,
  value,
  placeholder,
  disabled,
  labelWidth,
  inputWidth,
  className,
  onClick,
  onChange,
  onBlur,
  onKeyUp,
  onKeyDown,
}) => (
  <>
    <Label label={label} required={required} hasError={hasError} />
    <Input
      invalid={!!hasError}
      id={id}
      name={name}
      max={max}
      placeholder={placeholder}
      min={min}
      maxLength={maxLength}
      type={type || 'text'}
      className={hasError ? 'input-error' : ''}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      onClick={onClick}
      value={value}
      onBlur={onBlur}
      defaultValue={defaultValue}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
    />
    <ValidationHint hasError={hasError} />
  </>
);
