import React, { useState } from 'react';
import Icon from 'components/atoms/Icon';
import styled from 'styled-components';
import { Headline } from 'components/typography';

const CounterContainer = styled.div`
  align-items:baseline;
  display:flex;
  img{
    width:72px;
    height:72px;
  }
  h4{
    text-align:center;
    width:200px;
    font-size:1.6rem;
  }
`;

const Counter = ({ valueToChange, defaultValue, handleData, unit }) => {
  const [value, setValue] = useState(defaultValue || 0);

  const increment = () => {
    setValue(value + valueToChange);
    handleData(value);
  };

  const decrement = () => {
    if (value > 0) {
      setValue(value - valueToChange);
      handleData(value);
    }
  };

  return (
    <CounterContainer>
      <Icon onClick={increment} name="plus-circle" />
      <Headline>{value} {unit}</Headline>
      <Icon onClick={decrement} name="minus-circle" />
    </CounterContainer>
  );
};

export default Counter;
