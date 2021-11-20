import React from 'react';
import { RenderType } from 'components/organisms/CheckboxGeneric/DataTypes';
import { useThemeContext } from 'support/context/ThemeContext';
import Search from 'components/molecules/Search';
import { translate } from 'utils/Translation';
import { filterDataByTerm } from '../../../utils/common.util';
import { ResultPlan } from 'Types/PlanfiApi/Models/ViewModels/ResultPlan';

interface IPlans {
  plans: ResultPlan[];
}

export const Plans = ({ plans }: IPlans) => {
  const { theme } = useThemeContext();
  const [searchTerm, setSearchTerm] = React.useState('');
  let filteredPlans = filterDataByTerm(searchTerm, plans, ['title']);

  return (
    <div>
      <Search placeholder={translate('Find')} callBack={(e) => setSearchTerm(e.target.value)} typeInput={undefined} />
      {filteredPlans ? filteredPlans.map((element: any, i: { toString: () => React.Key; }) => (
        <div key={i.toString()}>
          <RenderType theme={theme} type={'plans'} element={element} i={i} interaction={undefined} />
        </div>
      ))
        : <h2>No Plans</h2>}
    </div>
  );
};
