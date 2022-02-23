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
import { usePlans } from './usePlans'

const Plans = () => {
  const [plansFilter, setPlansFilter] = useState('')
  const [authorsFilter, setAuthorsFilter] = useState('')

  const [isAuthorsListVisible, setIsAuthorsListVisible] = useState(false)

  const {
    allPlans,
    loading,
    selectedPlansIds,
    filteredPlans,
    handleAuthorClick,
  } = usePlans(plansFilter, authorsFilter)

  if (!allPlans || loading) return <p>loading</p>

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
        title={`Autor (${filteredPlans.length})`}
        label="Autor"
        onFilterClick={() => setIsAuthorsListVisible(true)}
      />
      <List>
        {filteredPlans.length > 0 ? (
          filteredPlans.map(({ title, planId, exercises }) => (
            <ListItem
              key={planId}
              primaryContent={title}
              secondaryContent={`${exercises.length} ćwiczenia`}
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

  const filteredByCreator = filteredPlans.filter(({ creatorName }) => {
    console.log(creatorName)
    return creatorName
      .toLowerCase()
      .includes(authorsFilter.trim().toLowerCase())
  })

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
      {filteredByCreator.length > 0 ? (
        filteredByCreator.map(({ creatorName, creatorId }) => (
          <SelectListItem
            name={creatorName}
            isSelected={selectedPlansIds.includes(creatorId)}
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
