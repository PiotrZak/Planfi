import React, { useState, useEffect, useCallback, useRef, MutableRefObject } from 'react'
import { exerciseService } from 'services/exerciseService'
import { routes } from 'utils/routes'
import styled from 'styled-components'
import { useHistory, withRouter } from 'react-router-dom'
import { commonUtil } from 'utils/common.util'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-multi-carousel/lib/styles.css'
import Search from 'components/molecules/Search'
import { useQuery, gql } from '@apollo/client'
import { translate } from 'utils/Translation'
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
import { IconButton, List, ListItem, ListItemText, Menu, MenuItem } from '@mui/material'
import Icon from 'components/atoms/Icon'
import { useOnClickOutside } from 'hooks/useOnClickOutside'

//todo - discuss if we use styled components in some places or refactor everything into mui ?

const Sticky = styled.div`
position: -webkit-sticky; /* Safari */
position: sticky;
background-color:white;
z-index:1;
top: 0;
`

const DrawerParagraph = styled.div<{ background: any }>`
  background-color: ${p => (p.background)};
  height:40px;
  margin-top: 10px;
  text-align:center;
  font-style: normal;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
`


const Categories = (_props: any) => {
  const { theme } = useThemeContext()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedExerciseId, setselectedExerciseId] = useState<string[]>([])
  const [categoriesOpen, setCategoriesOpen] = useState<boolean>(false);
  const [exerciseInteraction, setExerciseInteraction] = useState<boolean>(false)
  const [filteredData, setFilteredData] = useState([])
  const [filters, setFilters] = useState([])

  //menu
  const menuId = 'primary-search-account-menu';
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

    console.log(selectedExerciseId)
    exerciseService
      .deleteExerciseById(selectedExerciseId)
      .then((_data) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: 'OK', message: translate('ExercisesDeleted') },
            type: 'positive',
          },
        })
        refreshData()
        handleMenuClose()
        setExerciseInteraction(!exerciseInteraction);
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

  let results: ExerciseViewModel[] | any = [];

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
    const selectedExerciseIds = commonUtil.getCheckedData(
      selectedData,
      'exerciseId'
    )
    //setselectedExerciseId(selectedExerciseIds)
    selectedExerciseIds.length > 0
      ? setExerciseInteraction(true)
      : setExerciseInteraction(false)
  }



  const list = () => {
    return (
      <>
        {getUniqueListBy(data.allBaseExercises, 'categoryName').map(
          (x: any, i: number) => (
            <DrawerParagraph
              background={
                //@ts-ignore
                filters.includes(x.categoryName)
                  ? theme.colorPrimaryLightest
                  : theme.colorPrimary}
              key={i}
              //@ts-ignore
              onClick={() => filterByCategoryName(x.categoryName)}
            >
              {x.categoryName}
            </DrawerParagraph>
          )
        )
        }
        <Button variant="contained" onClick={() => setCategoriesOpen(!categoriesOpen)}>Filter ({filters.length})</Button>
      </>
    )
  }

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {

    setselectedExerciseId([...selectedExerciseId, id])
    setAnchorEl(event.currentTarget);
  };


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };


  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => history.push({
        pathname: `/edit-exercise/${selectedExerciseId}`,
        //@ts-ignore
        state: { selectedExerciseId: selectedExerciseId },
      })}>Edit</MenuItem>
      <MenuItem onClick={deleteExercise}>Delete</MenuItem>
    </Menu>
  );

  return (
    <>
      <GlobalTemplate>
        <Sticky>
          <Nav>
            <Heading>{translate('ExercisesTitle')}</Heading>
            <SmallButton
              id="add-exercise"
              onClick={() => redirectToAddExercise()}
              iconName="plus" fill={undefined} size={undefined} buttonType={undefined} buttonShape={undefined} color={undefined} />
          </Nav>
          <Search
            callBack={filterExercises}
            placeholder={translate('ExerciseSearch')} typeInput={undefined} />
        </Sticky>
        {results && results.length > 0 ? (
          <>
            <Button variant="outlined" onClick={() => setCategoriesOpen(!categoriesOpen)}>Categories</Button>
            {filters.map((x, i) => (<p key={i}>{x}</p>))}
            <List>
              {results.map((exercise: ExerciseViewModel | any) => (
                <ListItem
                  secondaryAction={
                    <IconButton
                      size="large"
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={(e) => handleProfileMenuOpen(e, exercise.exerciseId)}
                      color="inherit">
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </IconButton>
                  }
                >
                  <ListItemText
                    sx={{
                      '&:hover, &:focus': {
                        cursor: 'pointer',
                      },
                    }}
                    onClick={() =>
                      history.push({
                        pathname: `/exercises/${exercise.exerciseId}`,
                        //@ts-ignore
                        state: { id: exercise.exerciseId },
                      })}
                    primaryTypographyProps={{
                      fontWeight: '600',
                      variant: 'body2',
                      fontSize: '1.675rem',
                    }}
                    secondaryTypographyProps={{
                      fontWeight: '400',
                      variant: 'body2',
                      fontSize: '1.275rem',
                    }}
                    primary={exercise.name}
                    secondary={exercise.categoryName}
                  />
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <p>{translate('NoExercises')}</p>
        )
        }
      </GlobalTemplate >
      <Drawer
        anchor={'bottom'}
        open={categoriesOpen}
        onClose={() => setCategoriesOpen(!categoriesOpen)}
      >
        {list()}
      </Drawer>
      {/* <PlanPanelExercises
        deleteExercise={deleteExercise}
        selectedExerciseId={selectedExerciseId}
        exerciseInteraction={exerciseInteraction}
        setExerciseInteraction={setExerciseInteraction}
        theme={theme}
      /> */}
      {renderMenu}
    </>
  )
}
export default withRouter(Categories)
