import React from 'react';
import {Avatar} from "../molecules/Avatar"
import styled from 'styled-components';


const UserInfoContainer = styled.div`
    margin-top: .4rem;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align:center;
    h2{
      margin:0;
      padding:0;
    }
    p{
      margin:0;
      padding:0;
    }
`;

export const UserInfo = ({user}) => (
  <UserInfoContainer>
    {user &&
    <div>
      <Avatar avatar={user.avatar} id={user.userId}/>
      <h2>{user.firstName} {user.lastName}</h2>
      <p>{user.role}</p>
      <p>{user.phoneNumber}</p>
      <p>{user.email}</p>
    </div>
    }
  </UserInfoContainer>
)