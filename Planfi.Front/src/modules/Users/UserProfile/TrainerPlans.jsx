import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, gql } from '@apollo/client';
import { RenderType } from 'components/organisms/CheckboxGeneric/DataTypes';
import { useThemeContext } from 'support/context/ThemeContext';
import Search from 'components/molecules/Search';
import { translate } from 'utils/Translation';
import Loader from 'components/atoms/Loader';
import { filterDataByTerm } from '../../../utils/common.util';

export const TrainerPlans = () => {

  // what if owner go to trainer page?
  const user = JSON.parse((localStorage.getItem('user')));
  const { theme } = useThemeContext();
  const [searchTerm, setSearchTerm] = React.useState('');

  const PLANS = gql`{
    plans(where: {creatorId: "${user.userId}"})
    {
      creatorName
      planId
      title
     }
    }
  `;

  const {
    loading, error, data, refetch: _refetch,
  } = useQuery(PLANS);
  const refreshData = useCallback(() => { setTimeout(() => _refetch(), 200); }, [_refetch]);

  useEffect(() => {
    refreshData()
}, []);

const filterPlans = (event) => {
  setSearchTerm(event.target.value);
};

let results;
if(data){
  results = filterDataByTerm(searchTerm, data.plans, ['title']);
}

if (loading) return <Loader isLoading={loading} />;
if (error) return <p>Error :(</p>;

  return (
    <div>
      <Search placeholder={translate('Find')} callBack={(e) => setSearchTerm(e.target.value)}/>
      {data.plans.length >= 1 ? results.map((element, i) => (
        <div key={i.toString()}>
            <RenderType theme={theme} type={'plans'} element={element} i={i} />
            </div>
      ))
        : <h2>No Plans</h2>}
    </div>
  );
};
