import AddIcon from '@mui/icons-material/Add'
import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

interface Props {
  text: string
}

const EmptyExercisesMobile: React.FC<Props> = ({ text }) => {
  return (
    <Box
      sx={{
        mx: 'auto',
        textAlign: 'center',
      }}
    >
      <Typography variant="h5">Nie masz jeszcze zadnych ćwiczeń!</Typography>
      <Button
        variant="contained"
        size="large"
        style={{ marginTop: '10px', padding: '12px' }}
      >
        <AddIcon style={{ marginRight: '10px' }} /> Dodaj ćwiczenie
      </Button>
    </Box>
  )
}

export default EmptyExercisesMobile
