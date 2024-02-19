import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Icon from 'components/atoms/Icon'
import 'react-multi-carousel/lib/styles.css'
import { isMobile } from 'react-device-detect'
import StyledReactBottomSheet, {
  PanelContainer,
  PanelItem,
} from 'components/organisms/BottomSheet'
import { translate } from 'utils/Translation'
import Drawer from '@mui/material/Drawer';

const IconWrapper = styled.div`
  margin-top: 0.4rem;
`

interface IPlanPanelExercises {
  deleteExercise: any;
  selectedExercise: any;
  theme: any;
  exerciseInteraction: any;
  setExerciseInteraction: any;
}

export const PlanPanelExercises = ({
  deleteExercise,
  selectedExercise,
  theme,
  exerciseInteraction,
  setExerciseInteraction,
}: IPlanPanelExercises) => {
  const history = useHistory()

  const editExercise = () => {
    history.push({
      pathname: `/edit-exercise/${selectedExercise}`,
      //@ts-ignore
      state: { selectedExercise: selectedExercise },
    })
  }


  const exerciseInteractionList = () => {
    return (
      <>
        <PanelContainer>
          <PanelItem>
            <IconWrapper>
              <Icon name="check" fill={theme.colorInputActive} size={undefined} cursorType={undefined} />
            </IconWrapper>
            {selectedExercise.length} {translate('Selected')}
          </PanelItem>
          <PanelItem onClick={() => deleteExercise()}>
            {translate('DeleteExercise')}
          </PanelItem>
          {selectedExercise.length < 2 && (
            <PanelItem onClick={() => editExercise()}>
              {translate('EditExercise')}
            </PanelItem>
          )}
        </PanelContainer>
      </>
    )

  }

  return (
    <Drawer
      hideBackdrop={true}
      anchor={'bottom'}
      open={exerciseInteraction}
      onClose={() => setExerciseInteraction(!exerciseInteraction)}
    >
      {exerciseInteractionList()}
    </Drawer>
  )
}
