import {
  Box,
  Button,
  ButtonGroup,
  buttonGroupClasses,
  buttonClasses,
} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

interface ListFilterButtonProps {
  title: string
  label: string
  onFilterClick?: () => void
}

const ListFilterButton = ({
  title,
  label,
  onFilterClick = () => {},
}: ListFilterButtonProps) => (
  <Box mt={2}>
    <ButtonGroup
      aria-label={label}
      color="secondary"
      fullWidth
      sx={{
        [`.${buttonClasses.root}`]: {
          borderRadius: '8px',
          borderColor: 'rgba(17, 18, 20, 0.23) !important',
          color: 'text.primary',
        },
        [`.${buttonGroupClasses.grouped}:not(:last-of-type):hover`]: {
          borderRightColor: 'transparent !important',
        },
      }}
    >
      <Button
        sx={{
          fontWeight: 'bold',
          textTransform: 'none',
          letterSpacing: 0.5,
        }}
        size="large"
      >
        {title}
      </Button>
      <Button
        size="small"
        aria-label="select merge strategy"
        aria-haspopup="menu"
        sx={{ width: 'auto' }}
        onClick={onFilterClick}
      >
        <ArrowDropDownIcon />
      </Button>
    </ButtonGroup>
  </Box>
)

export default ListFilterButton
