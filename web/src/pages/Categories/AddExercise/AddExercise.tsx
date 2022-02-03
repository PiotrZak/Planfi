import { Container, Dialog, Grid } from '@mui/material'
import React from 'react'
import HeaderExercise from './HeaderExercise'

const AddExercise: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog fullScreen open={open}>
      <Container>
        <Grid container>
          <HeaderExercise />
        </Grid>
      </Container>
    </Dialog>
  )
}
export default AddExercise
