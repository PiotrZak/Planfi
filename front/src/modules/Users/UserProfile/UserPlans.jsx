import React, { useState, useEffect } from 'react';
import { planService } from 'services/planService';
import { RenderType } from 'components/organisms/CheckboxGeneric/DataTypes';
import { useThemeContext } from 'support/context/ThemeContext';
import Search from 'components/molecules/Search';
import { translate } from 'utils/Translation';

export const UserPlans = ({ id }) => {
  const [plans, setPlans] = useState([]);
  const { theme } = useThemeContext();
  const [searchTerm, setSearchTerm] = React.useState('');

  useEffect(() => {
    planService
      .userPlans(id)
      .then((data) => {
        setPlans(data);
      })
      .catch((error) => {
      });
  }, [id]);

  const filterPlans = (event) => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
  ? plans
  : plans.filter((plan) => plan.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
  
    return (
      <div>
        <Search placeholder={translate('Find')} callBack={filterPlans} />
      {plans.length >= 1 ? plans.map((element, i) => (
        <div key={i.toString()}>
            <RenderType theme={theme} type={'plans'} element={element} i={i} />
        </div>
      ))
        : <h2>No Plans</h2>}
    </div>
  );
};
