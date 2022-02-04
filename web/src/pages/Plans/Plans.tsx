import { useState } from 'react'
import { Container } from '@mui/material'

import Header from './Header'
import CategoryGroup from './CategoryGroup'
import List from './List'
import Filter from './Filter'

const Plans: React.FC = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const handleFilterOpen = () => setIsFilterVisible(true)

  const handleFilterClose = () => setIsFilterVisible(false)

  return (
    <Container>
      <Header />
      <CategoryGroup onFilterClick={handleFilterOpen} />
      <List />
      <Filter isVisible={isFilterVisible} onClose={handleFilterClose} />
    </Container>
  )
}

export default Plans
