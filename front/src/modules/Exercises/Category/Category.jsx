import React, { useState, useEffect, useCallback } from 'react';
import { categoryService } from 'services/categoryService';
import { exerciseService } from 'services/exerciseService';
import { Link } from 'react-router-dom';
import { routes } from 'utils/routes';
import { commonUtil } from 'utils/common.util';
import 'react-multi-carousel/lib/styles.css';
import Search from 'components/molecules/Search';
import { translate } from 'utils/Translation';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import GlobalTemplate from 'templates/GlobalTemplate';
import { useThemeContext } from 'support/context/ThemeContext';
import SmallButton from 'components/atoms/SmallButton';
import ReturnWithTitle from 'components/molecules/ReturnWithTitle';
import Nav from 'components/atoms/Nav';
import { PlanPanelExercises } from './PlanPanelExercises';

const Category = (props) => {
  const { theme } = useThemeContext();

  const [category, setCategory] = useState();
  const [exercises, setExercises] = useState();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [selectedExercise, setselectedExercise] = useState([]);
  const [selectedElementsBottomSheet, setSelectedElementsBottomSheet] = useState(false);
  const [bottomSheet, setBottomSheet] = useState('none');

  const { match } = props;
  const { id } = match.params;

  useEffect(() => {
    getCategory(id);
    getCategoryExercise(id);
  }, [id]);

  const getCategory = (id) => {
    categoryService
      .getCategoryById(id)
      .then((data) => {
        setCategory(data);
      })
      .catch((error) => {
      });
  };

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

  return (
    <>
      <GlobalTemplate>
        <Nav>
          {category && <ReturnWithTitle text={category.title} /> }
          {category
          && (
            <Link
              to={{
                pathname: routes.exercise,
                state: { id },
              }}
            >
              <SmallButton iconName="plus" />
            </Link>
          )}
        </Nav>
        <Search callBack={filterExercises} placeholder={translate('ExerciseSearch')} />
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
        selectedExercise={selectedExercise}
        bottomSheet={bottomSheet}
        setSelectedElementsBottomSheet={setSelectedElementsBottomSheet}
        selectedElementsBottomSheet={selectedElementsBottomSheet}
        theme={theme}
      />
    </>
  );
};

export default Category;
