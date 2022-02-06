import { ListItemButton, ListItemText } from '@mui/material'

interface SelectListItemProps {
  name: string
  isSelected: boolean
  onClick: () => void
}

const SelectListItem = ({ name, isSelected, onClick }: SelectListItemProps) => (
  <ListItemButton
    disableGutters
    sx={{ px: 2.5, py: 0, my: 0.5 }}
    onClick={onClick}
    selected={isSelected}
  >
    <ListItemText primary={name} primaryTypographyProps={{ noWrap: true }} />
  </ListItemButton>
)

export default SelectListItem
