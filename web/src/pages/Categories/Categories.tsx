import { CircularProgress, Container, Grid } from '@mui/material'
import { Box } from '@mui/system'
import { useCategoriesQuery } from 'generated/graphql'
import React from 'react'
import AddExercise from './AddExercise/AddExercise'
import EmptyExercises from './EmptyExercises/EmptyExercises'
import Exercises from './Exercises'
import Header from './Header'
import { ListButton } from './ListButton'

const Categories: React.FC = () => {
  const { data, loading } = useCategoriesQuery()
  const [selectedCategories, setCategories] = React.useState<string[]>([])
  const [showAddExercise, setShowAddExercise] = React.useState(false)
  const categories = data?.categories

  if (loading) {
    return (
      <Box
        sx={{
          mx: 'auto',
          textAlign: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!categories.length) {
    return <EmptyExercises />
  }

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12}>
            <ListButton
              categories={categories}
              selectedCategories={selectedCategories}
              setCategories={setCategories}
            />
          </Grid>
          <Grid item xs={12}>
            <Exercises selectedCategories={selectedCategories} />
          </Grid>
        </Grid>
      </Container>

      {!showAddExercise && <AddExercise />}
    </>
  )
}

export default Categories
