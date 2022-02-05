import {
  ListItem as MuiListItem,
  ListItemText,
  IconButton,
} from '@mui/material'
import MoreVert from '@mui/icons-material/MoreVert'

interface ListProps {
  primaryContent: string
  secondaryContent: string
  onClick: () => void
}

const ListItem = ({ primaryContent, secondaryContent, onClick }: ListProps) => (
  <MuiListItem
    disableGutters
    divider
    sx={{ display: 'block', py: 1.5 }}
    secondaryAction={
      <IconButton onClick={onClick}>
        <MoreVert />
      </IconButton>
    }
  >
    <ListItemText
      primary={primaryContent}
      secondary={secondaryContent}
      primaryTypographyProps={{ fontWeight: 600, noWrap: true }}
      secondaryTypographyProps={{ noWrap: true }}
    />
  </MuiListItem>
)

export default ListItem
