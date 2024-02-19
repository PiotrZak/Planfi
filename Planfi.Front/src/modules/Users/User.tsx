import React, { useState, useEffect } from 'react'
import { UserInfo } from 'components/molecules/UserInfo/UserInfo'
import { userService } from 'services/userServices'
import BackTopNav from 'components/molecules/BackTopNav'
import MyProfileTemplate from 'templates/MyProfileTemplate'
import { translate } from 'utils/Translation'
import UserInfoBackground from 'components/molecules/UserInfoBackground'
import { Role } from 'utils/role'
import styled, { css } from 'styled-components'
import breakPointSize from 'utils/rwd'
import Nav from 'components/atoms/Nav'
import Loader from 'components/atoms/Loader'
import { profileTabs } from './ProfileTabs'
import { Plans } from 'modules/Users/UserProfile/Plans'
import { Users } from 'modules/Users/UserProfile/Users'
import { UserDetailsViewModel } from '../../../src/Types/PlanfiApi/Models/ViewModels/UserDetailsViewModel'
import TabItemComponent from 'components/molecules/TabItemComponent/TabItemComponent'

const Container = styled.div`
  margin: auto;
  width: 74%;
  @media screen and (${breakPointSize.xs}) {
    width: 100%;
    width: calc(100% - 3.2rem);
    margin: 0 1.6rem;
  }
`

const ContainerCentred = styled.div`
  margin-top: 4.8rem;
  margin-bottom: 1.2rem;
`

export const User = (props: { location: { state: { id: string } } }) => {
  const [user, setUser] = useState<UserDetailsViewModel>()
  const [isLoading, setIsLoading] = useState(true)
  const userId: string = props.location.state.id

  useEffect(() => {
    getUserById()
  }, [])

  const getUserById = () => {
    userService
      .getUserById(userId)
      .then((data: UserDetailsViewModel) => {
        setUser(data)
        setIsLoading(false)
      })
      .catch((error) => {})
  }

  const renderTab = () => {
    if (active === 1) {
      return user && <Plans plans={user.userPlans} />
    }
    if (active === 2) {
      return user && <Users users={user.clientTrainers} />
    }
    return null
  }

  const [active, setActive] = useState(0)

  return (
    <>
      <MyProfileTemplate>
        <UserInfoBackground>
          <Loader isLoading={isLoading}>
            <Container>
              <Nav>
                <BackTopNav text={user && user.firstName} />
              </Nav>
              <ContainerCentred>
                {user && <UserInfo user={user} />}
              </ContainerCentred>
              <div className="tabs">
                {profileTabs.map(({ id, icon, titleTrainer, titleClient }) => (
                  <TabItemComponent
                    key={
                      user && user.roleName == 'Trainer'
                        ? titleTrainer
                        : titleClient
                    }
                    icon={icon}
                    title={
                      user && user.roleName == 'Trainer'
                        ? titleTrainer
                        : titleClient
                    }
                    onItemClicked={() => setActive(id)}
                    isActive={active === id}
                  />
                ))}
              </div>
              <div className="content">{renderTab()}</div>
            </Container>
          </Loader>
        </UserInfoBackground>
      </MyProfileTemplate>
    </>
  )
}

export default User
