import React, { useState } from 'react';
import styled from 'styled-components';
import SvgPlusCircle from 'assets/iconComponents/PlusCircle';
import SvgMinusCircle from 'assets/iconComponents/MinusCircle';

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

  const Container = styled.div`
    display: flex;
    justify-content: space-around;

  `;

  return (
    <Container>
      <SvgPlusCircle onClick={increment} name="plus-circle" width="1rem" height="1rem" />
      <h2>{value}</h2>
      <SvgMinusCircle onClick={decrement} name="minus-circle" width="1rem" height="1rem" />
    </Container>
  );
};

export default Counter;
