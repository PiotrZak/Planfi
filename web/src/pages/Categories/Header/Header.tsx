import AddIcon from '@mui/icons-material/Add'
import { Fab, FormControl, Grid, TextField } from '@mui/material'
import React from 'react'

const Header: React.FC = () => {
  return (
    <Grid container alignItems="center" spacing={{ xs: 3 }}>
      <Grid item xs={8}>
        <div style={{ fontWeight: 'bold', fontSize: '24px' }}>Exercises</div>
      </Grid>
      <Grid item xs={4} style={{ textAlign: 'right' }}>
        <Fab size="small" color="primary" aria-label="add">
          <AddIcon style={{ color: 'white' }} />
        </Fab>
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{ width: '100%' }}>
          <TextField label="Search" variant="outlined" size="small" />
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default Header
