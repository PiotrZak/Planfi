import React, { useState } from 'react';
import Icon from "./Icon"

const Counter = ({ handleData }) => {

    const [value, setValue] = useState(0);
    const increment = () => {
        setValue(value + 1)
        handleData(value)
    }

    const decrement = () => {
        if (value > 0) {
            setValue(value - 1)
            handleData(value)
        }
    }

    return (
        <div className="counter">
            <div onClick={increment}><Icon name={"plus-circle"} /></div>
            <h2>{value}</h2>
            <div onClick={decrement}><Icon name={"minus-circle"} /></div>
        </div>
    )
};

export default Counter;