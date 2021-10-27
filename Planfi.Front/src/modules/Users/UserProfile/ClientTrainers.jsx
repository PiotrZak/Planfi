import React, { useState, useEffect } from 'react';
import { userService } from 'services/userServices';
import { RenderType } from 'components/organisms/CheckboxGeneric/DataTypes';
import { useThemeContext } from 'support/context/ThemeContext';
import Search from 'components/molecules/Search';
import { translate } from 'utils/Translation';
import { filterDataByTerm } from '../../../utils/common.util';

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

    let results = filterDataByTerm(searchTerm, trainers, ['firstName', 'lastName']);
  
  return (
    <div>
      <Search placeholder={translate('Find')} callBack={(e) => setSearchTerm(e.target.value)} />
      {results.length >= 1 ? results.map((element, i) => (
        <div key={i}>
            <RenderType theme={theme} type={'users'} element={element} i={i} />
        </div>
      ))
        : <h2>No trainers!</h2>}
    </div>
  );
};
