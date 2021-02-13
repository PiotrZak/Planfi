import React, { useState, useEffect, useMemo } from 'react';
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

export const Holdable = ({isActive, theme, onClick, onHold, children, forx }) => {

  const [timer, setTimer] = useState(null)

  console.log(isActive)

  const  onPointerDown =(evt) => {
    const event = { ...evt }
    const timeoutId = window.setTimeout(timesup.bind(null, event), 200)
    setTimer(timeoutId)
  }

  const onPointerUp =(evt) => {
    if (timer) {
      window.clearTimeout(timer)
      setTimer(null)
      onClick(evt)
    }
  }

  const timesup = (evt) => {
    setTimer(null)
    onHold(evt)
    isActive = !isActive
  }

  return useMemo(() => (
    theme   ==  'light' ?
    <GenericLightMobile
      name ={forx}
      active ={isActive}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}>
      {children}
    </GenericLightMobile>
    :
    <GenericMobile
    name ={forx}
    active ={isActive}
    onPointerDown={onPointerDown}
    onPointerUp={onPointerUp}>
    {children}
  </GenericMobile>
  ))
}
