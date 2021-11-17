import React from 'react';
import { RenderType } from 'components/organisms/CheckboxGeneric/DataTypes';
import { useThemeContext } from 'support/context/ThemeContext';
import Search from 'components/molecules/Search';
import { translate } from 'utils/Translation';
import { filterDataByTerm } from '../../../utils/common.util';

export const Plans = ({plans}) => {
  const { theme } = useThemeContext();
  const [searchTerm, setSearchTerm] = React.useState('');
  let filteredPlans = filterDataByTerm(searchTerm, plans, ['title']);

  console.log(plans)
  console.log(filteredPlans)

  return (
    <div>
      <Search placeholder={translate('Find')} callBack={(e) => setSearchTerm(e.target.value)} />
      {filteredPlans.length >= 1 ? filteredPlans.map((element, i) => (
        <div key={i.toString()}>
          <RenderType theme={theme} type={'plans'} element={element} i={i} />
        </div>
      ))
        : <h2>No Plans</h2>}
    </div>
  );
};
