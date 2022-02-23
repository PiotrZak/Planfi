import { useState } from 'react'
import {
  Drawer,
  List,
  ListItemButton,
  Box,
  Typography,
  Button,
} from '@mui/material'
import { PlansQuery } from 'generated/graphql'

interface ActionDrawerProps {
  isVisible?: boolean
  plan?: PlansQuery['plans'][number]
  onClose: () => void
}

const ActionDrawer = ({ isVisible, plan, onClose }: ActionDrawerProps) => {
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <Drawer open={isVisible} anchor="bottom" onBackdropClick={onClose}>
      <List>
        {confirmDelete ? (
          <Box px={2} py={2}>
            <Typography variant="h6" component="p">
              Czy na pewno chcesz usunąć plan?
            </Typography>
            <Typography variant="body2" sx={{ pt: 1 }}>
              Jesteś w trakcie usuwania, tej czynności nie można już potem
              cofnąć.
            </Typography>
            <Box textAlign="center" pt={2}>
              <Button variant="contained" fullWidth>
                Usuń
              </Button>
              <Button sx={{ mt: 2 }} onClick={() => setConfirmDelete(false)}>
                Anuluj usuwanie
              </Button>
            </Box>
          </Box>
        ) : (
          <Box py={2}>
            <ListItemButton onClick={() => console.log('edit')}>
              Edytuj
            </ListItemButton>
            <ListItemButton onClick={() => console.log('add exercise')}>
              Dodaj ćwiczenie
            </ListItemButton>
            <ListItemButton onClick={() => setConfirmDelete(true)}>
              Usuń plan
            </ListItemButton>
          </Box>
        )}
      </List>
    </Drawer>
  )
}

export default ActionDrawer
