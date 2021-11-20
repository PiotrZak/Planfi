import React from 'react'
import styled from 'styled-components'
import ReturnWithTitle from 'components/molecules/ReturnWithTitle'
import { withRouter } from 'react-router-dom'

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 1rem 0;
  color: ${({ theme }) => theme.colorGray10};

  &:hover {
    cursor: pointer;
  }
`

interface IBackTopNav {
  text: any,
  history: any,
  route: any,
}

const BackTopNav = ({ text, history, route }: any) => {
  return (
    <>
      {route ? (
        <Wrapper onClick={() => history.push(route)}>
          <ReturnWithTitle text={text} />
        </Wrapper>
      ) : (
        <Wrapper onClick={() => history.goBack()}>
          <ReturnWithTitle text={text} />
        </Wrapper>
      )}
    </>
  )
}

export default withRouter(BackTopNav)
