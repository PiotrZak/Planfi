import React, { useState, useEffect, useCallback } from 'react';
import { categoryService } from 'services/categoryService';
import { exerciseService } from 'services/exerciseService';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { routes } from 'utils/routes';
import { commonUtil } from 'utils/common.util';
import 'react-multi-carousel/lib/styles.css';
import Search from 'components/molecules/Search';
import { translate } from 'utils/Translation';
import BackTopNav from 'components/molecules/BackTopNav';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import GlobalTemplate from 'templates/GlobalTemplate';
import { useThemeContext } from 'support/context/ThemeContext';
import SmallButton from 'components/atoms/SmallButton';
import Nav from 'components/atoms/Nav';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import styled from 'styled-components';

import { PlanPanelExercises } from './PlanPanelExercises';

const Container = styled.div`
  display: flex;
  width: 7rem;
  justify-content: space-between;
`;

const Category = (props) => {
  const { theme } = useThemeContext();

  const [category, setCategory] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [selectedExercise, setselectedExercise] = useState([]);
  const [selectedElementsBottomSheet, setSelectedElementsBottomSheet] = useState(false);
  const [bottomSheet, setBottomSheet] = useState('none');

  const history = useHistory();
  const { notificationDispatch } = useNotificationContext();
  const { match } = props;
  const { id } = match.params;

  const getCategory = (id) => {
    categoryService
      .getCategoryById(id)
      .then((data) => {
        setCategory(data);
      })
      .catch((error) => {
      });
  };

  const deleteExercise = () => {
    exerciseService
      .deleteExerciseById(selectedExercise)
      .then((data) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: 'OK', message: translate('ExercisesDeleted') },
            type: 'positive',
          },
        });
        setBottomSheet('none');
      })
      .catch((error) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { error, message: translate('ErrorAlert') },
            type: 'error',
          },
        });
      });
  };

  useEffect(() => {
    getCategory(id);
    getCategoryExercise(id);
  }, [id]);

  const getCategoryExercise = useCallback((id) => {
    exerciseService
      .getExercisesByCategory(id)
      .then((data) => {
        setExercises(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const submissionHandleElement = (selectedData) => {
    const selectedExercises = commonUtil.getCheckedData(selectedData, 'exerciseId');
    setselectedExercise(selectedExercises);
    selectedExercises.length > 0 ? setBottomSheet('flex') : setBottomSheet('none');
  };

  const filterExercises = (event) => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
    ? exercises
    : exercises.filter((exercise) => exercise.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));

  const redirectToAddExercise = () => {
    history.push({
      pathname: routes.addExercise,
      state: { id },
    });
  };
  return (
    <>
      <GlobalTemplate>
        <Nav>
          <BackTopNav text={category.title} />
          <Container>
            <SmallButton iconName="ellipsis-h" onClick={() => alert('Add functionality')} />
            <SmallButton iconName="plus" onClick={() => alert('Add functionality')} />
          </Container>
        </Nav>
        <Search callback={filterExercises} placeholder={translate('ExerciseSearch')} />
        {results
          ? (
            <CheckboxGenericComponent
              dataType="exercises"
              displayedValue="name"
              dataList={results}
              onSelect={submissionHandleElement}
            />
          )
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

export default withRouter(Category);
