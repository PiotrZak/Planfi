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
import Loader from 'components/atoms/Loader'
import Heading from 'components/atoms/Heading'
import { getUniqueListBy } from 'utils/common.util'
import { ExerciseViewModel } from "../../Types/PlanfiApi/Models/ViewModels/ExerciseViewModel";
import { Alert, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Snackbar } from '@mui/material'
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
  const [filteredData, setFilteredData] = useState([])
  const [filters, setFilters] = useState([])
  const [uploadPercentage, setUploadPercentage] = useState(0)

  const menuId = 'primary-search-account-menu';
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const [isRunning, setIsRunning] = useState<boolean>(true)
  const [deleteModal, setDeleteModal] = useState(false);

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

  const deleteExercise = (selectedExerciseId: string[]) => {

    exerciseService
      .deleteExerciseById(selectedExerciseId)
      .then((_data) => {
        console.log('deleted')
        refreshData()
        handleMenuClose()
      })
      .catch((error) => {
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

  let results: ExerciseViewModel[] | any = [];

  useEffect(() => {
    setIsRunning(true)
    refreshData()
  }, [filterByCategoryName, results, isRunning, setIsRunning])

  const filterExercises = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSearchTerm(event.target.value)
  }

  if (data) {
    if (filteredData.length > 0) {
      results = !searchTerm
        ? filteredData
        : filteredData.filter((exercise: { name: string }) =>
          exercise.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        )
      if (deleteModal == true) {
        results = results.filter((x: ExerciseViewModel) => !selectedExerciseId.includes(x.exerciseId));
      }
    } else {
      results = !searchTerm
        ? data.allBaseExercises
        : data.allBaseExercises.filter((exercise: { name: string }) =>
          exercise.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        )
      if (deleteModal == true) {
        results = results.filter((x: ExerciseViewModel) => !selectedExerciseId.includes(x.exerciseId));
      }
    }
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  let intervalId: any = useRef(null)

  const handleClose = useCallback(
    () => {
      refreshData()
      handleMenuClose()
      clearInterval(intervalId.current)
      setIsRunning(false);
      setDeleteModal(false)
      setUploadPercentage(0)
    }, [isRunning, setIsRunning]);

  const initialDelete = useCallback(
    (selectedExerciseId) => {
      refreshData()
      setIsRunning(true)
      setDeleteModal(true)
      handleMenuClose();
      let timer = 1500;
      let i = 0;
      let interval: any = null;
      if (isRunning) {
        intervalId.current = setInterval(() => {
          ++i
          setUploadPercentage((prev) => prev + 1)
          if (i == 99) {
            deleteExercise(selectedExerciseId)
            clearInterval(intervalId.current)
            setDeleteModal(false)
            setUploadPercentage(0)
          }
        }, timer / 100);
      }
      else {
        console.log('isRunning is false')
        clearInterval(interval);
        setUploadPercentage(0)
      }
    },
    [isRunning, setIsRunning],
  );

  if (loading) return <Loader isLoading={loading} children={undefined} />
  if (error) return <p>Error :(</p>

  const redirectToAddExercise = () => {
    history.push({
      pathname: routes.addExercise,
    })
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

  const openListItemMenu = (event: React.MouseEvent<HTMLElement>, id: string) => {
    //setselectedExerciseId([...selectedExerciseId, id])
    setselectedExerciseId([id])
    setAnchorEl(event.currentTarget);
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
      <MenuItem onClick={() => initialDelete(selectedExerciseId)}>Delete</MenuItem>
    </Menu>
  );

  const progressBar = {
    position: 'absolute',
    height: '3px',
    left: '0',
    top: '0',
    width: `${uploadPercentage}%`,
    backgroundColor: theme.colorSuccessDefault,
  }


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
            <List>
              {results.map((exercise: ExerciseViewModel | any) => (
                <ListItem
                  sx={{ borderBottom: `1px solid ${theme.colorGray40}` }}
                  secondaryAction={
                    <IconButton
                      size="large"
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={(e) => openListItemMenu(e, exercise.exerciseId)}
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
      {renderMenu}
      <Snackbar
        open={deleteModal}
        autoHideDuration={200000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        key={'top' + 'center'}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Exercise Deleted succesfully!
          <React.Fragment>
            {uploadPercentage > 0 && (
              //@ts-ignore
              <div style={progressBar}></div>
            )}
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
          </React.Fragment>
        </Alert>
      </Snackbar>
    </>
  )
}
export default withRouter(Categories)
