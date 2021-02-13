import React, { useEffect } from 'react';
import styled from 'styled-components';
import { darkTheme } from 'theme/darkTheme';

export const GenericMobile = styled.div`
      width:100%;
      height:80px;
      position:initial;
      ${({ active, }) => active && `
        &:after{
        content:'';
        position:absolute;
        border:2px solid ${darkTheme.colorInputActive};
        border-radius:4px;
        opacity:0.7;
        height:7.2rem;
        width:calc(100% - 3.2rem);
        margin-top:-8.2rem;
    }
  `}
`

export const GenericLightMobile = styled.div`
      width:100%;
      height:80px;
      position:initial;
      ${({ active, }) => active && `
        &:after{
        content:'';
        position:absolute;
        border:2px solid ${darkTheme.colorInputActive};
        border-radius:12px;
        opacity:0.7;
        height:6.5rem;
        width:calc(100% - 3.2rem);
        margin-top:-8.2rem;
        margin-left:1.6rem;
    }
  `}
`

export function Holdable({active, setActive, theme, onClick, onHold, children, forx }) {

  const [timer, setTimer] = React.useState(null)

  useEffect(() => {
    //setActive(false)
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
    theme   ==  'light' ?
    <GenericLightMobile
      name ={forx}
      active ={active}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}>
      {children}
    </GenericLightMobile>
    :
    <GenericMobile
    name ={forx}
    active ={active}
    onPointerDown={onPointerDown}
    onPointerUp={onPointerUp}>
    {children}
  </GenericMobile>
  )
}
