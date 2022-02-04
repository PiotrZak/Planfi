import {
  Box,
  Button,
  ButtonGroup,
  buttonGroupClasses,
  buttonClasses,
} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

interface CategoryGroup {
  onFilterClick: () => void
}

const CategoryGroup = ({ onFilterClick }: CategoryGroup) => (
  <Box mt={2}>
    <ButtonGroup
      aria-label="Szukaj kategorii"
      color="secondary"
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
      fullWidth
    >
      <Button
        sx={{
          fontWeight: 'bold',
          textTransform: 'none',
          letterSpacing: 0.5,
        }}
        size="large"
      >
        Kategoria
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

export default CategoryGroup
