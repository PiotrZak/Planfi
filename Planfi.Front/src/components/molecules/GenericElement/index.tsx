import React from 'react';
import styled, { css } from 'styled-components';
import Paragraph from 'components/atoms/Paragraph';
import Icon from 'components/atoms/Icon';
import Avatar from '../Avatar';
import { bytesArrToBase64 } from 'utils/common.util';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colorGray80};
  min-height: 72px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  padding: 1.2rem 1.6rem;
  cursor: pointer;
`

const Container = styled.div`
  display: flex;
`

const ContainerMenu = styled.div`
  display: flex;
  align-items: center;
`

const Headline = styled.p`
margin:0;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2rem;
`

const Subline = styled.p`
margin:0;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 2.1rem;
`


const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.8rem;
  justify-content: center;
`
const Circle = styled.div`
  background: ${({ theme }) => theme.colorGray70};
  border-radius: 50%;
  width: 3.2rem;
  height: 3.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    background: ${({ theme }) => theme.colorDisabled};
  }
`

interface IGenericElement {
  headline: string;
  subline: string;
  avatarType: any;
  avatarUrl: string;
  onMenuClick: any;
  version: any
  user: any
}

const GenericElement = ({
  headline,
  subline,
  avatarType,
  avatarUrl,
  onMenuClick,
  version,
  user,
  ...rest
}: IGenericElement) => {

  return (
    <>
      <Wrapper {...rest}>
        <Container>
          {user && <Avatar
            userId={user.user_Id}
            avatar={user.avatar && typeof (user.avatar) === 'object'
              ? bytesArrToBase64(user.avatar) 
              : user.avatar}
            firstName={user.first_Name}
            lastName={user.last_Name}
            size="md"
          />}
          <ContainerText>
            <Headline>{headline}</Headline>
            <Subline>{subline != undefined && subline}</Subline>
          </ContainerText>
        </Container>
        <ContainerMenu>
          <Circle onClick={onMenuClick}>
            <Icon name="arrow-right" size="2rem" fill={undefined} cursorType={undefined} />
          </Circle>
        </ContainerMenu>
      </Wrapper>
    </>
  )
}

export default GenericElement
