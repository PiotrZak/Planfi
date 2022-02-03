import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Grid, Stack } from '@mui/material'
import React from 'react'

const HeaderExercise: React.FC = () => {
  return (
    <Grid item xs={12}>
      <Stack
        direction="row"
        justifyContent="space-between"
        style={{ marginTop: 40 }}
      >
        <div>
          <ArrowBackIcon />
        </div>
        <div>Dodaj ćwiczenie</div>
        <div></div>
      </Stack>
    </Grid>
  )
}

export default HeaderExercise
