import React, { useState, useEffect } from 'react';
import { userService } from 'services/userServices';
import styled from 'styled-components';
import 'react-multi-carousel/lib/styles.css';
import { UserInfo } from 'components/molecules/UserInfo/UserInfo';
import GlobalTemplate from '../../templates/GlobalTemplate';

export const User = (props) => {
  const currentUser = JSON.parse((localStorage.getItem('user')));
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeItem, setActiveItem] = useState('TrainerClients');
  useEffect(() => {
    getUserById();
  }, []);

  const { match } = props;
  const id = match.params;

  const getUserById = () => {
    userService
      .getUserById(id.id)
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
      });
  };

  let sections = [];

  if (user.role === 'Trainer') {
    sections = ['Trainer Clients', 'Trainer Plans'];
  } else {
    sections = ['User Plans', 'Client Trainers'];
  }

  return (
    <GlobalTemplate>
      {user && <UserInfo user={user} />}
    </GlobalTemplate>
  );
};

export default User;
