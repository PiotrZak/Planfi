import {
  Drawer,
  IconButton,
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import ArrowBack from '@mui/icons-material/ArrowBack'

interface FilterProps {
  isVisible: boolean
  onClose: () => void
}

interface Category {
  name: string
}

const categories: Category[] = [
  { name: 'Kategoria #1' },
  { name: 'Kategoria #2' },
  { name: 'Kategoria #3' },
  { name: 'Kategoria #4' },
  { name: 'Kategoria #5' },
]

const Filter = ({ isVisible, onClose }: FilterProps) => {
  return (
    <Drawer
      anchor="bottom"
      open={isVisible}
      variant="temporary"
      PaperProps={{ sx: { height: '100vh' } }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt={3}
        mx={2}
        mb={3}
      >
        <IconButton sx={{ padding: 0 }} onClick={onClose}>
          <ArrowBack />
        </IconButton>
        <Typography>Kategorie</Typography>
        <Button sx={{ padding: 0 }}>Filtruj</Button>
      </Box>
      <Box mx={2.5}>
        <TextField
          fullWidth
          variant="standard"
          placeholder="Szukaj kategorii"
        />
      </Box>
      <List>
        {categories.map(({ name }) => (
          <ListItemButton
            disableGutters
            sx={{ px: 2.5, py: 0, my: 0.5 }}
            key={name}
          >
            <ListItemText
              primary={name}
              primaryTypographyProps={{ noWrap: true }}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}

export default Filter
