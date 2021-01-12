import React, { useState, useEffect } from 'react';
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

const Counter = ({ fill, valueToChange, defaultValue, handleData, unit }) => {

  const [value, setValue] = useState();

  useEffect(() => {
      setValue(defaultValue);
      if(value){
      setValue(value);
      }
  }, [defaultValue, value]);

  const increment = () => {
    setValue(value + valueToChange);
    handleData(value + valueToChange);
  };

  const decrement = () => {
    if (value > 0) {
      setValue(value - valueToChange);
      handleData(value - valueToChange);
    }
  };

  return (
    <CounterContainer>
      <Icon fill={fill ? fill : null} onClick={increment} name="plus-circle" />
      <Headline>{value} {unit}</Headline>
      <Icon fill={fill ? fill : null} onClick={decrement} name="minus-circle" />
    </CounterContainer>
  );
};

export default Counter;
