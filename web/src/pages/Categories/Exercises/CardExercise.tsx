import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Grid, Menu, MenuItem } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import * as React from 'react'
const options = ['EDIT', 'REMOVE']

const ITEM_HEIGHT = 25

interface Props {
  name: string
}

const CardExercise: React.FC<Props> = ({ name }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader
          action={
            <>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem
                    key={option}
                    selected={option === 'Pyxis'}
                    onClick={handleClose}
                    style={{ fontSize: '14px' }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </>
          }
          title={name}
          subheader="Kategoria"
          titleTypographyProps={{
            fontSize: 16,
          }}
          subheaderTypographyProps={{ fontSize: 14 }}
        />
      </Card>
    </Grid>
  )
}

export default CardExercise
