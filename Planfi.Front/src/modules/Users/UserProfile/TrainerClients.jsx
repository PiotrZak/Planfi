import React, { useState, useEffect, useCallback } from 'react';
import { userService } from 'services/userServices';
import { RenderType } from 'components/organisms/CheckboxGeneric/DataTypes';
import { useThemeContext } from 'support/context/ThemeContext';
import Search from 'components/molecules/Search';
import { translate } from 'utils/Translation';
import { filterDataByTerm } from '../../../utils/common.util';
import Loader from 'components/atoms/Loader';

//todo - refactoring

export const TrainerClients = ({ id }) => {

  const [clients, setClients] = useState([]);
  const { theme } = useThemeContext();
  const [searchTerm, setSearchTerm] = React.useState('');

  useEffect(() => {
    userService
      .allClientsByTrainer()
      .then((data) => {
        console.log(data)
        setClients(data);
      })
      .catch((error) => {
      });
  }, [id]);

  let results = filterDataByTerm(searchTerm, clients, ['first_Name', 'last_Name']);

  return (
    <div>
      <Search placeholder={translate('Find')} callBack={(e) => setSearchTerm(e.target.value)} />
      {clients.length >= 1 ? results.map((element, i) => (
        <div key={i.toString()}>
            <RenderType theme={theme} type={'users'} element={element} i={i} />
        </div>
      ))
        : <h2>Not Clients</h2>}
    </div>
  );
};
