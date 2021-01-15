import React, { useState, useEffect } from 'react';
import { userService } from 'services/userServices';
import { RenderType } from 'components/organisms/CheckboxGeneric/DataTypes';
import { useThemeContext } from 'support/context/ThemeContext';
import Search from 'components/molecules/Search';
import { translate } from 'utils/Translation';


export const ClientTrainers = ({ id }) => {
  const [trainers, setTrainers] = useState([]);
  const { theme } = useThemeContext();
  const [searchTerm, setSearchTerm] = React.useState('');

  useEffect(() => {
    userService
      .allTrainersByClient(id)
      .then((data) => {
        setTrainers(data);
      })
      .catch((error) => {
      });
  }, [id]);

  const filterTrainers = (event) => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
  ? trainers
  : trainers.filter((trainer) => trainer.firstName.toLowerCase().includes(searchTerm.toLocaleLowerCase()));

  return (
    <div>
      <Search placeholder={translate('Find')} callBack={filterTrainers} />
      {results.length >= 1 ? results.map((element, i) => (
        <div key={i}>
            <RenderType theme={theme} type={'users'} element={element} i={i} />
        </div>
      ))
        : <h2>No trainers!</h2>}
    </div>
  );
};
