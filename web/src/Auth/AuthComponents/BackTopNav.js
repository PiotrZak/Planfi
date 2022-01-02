import React from 'react'
import styled from 'styled-components'
import Paragraph from './Paragraph'
import Icon from './Icon'
import {lightTheme} from '../theme/lightTheme'

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 1rem 0;
  color: ${({ theme }) => lightTheme.colorGray10};

  &:hover {
    cursor: pointer;
  }
`

const BackTopNav = ({ text, history, route }) => {
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

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledParagraph = styled(Paragraph)`
  margin-left: 0.4rem;
  line-height: 0;
`

const ReturnWithTitle = ({ text }) => (
  <Container>
    <Return fill={lightTheme.colorGray100} />
    <StyledParagraph type="Label-Button">{text}</StyledParagraph>
  </Container>
)


const Return = ({ fill }) => <Icon name="arrow-left" fill={fill} />


export default BackTopNav
