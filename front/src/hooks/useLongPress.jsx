import React, { useState, useEffect } from 'react';

export function Holdable({id, onClick, onHold, children, forx}) {

    const [timer, setTimer] = React.useState(null)
    const [className, setClassName] = useState(false)
    
    function onPointerDown(evt) {
      const event = { ...evt }
      const timeoutId = window.setTimeout(timesup.bind(null, event), 500)
      setTimer(timeoutId)
    }
    
    function onPointerUp(evt) {
      if (timer) {
        window.clearTimeout(timer)
        setTimer(null)
        onClick(evt)
      }
    }
    
    function timesup(evt) {
      setTimer(null)
      onHold(evt)
      setClassName(!className)
    }
    
    return (
      <label
        for = {forx}
        className={`checkbox-label ${
            className &&
            ' active'
            }`}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        id={id}
      >
        {children}
      </label>
    )
  }
