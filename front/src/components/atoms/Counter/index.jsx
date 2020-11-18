import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from 'components/atoms/Icon';

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
      <Icon onClick={increment} name="plus-circle" size="1rem" />
      <h2>{value}</h2>
      <Icon onClick={increment} name="minus-circle" size="1rem" />
    </Container>
  );
};

export default Counter;
