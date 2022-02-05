import { useState } from 'react'
import { Container, Typography } from '@mui/material'

import {
  List,
  ListItem,
  ListFilterButton,
  ListSearch,
  ListEmpty,
  SelectList,
  SelectListTextField,
  SelectListItem,
} from 'components'

import Header from './Header'
import usePlans from './usePlans'

const Plans = () => {
  const [plansFilter, setPlansFilter] = useState('')
  const [authorsFilter, setAuthorsFilter] = useState('')

  const { allPlans, filteredPlans, filteredPlansLength, handleAuthorClick } =
    usePlans(plansFilter, authorsFilter)

  const [isAuthorsListVisible, setIsAuthorsListVisible] = useState(false)

  if (allPlans.length === 0) {
    return (
      <ListEmpty
        title=" Nie masz jeszcze żadnych planów!"
        actionTitle="Dodaj plan"
        onActionClick={() => console.log('adding plan')}
      />
    )
  }

  const plansList = (
    <>
      <ListSearch
        label="Szukaj"
        value={plansFilter}
        onChange={(e) => setPlansFilter(e.target.value)}
      />
      <ListFilterButton
        title={`Autor (${filteredPlansLength})`}
        label="Autor"
        onFilterClick={() => setIsAuthorsListVisible(true)}
      />
      <List>
        {filteredPlans.length > 0 ? (
          filteredPlans.map(({ title, exercisesCount, planId }) => (
            <ListItem
              key={planId}
              primaryContent={title}
              secondaryContent={`${exercisesCount} ćwiczenia`}
              onClick={() => console.log('show bottom drawer')}
            />
          ))
        ) : (
          <Typography sx={{ my: 0.5 }} align="center">
            Taki plan nie istnieje
          </Typography>
        )}
      </List>
    </>
  )

  const authorsFilterList = (
    <SelectList
      isVisible={isAuthorsListVisible}
      title="Autorzy"
      onClose={() => setIsAuthorsListVisible(false)}
      TextFieldComponent={
        <SelectListTextField
          value={authorsFilter}
          onChange={(e) => setAuthorsFilter(e.target.value)}
          label="Wyszukaj autora"
        />
      }
    >
      {allPlans.length > 0 ? (
        allPlans.map(({ creatorName, creatorId, isSelected }) => (
          <SelectListItem
            name={creatorName}
            isSelected={isSelected}
            onClick={() => handleAuthorClick(creatorId)}
            key={creatorId}
          />
        ))
      ) : (
        <Typography sx={{ my: 0.5 }} align="center">
          Taki autor nie istnieje
        </Typography>
      )}
    </SelectList>
  )

  return (
    <Container>
      <Header />
      {plansList}
      {authorsFilterList}
    </Container>
  )
}

export default Plans
