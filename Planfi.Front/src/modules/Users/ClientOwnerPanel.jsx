import React, { useState } from 'react'
import { userService } from 'services/userServices'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import { organizationService } from 'services/organizationServices'
import { translate } from 'utils/Translation'
import {
  useNotificationContext,
  ADD,
} from 'support/context/NotificationContext'
import StyledReactBottomSheet, {
  PanelContainer,
  PanelItem,
} from 'components/organisms/BottomSheet'
import { AssignUsersToPlans } from './micromodules/AssignUsersToPlan'
import { useUserContext } from 'support/context/UserContext'
import { AssignUsersToTrainers } from './micromodules/AssignUsersToTrainers'

export const BottomNavTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 0.2rem 0 0 1.6rem;
`

export const ClientOwnerPanel = ({
  userId,
  theme,
  assignTrainer,
  setAssignTrainer,
  activeUsers,
  bottomSheet,
  setBottomSheet,
}) => {
  const { user } = useUserContext()
  const { notificationDispatch } = useNotificationContext()
  const [assignPlan, setAssignPlan] = useState('none')

  const openAssignUsersToTrainers = () => {
    setAssignPlan('flex')
    setAssignTrainer('flex')
  }

  return (
    <>
      <StyledReactBottomSheet
        showBlockLayer={false}
        visible={bottomSheet}
        className={''}
        onClose={() => setBottomSheet('none')}
        appendCancelBtn={false}
      >
        {isMobile ? (
          <>
            <PanelItem onClick={() => openAssignUsersToTrainers()}>
              {translate('AssignToTrainer')}
            </PanelItem>
          </>
        ) : (
          <>
            <PanelContainer>
              <PanelItem onClick={() => openAssignUsersToTrainers()}>
                {translate('AssignToTrainer')}
              </PanelItem>
            </PanelContainer>
          </>
        )}
      </StyledReactBottomSheet>
      <AssignUsersToTrainers
        theme={theme}
        userId={user.userId}
        organizationId={user.organizationId}
        assignTrainer={assignTrainer}
        setAssignTrainer={setAssignTrainer}
        bottomSheet={bottomSheet}
        setBottomSheet={setBottomSheet}
        activeUsers={activeUsers}
      />
    </>
  )
}
