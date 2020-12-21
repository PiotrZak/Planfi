import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from 'services/userServices';
import GenericElement from 'components/molecules/GenericElement';

export const TrainerClients = ({ id }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    userService
      .allClientsByTrainer(id)
      .then((data) => {
        setClients(data);
      })
      .catch((error) => {
      });
  }, [id]);

  return (
    <div>
      {clients.length >= 1 ? clients.map((element, i) => (
        <div key={i.toString()}>
          <Link to={{
            pathname: `/user/${element.userId}`,
            state: { id: element.userId },
          }}
          >
            <GenericElement circle image={element.avatar} key={i.toString()} HeadLine={`${element.firstName}  ${element.lastName}`} user={element} SubLine={element.role} />
          </Link>
        </div>
      ))
        : <h2>Not Clients</h2>}
    </div>
  );
};
