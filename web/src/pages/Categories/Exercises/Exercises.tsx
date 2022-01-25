import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import { useAllBaseExercisesQuery } from 'generated/graphql'
import React from 'react'
import CardExercise from './CardExercise'

interface Props {
  selectedCategories: string[]
}

const Exercises: React.FC<Props> = ({ selectedCategories }) => {
  const { data, loading } = useAllBaseExercisesQuery()
  const exercises = data?.allBaseExercises.filter((value) => {
    if (!selectedCategories.length) {
      return value
    }

    return selectedCategories.includes(value.categoryName || '')
  })

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

  return (
    <>
      {exercises?.map(({ exerciseId, name, categoryName }) => {
        return (
          <CardExercise
            key={exerciseId}
            name={name}
            categoryName={categoryName || ''}
          />
        )
      })}
    </>
  )
}

export default Exercises
