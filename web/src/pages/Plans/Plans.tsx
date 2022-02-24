import { useState } from 'react'
import { Container, Typography } from '@mui/material'
import { PlansQuery } from 'generated/graphql'

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
import ActionDrawer from './ActionDrawer'

const Plans = () => {
  const [plansFilter, setPlansFilter] = useState('')
  const [authorsFilter, setAuthorsFilter] = useState('')

  const [isAuthorsListVisible, setIsAuthorsListVisible] = useState(false)
  const [actionDrawer, setActionDrawer] = useState<{
    isVisible: boolean
    plan: PlansQuery['plans'][number] | undefined
  }>({
    isVisible: false,
    plan: undefined,
  })

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
          filteredPlans.map((plan) => (
            <ListItem
              key={plan.planId}
              primaryContent={plan.title}
              secondaryContent={`${plan.exercises.length} ćwiczenia`}
              onClick={() => setActionDrawer({ isVisible: true, plan })}
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
      <ActionDrawer
        isVisible={actionDrawer.isVisible}
        plan={actionDrawer.plan}
        onClose={() => setActionDrawer({ isVisible: false, plan: undefined })}
      />
    </Container>
  )
}

export default Plans
