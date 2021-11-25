import React from 'react'
import Menu from 'components/organisms/Menu'
import { routes } from 'utils/routes'
import styled from 'styled-components'

const Wrapper = styled.div`
  overflow-y: scroll;
`

const MenuTemplate = ({ children }: any) => {

  const notVisibleUrls = [routes.addExercise, routes.editExercise]
  //@ts-ignore
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const currentUrl = window.location.href

  return (
    <Wrapper id="scroll">
      {currentUser && !notVisibleUrls.some(el => currentUrl.includes(el)) && <Menu />}
      <div>{children}</div>
    </Wrapper>
  )
}



export default MenuTemplate
