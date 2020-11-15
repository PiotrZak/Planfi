import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { mainTheme } from 'theme/mainTheme';

export const GenericMobile = styled.div`
      width:100%;
      height:80px;
      position:initial;
      ${({ active, }) => active && `
        &:after{
        content:'';
        position:absolute;
        border:2px solid ${mainTheme.colorInputActive};
        border-radius:4px;
        opacity:0.7;
        height:7.2rem;
        width:calc(100% - 3.2rem);
        margin-top:-8.2rem;
    }
  `}
`

export function Holdable({onClick, onHold, children, forx }) {

  const [timer, setTimer] = React.useState(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(false)
  }, []);


  function onPointerDown(evt) {
    const event = { ...evt }
    const timeoutId = window.setTimeout(timesup.bind(null, event), 200)
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
    setActive(!active)
  }

  return (
    <GenericMobile
      name ={forx}
      active ={active}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}>
      {children}
    </GenericMobile>
  )
}
