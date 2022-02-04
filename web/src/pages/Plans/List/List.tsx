import {
  List as MuiList,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material'
import MoreVert from '@mui/icons-material/MoreVert'

const List = () => (
  <MuiList>
    {Array(15)
      .fill({
        name: 'Nazwa ćwiczenia',
        category: 'Kategoria',
      })
      .map(({ name, category }, i) => (
        <ListItem
          disableGutters
          divider
          sx={{ display: 'block', py: 1.5 }}
          key={i}
          secondaryAction={
            <IconButton>
              <MoreVert />
            </IconButton>
          }
        >
          <ListItemText
            primary={name}
            secondary={category}
            primaryTypographyProps={{ fontWeight: 600, noWrap: true }}
            secondaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
      ))}
  </MuiList>
)

export default List
