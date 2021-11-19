import React from 'react';
import { RenderType } from 'components/organisms/CheckboxGeneric/DataTypes';
import Search from 'components/molecules/Search';
import { useThemeContext } from 'support/context/ThemeContext';
import { translate } from 'utils/Translation';
import { filterDataByTerm } from '../../../utils/common.util';
import { UserSqlProjection } from 'Types/PlanfiApi/Models/ViewModels/UserSqlProjection';

interface IUsers {
  users: UserSqlProjection[];
}

export const Users = ({ users }: IUsers) => {
  const { theme } = useThemeContext();
  const [searchTerm, setSearchTerm] = React.useState('');
  let filteredUsers = filterDataByTerm(searchTerm, users, ['firstName', 'lastName']);

  return (
    <div>
      <Search placeholder={translate('Find')} callBack={(e) => setSearchTerm(e.target.value)} typeInput={undefined} />
      {users ? filteredUsers.map((element: any, i: { toString: () => React.Key; }) => (
        <div key={i.toString()}>
          <RenderType theme={theme} type={'users'} element={element} i={i} interaction={undefined} />
        </div>
      ))
        : <h2>Not Clients</h2>}
    </div>
  );
};
