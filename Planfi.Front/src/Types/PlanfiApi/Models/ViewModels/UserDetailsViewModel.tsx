// NOTE: Type generated automatically. Please DON'T edit this file manually!
import { ResultPlan } from './ResultPlan'
import { UserSqlProjection } from './UserSqlProjection'

export type UserDetailsViewModel = {
  userId: string
  avatar: number[]
  token: string
  firstName: string
  lastName: string
  roleName: string
  email: string
  phoneNumber: string
  organizationId: string
  userPlans: ResultPlan[]
  clientTrainers: UserSqlProjection[]
}
