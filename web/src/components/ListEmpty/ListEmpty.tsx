import { ListItem, Typography, Button, List } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

interface ListEmptyProps {
  title: string
  actionTitle: string
  onActionClick: () => void
}

const ListEmpty = ({ title, actionTitle, onActionClick }: ListEmptyProps) => (
  <List>
    <ListItem sx={{ display: 'block', textAlign: 'center' }}>
      <Typography variant="h5" component="h1">
        {title}
      </Typography>
      <Button
        variant="contained"
        sx={{ py: 1.5, px: 2, mt: 2 }}
        onClick={onActionClick}
      >
        <AddIcon sx={{ mr: 1, px: 0 }} />
        <Typography variant="body2" sx={{ mr: 1, textTransform: 'none' }}>
          {actionTitle}
        </Typography>
      </Button>
    </ListItem>
  </List>
)

export default ListEmpty
