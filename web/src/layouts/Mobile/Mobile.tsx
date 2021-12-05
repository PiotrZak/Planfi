import ArchiveIcon from '@mui/icons-material/Archive'
import FavoriteIcon from '@mui/icons-material/Favorite'
import RestoreIcon from '@mui/icons-material/Restore'
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Paper,
} from '@mui/material'
import { useState } from 'react'

const Mobile: React.FC = ({ children }) => {
  const [value, setValue] = useState(0)

  return (
    <Grid container>
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
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
        </BottomNavigation>
      </Paper>
    </Grid>
  )
}

export default Mobile
