import React, { useState, useEffect } from 'react';
import { planService } from 'services/planService';
import { RenderType } from 'components/organisms/CheckboxGeneric/DataTypes';
import { useThemeContext } from 'support/context/ThemeContext';

export const UserPlans = ({ id }) => {
  const [plans, setPlans] = useState([]);
  const { theme } = useThemeContext();

  useEffect(() => {
    planService
      .userPlans(id)
      .then((data) => {
        setPlans(data);
      })
      .catch((error) => {
      });
  }, [id]);

  console.log(plans)

  return (
    <div>
      {plans.length >= 1 ? plans.map((element, i) => (
        <div key={i.toString()}>
            <RenderType theme={theme} type={'plans'} element={element} i={i} />
        </div>
      ))
        : <h2>No Plans</h2>}
    </div>
  );
};
