import React, { useState } from 'react';
import { Col, Row, Input } from 'reactstrap';
import Icon from './Icon';

const Counter = ({ defaultValue, handleData }) => {
  const [value, setValue] = useState(defaultValue || 0);
  const increment = () => {
    setValue(value + 1);
    handleData(value);
  };

  const decrement = () => {
    if (value > 0) {
      setValue(value - 1);
      handleData(value);
    }
  };

  return (
    <div className="counter">
      <div onClick={increment}><Icon name="plus-circle" /></div>
      <h2>{value}</h2>
      <div onClick={decrement}><Icon name="minus-circle" /></div>
    </div>
  );
};

export default Counter;
