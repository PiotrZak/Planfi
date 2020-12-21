import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from 'services/userServices';
import GenericElement from 'components/molecules/GenericElement';

export const ClientTrainers = ({ id }) => {
  const [trainers, setTrainers] = useState([]);

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
          <Link to={{
            pathname: `/user/${element.trainerId}`,
            state: { id: element.trainerId },
          }}
          >
            <GenericElement circle image={element.avatar} key={i.toString()} HeadLine={`${element.firstName}  ${element.lastName}`} user={element} SubLine={element.role} />
          </Link>
        </div>
      ))
        : <h2>No trainers!</h2>}
    </div>
  );
};
