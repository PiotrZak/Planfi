import { Container, Grid } from '@mui/material'
import React from 'react'
import Exercises from './Exercises'
import Header from './Header'
import { ListButton } from './ListButton'

const Categories: React.FC = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <ListButton />
        </Grid>

        <Exercises />
      </Grid>
    </Container>
  )
}

export default Categories
