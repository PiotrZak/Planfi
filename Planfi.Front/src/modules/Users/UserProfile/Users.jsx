import React from 'react';
import { RenderType } from 'components/organisms/CheckboxGeneric/DataTypes';
import Search from 'components/molecules/Search';
import { useThemeContext } from 'support/context/ThemeContext';
import { translate } from 'utils/Translation';
import { filterDataByTerm } from '../../../utils/common.util';

export const Users = ({ users }) => {
  const { theme } = useThemeContext();
  const [searchTerm, setSearchTerm] = React.useState('');
  let results = filterDataByTerm(searchTerm, users, ['firstName', 'lastName']);

  return (
    <div>
      <Search placeholder={translate('Find')} callBack={(e) => setSearchTerm(e.target.value)} />
      {users.length >= 1 ? results.map((element, i) => (
        <div key={i.toString()}>
          <RenderType theme={theme} type={'users'} element={element} i={i} />
        </div>
      ))
        : <h2>Not Clients</h2>}
    </div>
  );
};
