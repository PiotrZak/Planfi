import React, { useState, useEffect } from 'react';
import { userService } from 'services/userServices';
import BackTopNav from 'components/molecules/BackTopNav';
import 'react-multi-carousel/lib/styles.css';
import GlobalTemplate from 'templates/GlobalTemplate';

import { TrainerClients } from './UserProfile/TrainerClients';
import { TrainerPlans } from './UserProfile/TrainerPlans';
import { UserPlans } from './UserProfile/UserPlans';
import { ClientTrainers } from './UserProfile/ClientTrainers';

export const User = (props) => {
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

  return (
    <GlobalTemplate>
      <BackTopNav />
      {/* {user && <UserInfo user={user} />} */}
      {user.role === 'Trainer'
        ? (
          <>
            {activeItem == 'Trainer Clients' && <TrainerClients id={user.userId} />}
            {activeItem == 'Trainer Plans' && <TrainerPlans id={user.userId} />}
          </>
        )
        : (
          <>
            {activeItem == 'User Plans' && <UserPlans id={user.userId} />}
            {activeItem == 'Client Trainers' && <ClientTrainers id={user.userId} />}
          </>
        )}
    </GlobalTemplate>
  );
};

export default User;
