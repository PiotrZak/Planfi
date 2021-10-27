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



const Counter = ({defaultValue, resetCounter, setResetCounter, fill, initialValueToChange, handleData, initialUnit }) => {

  const [value, setValue] = useState(defaultValue ? defaultValue : 0);
  const [unit, setUnit] = useState(initialUnit)
  const [valueToChange, setValueToChange] = useState(initialValueToChange)

  console.log('default value', defaultValue)
  console.log('value', value)

  useEffect(() => {

    setValue(defaultValue)

    if(resetCounter){
    if(resetCounter == true){
      setValue(0)
      setResetCounter(false)
    }
  }
  }, [resetCounter, defaultValue]);

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

  //todo - handle on backend proper unit
  const renderUnit = (unit) => {
    if(unit == 's' && value > 60 && unit != 'min'){
      setUnit('min');
      setValue(1);
      setValueToChange(1);
    }
    else if( unit == 's' && value > 3600){
      unit = 'h';
    }
    return unit;
  }

  return (
    <CounterContainer>
      <Icon fill={fill ? fill : null} onClick={decrement} name="minus-circle" />
      <Headline>{value && value} 
      {renderUnit(unit)} 
      </Headline>
      <Icon fill={fill ? fill : null} onClick={increment} name="plus-circle" />
    </CounterContainer>
  );
};

export default Counter;
