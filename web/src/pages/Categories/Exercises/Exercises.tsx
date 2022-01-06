import { useAllBaseExercisesQuery } from 'generated/graphql'
import React from 'react'
import CardExercise from './CardExercise'

const Exercises: React.FC = () => {
  const { data } = useAllBaseExercisesQuery()
  const exercises = data?.allBaseExercises
  console.log(exercises)

  return (
    <>
      {exercises?.map(({ exerciseId, name }) => {
        return <CardExercise key={exerciseId} name={name} />
      })}
    </>
  )
}

export default Exercises
