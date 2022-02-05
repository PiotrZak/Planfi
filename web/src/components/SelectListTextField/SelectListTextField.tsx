import { Box, TextField } from '@mui/material'
import { ChangeEvent } from 'react'

interface SelectListTextFieldProps {
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const SelectListTextField = ({
  label,
  value,
  onChange,
}: SelectListTextFieldProps) => (
  <Box mx={2.5}>
    <TextField
      fullWidth
      variant="standard"
      placeholder={label}
      value={value}
      onChange={onChange}
    />
  </Box>
)

export default SelectListTextField
