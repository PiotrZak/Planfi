import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle'
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Paper,
} from '@mui/material'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const Mobile: React.FC = ({ children }) => {
  const [value, setValue] = useState(0)

  return (
    <Grid container style={{ marginTop: 32 }}>
      {children}

      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
        >
          <BottomNavigationAction
            icon={<FitnessCenterIcon />}
            to="/"
            component={RouterLink}
          />
          <BottomNavigationAction
            icon={<DashboardCustomizeIcon />}
            component={RouterLink}
            to="/categories"
          />
          <BottomNavigationAction
            icon={<PersonPinCircleIcon />}
            to="/"
            component={RouterLink}
          />
          <BottomNavigationAction
            icon={<PeopleAltIcon />}
            to="/"
            component={RouterLink}
          />
          <BottomNavigationAction
            icon={<AccountCircleIcon />}
            to="/"
            component={RouterLink}
          />
        </BottomNavigation>
      </Paper>
    </Grid>
  )
}

export default Mobile
