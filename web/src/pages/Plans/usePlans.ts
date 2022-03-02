import { usePlansQuery } from 'generated/graphql'
import { useState } from 'react'

export const usePlans = (plansFilter: string, creatorsFilter: string) => {
  const { data, loading } = usePlansQuery()
  const [selectedPlansIds, setSelectedPlansIds] = useState<string[]>([])

  const getFilteredPlans = () => {
    if (!data?.plans) return []

    const filteredByTitle = data.plans.filter(({ title }) =>
      title.toLowerCase().includes(plansFilter.trim().toLowerCase())
    )

    if (selectedPlansIds.length === 0) {
      return filteredByTitle
    }

    return filteredByTitle.filter(({ creatorId }) =>
      selectedPlansIds.includes(creatorId)
    )
  }

  const handleAuthorClick = (creatorId: string) => {
    if (!data?.plans) return

    const selectedPlan = data.plans.find((plan) => plan.creatorId === creatorId)

    if (!selectedPlan?.creatorId) return

    if (selectedPlansIds.includes(selectedPlan.creatorId)) {
      const updatedPlans = selectedPlansIds.filter(
        (creatorId) => creatorId !== selectedPlan.creatorId
      )
      setSelectedPlansIds(updatedPlans)
    } else {
      setSelectedPlansIds([...selectedPlansIds, creatorId])
    }
  }

  return {
    loading,
    allPlans: data?.plans,
    selectedPlansIds,
    filteredPlans: getFilteredPlans(),
    handleAuthorClick,
  }
}
