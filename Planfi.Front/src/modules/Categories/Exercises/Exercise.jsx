import React, { useState, useEffect, useCallback } from 'react'
import { exerciseService } from 'services/exerciseService'
import { useHistory, Link } from 'react-router-dom'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import GlobalTemplate from 'templates/GlobalTemplate'
import SmallButton from 'components/atoms/SmallButton'
import Nav from 'components/atoms/Nav'
import BackTopNav from 'components/molecules/BackTopNav'
import { Role } from 'utils/role'
import { useUserContext } from 'support/context/UserContext'
import { useQuery, gql } from '@apollo/client'
import { translate } from 'utils/Translation'
import styled from 'styled-components'
import {
  useNotificationContext,
  ADD,
} from 'support/context/NotificationContext'
import ExercisePanel from './ExercisePanel'
import Slide from 'components/molecules/Slide'
import Loader from 'components/atoms/Loader'

import { Breakpoints } from 'support/magicVariables'

const Exercise = (props) => {
  const { user } = useUserContext()
  const { notificationDispatch } = useNotificationContext()
  const [bottomSheet, setBottomSheet] = useState('none')
  const history = useHistory()
  const { match } = props
  let id = match.params.id


  const EXERCISE = gql`{
    exercise(id: "${id}")
    {
      exerciseId
      name
      description
      files
      filesUrl
      series{
        serieId,
        times,
        weight,
        repeats,
      }
     }
    }
  `

  const { loading, error, data, refetch: _refetch } = useQuery(EXERCISE)
  const refreshData = useCallback(() => {
    setTimeout(() => _refetch(), 200)
  }, [_refetch])

  useEffect(() => {
    refreshData()
  }, [])

  if (loading) return <Loader isLoading={loading} />
  if (error) return <p>Error :(</p>

  let exercise
  if (data) {
    exercise = data.exercise
    console.log(data.exercise)
  }

  const deleteExercise = () => {
    exerciseService
      .deleteExerciseById(id)
      .then(() => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: 'OK', message: translate('ExerciseDeleted') },
            type: 'positive',
          },
        })
        history.goBack()
      })
      .catch((error) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { error, message: translate('ErrorAlert') },
            type: 'error',
          },
        })
      })
  }

  return (
    <>
      {exercise && (
        <GlobalTemplate>
          <Nav>
            <BackTopNav text={exercise.name} />
            {user.role.name != Role.User && exercise && (
              <SmallButton
                onClick={() => setBottomSheet('flex')}
                iconName="plus"
              />
            )}
          </Nav>
          {exercise.filesUrl && (
            <Carousel swipeable={true} responsive={Breakpoints}>
              {exercise.filesUrl.map((file, index) => (
                <>
                  <Slide videoName={exercise.name} index={index} img={file} />
                </>
              ))}
            </Carousel>
          )}
          <>
            <h1>{exercise.name}</h1>
            {exercise.series &&
              exercise.series.map((serie, index) => (
                <div key={index}>
                  <p>
                    {translate('Weight')} {serie.weight}
                  </p>
                  <p>
                    {translate('ExerciseTime')} {serie.times}
                  </p>
                  <p>
                    {translate('Repeat')}
                    {serie.repeats}
                  </p>
                </div>
              ))}
            <h3>Description:</h3>
            <p>{exercise.description}</p>
          </>
        </GlobalTemplate>
      )}
      <ExercisePanel
        props={props}
        bottomSheet={bottomSheet}
        setBottomSheet={setBottomSheet}
        exercise={exercise}
        deleteExercise={deleteExercise}
      />
    </>
  )
}

export default Exercise
