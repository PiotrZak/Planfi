import { ReactNode } from 'react'
import {
  Drawer,
  IconButton,
  Box,
  Typography,
  Button,
  List,
} from '@mui/material'
import ArrowBack from '@mui/icons-material/ArrowBack'

interface SelectListProps {
  isVisible: boolean
  onClose: () => void
  title: string
  children: ReactNode
  TextFieldComponent: JSX.Element
}

const SelectList = ({
  children,
  isVisible,
  title,
  TextFieldComponent,
  onClose,
}: SelectListProps) => (
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
      <Typography>{title}</Typography>
      <Button sx={{ padding: 0 }}>Filtruj</Button>
    </Box>
    {TextFieldComponent}
    <List>{children}</List>
  </Drawer>
)

export default SelectList
