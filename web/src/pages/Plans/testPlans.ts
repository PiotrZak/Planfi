export interface Plan {
  planId: string
  creatorId: string
  creatorName: string
  title: string
  exercisesCount: number
}

const plans: Plan[] = [
  {
    creatorId: 'author-1',
    planId: 'plan-1',
    creatorName: 'author 1',
    title: 'plan 1',
    exercisesCount: 24,
  },
  {
    creatorId: 'author-2',
    planId: 'plan-2',
    creatorName: 'author 2',
    title: 'plan 2',
    exercisesCount: 31,
  },
  {
    creatorId: 'author-3',
    planId: 'plan-3',
    creatorName: 'author 3',
    title: 'plan 3',
    exercisesCount: 12,
  },
  {
    creatorId: 'author-4',
    planId: 'plan-4',
    creatorName: 'author 4',
    title: 'plan 4',
    exercisesCount: 78,
  },
  {
    creatorId: 'author-5',
    planId: 'plan-5',
    creatorName: 'author 5',
    title: 'plan 5',
    exercisesCount: 78,
  },
  {
    creatorId: 'author-6',
    planId: 'plan-6',
    creatorName: 'author 6',
    title: 'plan 6',
    exercisesCount: 34,
  },
  {
    creatorId: 'author-7',
    planId: 'plan-7',
    creatorName: 'author 7',
    title: 'plan 7',
    exercisesCount: 40,
  },
]

export default plans
