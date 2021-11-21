import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { organizationService } from 'services/organizationServices'
import Loader from 'components/atoms/Loader'
import { translate } from 'utils/Translation'
import Icon from 'components/atoms/Icon'
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric'
import {
  StyledReactBottomSheetExtended,
  BottomNav,
  BottomNavItem,
} from 'components/organisms/BottomSheet'
import Search from 'components/molecules/Search'
import { filterDataByTerm } from 'utils/common.util'

const IconWrapper = styled.div`
  margin-top: 0.4rem;
`

const SearchLightContainer = styled.div`
  margin: 1.6rem 1.6rem 0 1.6rem;
`

const ModalButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`

export const BottomNavTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 0.2rem 0 0 1.6rem;
`

export const AssignUsersToTrainers = ({
  theme,
  organizationId,
  assignTrainer,
  setAssignTrainer,
  activeUsers,
  assignUserToTrainer,
  setBottomSheet,
  refreshView,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [trainers, setTrainers] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getAllTrainers()
    if (activeUsers === 0) {
      setAssignTrainer('none')
    }
  }, [activeUsers])

  const closeAssignTrainersToUser = () => {
    setBottomSheet('flex')
    setAssignTrainer('none')
  }

  const filterTrainers = (event) => {
    setSearchTerm(event.target.value)
  }

  const trainersResult = filterDataByTerm(searchTerm, trainers, [
    'firstName',
    'lastName',
  ])

  const getAllTrainers = () => {
    organizationService
      .getOrganizationTrainers(organizationId)
      .then((data) => {
        setTrainers(data)
        setIsLoading(false)
      })
      .catch(() => {})
  }

  const getSelectedTrainerId = (trainer) => {
    assignUserToTrainer(activeUsers, trainer.userId)
    refreshView()
  }

  return (
    <StyledReactBottomSheetExtended
      showBlockLayer={false}
      visible={assignTrainer}
      className={''}
      onClose={() => setBottomSheet('none')}
      appendCancelBtn={false}
    >
      <BottomNav>
        <BottomNavItem>
          <h4>{translate('SelectFromTrainers')}</h4>
          <IconWrapper onClick={() => closeAssignTrainersToUser()}>
            <Icon name="union" fill={theme.colorGray70} />
          </IconWrapper>
        </BottomNavItem>
      </BottomNav>
      <SearchLightContainer>
        <IconWrapper></IconWrapper>
        <Search
          typeInput="light"
          callBack={filterTrainers}
          placeholder={translate('PlanSearch')}
        />
      </SearchLightContainer>
      <Loader isLoading={isLoading}>
        {trainersResult ? (
          <CheckboxGenericComponent
            dataType="users"
            theme="light"
            displayedValue="firstName"
            dataList={trainersResult}
            onClick={getSelectedTrainerId}
            interaction={false}
          />
        ) : (
          <h1>{translate('NoUsers')}</h1>
        )}
      </Loader>
      <ModalButtonContainer></ModalButtonContainer>
    </StyledReactBottomSheetExtended>
  )
}
