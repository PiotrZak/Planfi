import React, { useState, useEffect } from 'react';
import { userService } from 'services/userServices';
import { RenderType } from 'components/organisms/CheckboxGeneric/DataTypes';

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
            <RenderType theme={theme} type={'users'} element={element} i={i} />
        </div>
      ))
        : <h2>Not Clients</h2>}
    </div>
  );
};
