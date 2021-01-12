import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { planService } from 'services/planService';
import { RenderType } from 'components/organisms/CheckboxGeneric/DataTypes';
import { useThemeContext } from 'support/context/ThemeContext';

export const TrainerPlans = ({ id }) => {
  const { theme } = useThemeContext();
  const [plans, setPlans] = useState([]);
  const history = useHistory();

  useEffect(() => {
    planService
      .getCreatorPlans(id)
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
            <RenderType theme={theme} type={'plans'} element={element} i={i} />        </div>
      ))
        : <h2>No Plans</h2>}
    </div>
  );
};
