import { Typography, Box, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const Header = () => (
  <header>
    <Box
      mb={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography variant="h5" component="h1">
        Plany
      </Typography>
      <Fab color="primary" size="small">
        <AddIcon />
      </Fab>
    </Box>
  </header>
)

export default Header
