import React, { useState, useEffect, useCallback } from 'react';
import { exerciseService } from 'services/exerciseService';
import { routes } from 'utils/routes';
import { useHistory, withRouter } from 'react-router-dom';
import { commonUtil } from 'utils/common.util';
import 'react-multi-carousel/lib/styles.css';
import Search from 'components/molecules/Search';
import { useQuery, gql } from '@apollo/client';
import { translate } from 'utils/Translation';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import GlobalTemplate from 'templates/GlobalTemplate';
import { useThemeContext } from 'support/context/ThemeContext';
import SmallButton from 'components/atoms/SmallButton';
import Nav from 'components/atoms/Nav';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import { PlanPanelExercises } from './PlanPanelExercises';
import Loader from 'components/atoms/Loader';
import Heading from 'components/atoms/Heading';
import {getUniqueListBy} from 'utils/common.util'

const Categories = (props) => {
  
  const { theme } = useThemeContext();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedExercise, setselectedExercise] = useState([]);
  const [selectedElementsBottomSheet, setSelectedElementsBottomSheet] = useState(false);
  const [bottomSheet, setBottomSheet] = useState('none');
  const [filteredData, setFilteredData] = useState([])
  const [filters, setFilters] = useState([])

  const CATEGORYEXERCISES = gql`{
    allBaseExercises
    {
        exerciseId
        categoryName
        name
        files
     }
    }
  `;

  const {
    loading, error, data, refetch: _refetch,
  } = useQuery(CATEGORYEXERCISES);
  const refreshData = useCallback(() => { setTimeout(() => _refetch(), 200); }, [_refetch]);
  const history = useHistory();
  const { notificationDispatch } = useNotificationContext();

  const deleteExercise = () => {
    exerciseService
      .deleteExerciseById(selectedExercise)
      .then((data) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: 'OK', message: translate('ExercisesDeleted') },
            type: 'positive'
          }
        })
        refreshData()
        setBottomSheet('none');
      })
      .catch((error) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { error: error, message: translate('ErrorAlert') },
            type: 'error'
          }
        })
      });
  }

  const filterByCategoryName = (categoryName) => {
    const isMatch = filters.includes(categoryName);
    let updatedFilters;
    isMatch
      ? updatedFilters = filters.filter((item) => item != categoryName)
      : updatedFilters = filters.concat([categoryName])

    setFilters(updatedFilters)
    setFilteredData(data.allBaseExercises.filter((exercise) => updatedFilters.includes(exercise.categoryName)))
  }


  useEffect(() => {
    refreshData();
  }, [filterByCategoryName]);

  const filterExercises = (event) => {
    setSearchTerm(event.target.value);
  };

  let results;
  if (data) {
    if (filteredData.length > 0) {
      results = !searchTerm
        ? filteredData
        : filteredData.filter((exercise) => exercise.name
          .toLowerCase()
          .includes(searchTerm.toLocaleLowerCase()));
    }
    else {
      results = !searchTerm
        ? data.allBaseExercises
        : data.allBaseExercises.filter((exercise) => exercise.name
          .toLowerCase()
          .includes(searchTerm.toLocaleLowerCase()));
    }
  }

  if (loading) return <Loader isLoading={loading} />;
  if (error) return <p>Error :(</p>;

  const redirectToAddExercise = () => {
    history.push({
      pathname: routes.addExercise,
    });
  }


  const submissionHandleElement = (selectedData) => {
    const selectedExercises = commonUtil.getCheckedData(selectedData, 'exerciseId');
    setselectedExercise(selectedExercises);
    selectedExercises.length > 0 ? setBottomSheet('flex') : setBottomSheet('none');
  };


  return (
    <> 
      <GlobalTemplate>

        <Nav>
          <Heading>{translate('ExercisesTitle')}</Heading>
          <SmallButton onClick={() => redirectToAddExercise()} iconName="plus" />
        </Nav>
        <Search callBack={filterExercises} placeholder={translate('ExerciseSearch')} />

        {results && results.length > 0
          ?
          <>

            {getUniqueListBy(data.allBaseExercises, "categoryName")
              .map((x, i) => <p key ={i} className={filters.includes(x.categoryName) ? "bold" : ""} onClick={() => filterByCategoryName(x.categoryName)}>{x.categoryName}</p>)}
            <CheckboxGenericComponent
              dataType="exercises"
              displayedValue="name"
              dataList={results}
              onSelect={submissionHandleElement}
            />
          </>
          : <p>{translate('NoExercises')}</p>}
      </GlobalTemplate>
      <PlanPanelExercises
        deleteExercise={deleteExercise}
        selectedExercise={selectedExercise}
        bottomSheet={bottomSheet}
        setSelectedElementsBottomSheet={setSelectedElementsBottomSheet}
        selectedElementsBottomSheet={selectedElementsBottomSheet}
        theme={theme}
      />
    </>
  );
};
export default withRouter(Categories);
