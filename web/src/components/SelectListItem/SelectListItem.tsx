import { ListItemButton, ListItemText } from '@mui/material'

interface SelectListItemProps {
  name: string
}

const SelectListItem = ({ name }: SelectListItemProps) => (
  <ListItemButton disableGutters sx={{ px: 2.5, py: 0, my: 0.5 }}>
    <ListItemText primary={name} primaryTypographyProps={{ noWrap: true }} />
  </ListItemButton>
)

export default SelectListItem
