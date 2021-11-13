import React, { useState, useEffect, useCallback } from 'react';
import { commonUtil } from 'utils/common.util';
import 'react-multi-carousel/lib/styles.css';
import Search from 'components/molecules/Search';
import { translate } from 'utils/Translation';
import BackTopNav from 'components/molecules/BackTopNav';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import GlobalTemplate from 'templates/GlobalTemplate';
import Nav from 'components/atoms/Nav';
import { useThemeContext } from 'support/context/ThemeContext';
import SmallButton from 'components/atoms/SmallButton';
import { useQuery, gql } from '@apollo/client';
import { Role } from 'utils/role';
import { PlansPanel } from './microModules/PlansPanel';
import Loader from 'components/atoms/Loader';

const Plan = (props) => {

  const { theme } = useThemeContext();
  const user = JSON.parse((localStorage.getItem('user')));
  const [addExercisePanel] = useState('none');
  const id = props.match.params.id;
  const title = props.location.state.title;

  const PLANSEXERCISES = gql`{
    serializedExercisesInstances(where: {planId: "${id}"})
    {
      exerciseId
      name
      files
      series{
        serieId,
        times,
        weight,
        repeats,
      }
     }
    }
  `;



  const {
    loading, error, data, refetch: _refetch,
  } = useQuery(PLANSEXERCISES);
  const refreshPlanExerciseData = useCallback(() => { setTimeout(() => _refetch(), 200); }, [_refetch]);



  const [allExercises, setAllExercises] = useState([])
  const [activeSelectedExercise, setActiveSelectedExercise] = useState([]);
  const [assignExercise, setAssignExercises] = useState('none');
  const [bottomSheet, setBottomSheet] = useState('none')

const [planPanel, setPlanPanel] = useState('none')
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState();


  useEffect(() => {
    refreshPlanExerciseData();
  }, [id]);


  if (loading) return <Loader isLoading={loading} />;
  if (error) return <p>Error :(</p>;

  const submissionHandleElement = (selectedData) => {
    const selectedExercises = commonUtil.getCheckedData(selectedData, 'exerciseId');
    setActiveSelectedExercise(selectedExercises);
    selectedExercises.length > 0 ? setPlanPanel('flex') : setPlanPanel('none');
  };

  const filterExercises = (event) => {
    setSearchTerm(event.target.value);
  };

  let results;
  if (data) {
    results = !searchTerm
      ? data.serializedExercisesInstances
      : data.serializedExercisesInstances
        .filter((exercise) => exercise.name
          .toLowerCase()
          .includes(searchTerm.toLocaleLowerCase()));
  }

  return (
    <>
      <GlobalTemplate>
        <Nav>
          <BackTopNav text={title} />
          {user && user.role != Role.User && <SmallButton iconName="plus" onClick={() => setBottomSheet('flex')} />}
        </Nav>
        <Search callBack={filterExercises} placeholder={translate('ExerciseSearch')} />
        {results && results.length > 0
          ? (
            <CheckboxGenericComponent
              dataType="exercises"
              displayedValue="name"
              dataList={results}
              onSelect={submissionHandleElement}
            />
          )
          : <p>{translate('NoExercisesPlan')}</p>}
      </GlobalTemplate>
        <PlansPanel
          bottomSheet={addExercisePanel}
          bottomSheet={bottomSheet}
          setBottomSheet={setBottomSheet}
          setAssignExercises={setAssignExercises}
          selectedExercise={activeSelectedExercise}
          theme={theme}
          planId={id}
          refreshData={refreshPlanExerciseData}
        />
    </>
  );
};

export default Plan;
