import { useState } from 'react'
import testPlans, { Plan } from './testPlans'

interface PlansState extends Plan {
  isSelected: boolean
}

const getFilteredPlansByTitle = (plans: PlansState[], input: string) => {
  return plans.filter(({ title }) =>
    title.toLowerCase().includes(input.trim().toLowerCase())
  )
}

const initialPlans: PlansState[] = testPlans.map((plan) => ({
  ...plan,
  isSelected: false,
}))

const usePlans = (plansFilter: string, authorsFilter: string) => {
  const [allPlans, setPlans] = useState(initialPlans)

  const handleAuthorClick = (authorId: string) => {
    const author = allPlans.find(({ creatorId }) => creatorId === authorId)

    if (author) {
      const authorIndex = allPlans.indexOf(author)
      setPlans([
        ...allPlans.slice(0, authorIndex),
        { ...author, isSelected: !author.isSelected },
        ...allPlans.slice(authorIndex + 1),
      ])
    }
  }

  const getSelectedAuthors = () => {
    const selected = allPlans.filter(({ isSelected }) => isSelected)
    if (selected.length === 0) {
      return allPlans
    }

    return selected
  }

  const filteredPlans = getFilteredPlansByTitle(
    getSelectedAuthors(),
    plansFilter
  )

  const filteredPlansLength = (() => {
    const length = allPlans.reduce((acc, { isSelected }) => {
      return acc + +isSelected
    }, 0)
    if (length > 0) {
      return length
    }

    return allPlans.length
  })()

  return {
    allPlans,
    filteredPlans,
    filteredPlansLength,
    handleAuthorClick,
  }
}

export default usePlans
