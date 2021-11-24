import React, { useState, useEffect, useCallback } from 'react'
import { exerciseService } from 'services/exerciseService'
import { routes } from 'utils/routes'
import styled from 'styled-components'
import { useHistory, withRouter } from 'react-router-dom'
import { commonUtil } from 'utils/common.util'
import 'react-multi-carousel/lib/styles.css'
import Search from 'components/molecules/Search'
import { useQuery, gql } from '@apollo/client'
import { translate } from 'utils/Translation'
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric'
import GlobalTemplate from 'templates/GlobalTemplate'
import { useThemeContext } from 'support/context/ThemeContext'
import SmallButton from 'components/atoms/SmallButton'
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Nav from 'components/atoms/Nav'
import {
  useNotificationContext,
  ADD,
} from 'support/context/NotificationContext'
import { PlanPanelExercises } from './PlanPanelExercises'
import Loader from 'components/atoms/Loader'
import Heading from 'components/atoms/Heading'
import { getUniqueListBy } from 'utils/common.util'
import { ExerciseViewModel } from "../../Types/PlanfiApi/Models/ViewModels/ExerciseViewModel";

//todo - discuss if we use styled components in some places or refactor everything into mui ?

const Sticky = styled.div`
position: -webkit-sticky; /* Safari */
position: sticky;
background-color:white;
top: 0;
`


const Categories = (_props: any) => {
  const { theme } = useThemeContext()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedExercise, setselectedExercise] = useState<any>([])
  const [categoriesOpen, setCategoriesOpen] = useState<boolean>(false);
  const [selectedElementsBottomSheet, setSelectedElementsBottomSheet] =
    useState(false)
  const [bottomSheet, setBottomSheet] = useState('none')
  const [filteredData, setFilteredData] = useState([])
  const [filters, setFilters] = useState([])

  const CATEGORYEXERCISES = gql`
    {
      allBaseExercises {
        exerciseId
        categoryName
        name
        files
      }
    }
  `

  const {
    loading,
    error,
    data,
    refetch: _refetch,
  } = useQuery(CATEGORYEXERCISES)
  const refreshData = useCallback(() => {
    setTimeout(() => _refetch(), 200)
  }, [_refetch])
  const history = useHistory()
  const { notificationDispatch } = useNotificationContext()

  const deleteExercise = () => {
    exerciseService
      .deleteExerciseById(selectedExercise)
      .then((_data) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: 'OK', message: translate('ExercisesDeleted') },
            type: 'positive',
          },
        })
        refreshData()
        setBottomSheet('none')
      })
      .catch((error) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { error: error, message: translate('ErrorAlert') },
            type: 'error',
          },
        })
      })
  }

  const filterByCategoryName = (categoryName: never) => {
    const isMatch = filters.includes(categoryName)
    let updatedFilters: any = [] //todo - fix this
    isMatch
      ? (updatedFilters = filters.filter((item) => item != categoryName))
      : (updatedFilters = filters.concat([categoryName]))

    setFilters(updatedFilters)
    setFilteredData(
      data.allBaseExercises.filter((exercise: any) =>
        updatedFilters.includes(exercise.categoryName)
      )
    )
  }

  useEffect(() => {
    refreshData()
  }, [filterByCategoryName])

  const filterExercises = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSearchTerm(event.target.value)
  }

  let results
  if (data) {
    if (filteredData.length > 0) {
      results = !searchTerm
        ? filteredData
        : filteredData.filter((exercise: { name: string }) =>
          exercise.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        )
    } else {
      results = !searchTerm
        ? data.allBaseExercises
        : data.allBaseExercises.filter((exercise: { name: string }) =>
          exercise.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        )
    }
  }

  if (loading) return <Loader isLoading={loading} children={undefined} />
  if (error) return <p>Error :(</p>

  const redirectToAddExercise = () => {
    history.push({
      pathname: routes.addExercise,
    })
  }

  const submissionHandleElement = (selectedData: any) => {
    const selectedExercises = commonUtil.getCheckedData(
      selectedData,
      'exerciseId'
    )
    setselectedExercise(selectedExercises)
    selectedExercises.length > 0
      ? setBottomSheet('flex')
      : setBottomSheet('none')
  }

  const list = () => {
    return (
      <>
        {getUniqueListBy(data.allBaseExercises, 'categoryName').map(
          (x: any, i: number) => (
            <p
              key={i}
              //@ts-ignore
              className={filters.includes(x.categoryName) ? 'bold' : ''}
              //@ts-ignore
              onClick={() => filterByCategoryName(x.categoryName)}
            >
              {x.categoryName}
            </p>
          )
        )
        })
      </>
    )
  }

  const toggleDrawer =
    (_anchor: any, _open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
      };

  return (
    <>
      <GlobalTemplate>
        <Sticky>
          <Nav>
            <Heading>{translate('ExercisesTitle')}</Heading>
            <SmallButton
              onClick={() => redirectToAddExercise()}
              iconName="plus" fill={undefined} size={undefined} buttonType={undefined} buttonShape={undefined} color={undefined} />
          </Nav>
          <Search
            callBack={filterExercises}
            placeholder={translate('ExerciseSearch')} typeInput={undefined} />
        </Sticky>
        {results && results.length > 0 ? (
          <>
            <Button onClick={() => setCategoriesOpen(!categoriesOpen)}>click</Button>
            {/* {getUniqueListBy(data.allBaseExercises, 'categoryName').map(
            (x, i) => (
              <p
                key={i}
                className={filters.includes(x.categoryName) ? 'bold' : ''}
                onClick={() => filterByCategoryName(x.categoryName)}
              >
                {x.categoryName}
              </p>
            )
          )} */}
            <CheckboxGenericComponent
              dataType="exercises"
              displayedValue="name"
              dataList={results}
              onSelect={submissionHandleElement} theme={undefined} onClick={undefined} interaction={undefined} refresh={undefined} checkboxVisible={undefined} />
          </>
        ) : (
          <p>{translate('NoExercises')}</p>
        )}
      </GlobalTemplate>
      <Drawer
        anchor={'bottom'}
        open={categoriesOpen}
        onClose={() => setCategoriesOpen(!categoriesOpen)}
      >
        {list()}
      </Drawer>
      {/* <PlanPanelExercises
        deleteExercise={deleteExercise}
        selectedExercise={selectedExercise}
        bottomSheet={bottomSheet}
        setSelectedElementsBottomSheet={setSelectedElementsBottomSheet}
        selectedElementsBottomSheet={selectedElementsBottomSheet}
        theme={theme}
      /> */}
    </>
  )
}
export default withRouter(Categories)
