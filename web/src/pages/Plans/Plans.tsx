import { useState } from 'react'
import { Container } from '@mui/material'

import {
  List,
  ListItem,
  ListFilterButton,
  ListSearch,
  SelectList,
  SelectListTextField,
  SelectListItem,
} from 'components'

import Header from './Header'
import testPlans, { Plan } from './testPlans'

const getFilteredAuthors = (plans: Plan[], input: string) => {
  return plans.filter(({ creatorName }) =>
    creatorName.toLowerCase().includes(input.trim().toLowerCase())
  )
}

const getFilteredPlans = (plans: Plan[], input: string) => {
  return plans.filter(({ title }) =>
    title.toLowerCase().includes(input.trim().toLowerCase())
  )
}

const Plans = () => {
  const [plans] = useState(testPlans)
  const [authorsFilter, setAuthorsFilter] = useState('')
  const [plansFilter, setPlansFilter] = useState('')

  const [isAuthorsListVisible, setIsAuthorsListVisible] = useState(false)

  const handleAuthorListOpen = () => setIsAuthorsListVisible(true)

  const handleAuthorListClose = () => setIsAuthorsListVisible(false)

  return (
    <Container>
      <Header />
      <ListSearch
        label="Szukaj"
        onChange={(e) => setPlansFilter(e.target.value)}
      />
      <ListFilterButton
        title="Autor 1"
        label="Autor"
        onFilterClick={handleAuthorListOpen}
      />
      <List>
        {getFilteredPlans(plans, plansFilter).map(
          ({ title, exercisesCount, planId }) => (
            <ListItem
              key={planId}
              primaryContent={title}
              secondaryContent={`${exercisesCount} ćwiczenia`}
              onClick={() => console.log('clicked')}
            />
          )
        )}
      </List>
      <SelectList
        isVisible={isAuthorsListVisible}
        title="Autorzy"
        onClose={handleAuthorListClose}
        TextFieldComponent={
          <SelectListTextField
            onChange={(e) => setAuthorsFilter(e.target.value)}
            label="Wyszukaj autora"
          />
        }
      >
        {getFilteredAuthors(plans, authorsFilter).map(
          ({ creatorName, creatorId }) => (
            <SelectListItem name={creatorName} key={creatorId} />
          )
        )}
      </SelectList>
    </Container>
  )
}

export default Plans
