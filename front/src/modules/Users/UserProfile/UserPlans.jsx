import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { planService } from 'services/planService';
import GenericElement from 'components/molecules/GenericElement';

export const UserPlans = ({ id }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    planService
      .userPlans(id)
      .then((data) => {
        setPlans(data);
      })
      .catch((error) => {
      });
  }, [id]);

  return (
    <div>
      {plans.length >= 1 ? plans.map((element, i) => (
        <div key={i.toString()}>
          <Link to={{
            pathname: `/plan/${element.planId}`,
            state: { id: element.planId },
          }}
          >
            <GenericElement key={i.toString()} HeadLine={element.title} SubLine={element.creatorName} plan={element} />
          </Link>
        </div>
      ))
        : <h2>No Plans</h2>}
    </div>
  );
};
