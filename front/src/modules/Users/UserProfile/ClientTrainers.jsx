import React, { useState, useEffect } from 'react';
import { userService } from 'services/userServices';
import { RenderType } from 'components/organisms/CheckboxGeneric/DataTypes';
import { useThemeContext } from 'support/context/ThemeContext';

export const ClientTrainers = ({ id }) => {
  const [trainers, setTrainers] = useState([]);
  const { theme } = useThemeContext();

  useEffect(() => {
    userService
      .allTrainersByClient(id)
      .then((data) => {
        setTrainers(data);
      })
      .catch((error) => {
      });
  }, [id]);

  return (
    <div>
      {trainers.length >= 1 ? trainers.map((element, i) => (
        <div key={i}>
            <RenderType theme={theme} type={'users'} element={element} i={i} />
        </div>
      ))
        : <h2>No trainers!</h2>}
    </div>
  );
};
