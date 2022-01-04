import { FormControl, Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import * as React from 'react'

export default function ListButton() {
  const [age, setAge] = React.useState(1)

  const handleChange = (event: any) => {
    setAge(event.target.value)
  }

  return (
    <React.Fragment>
      <FormControl fullWidth variant="outlined">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={1}>Category</MenuItem>
          <MenuItem value={2}>Category 2</MenuItem>
          <MenuItem value={3}>Category 3</MenuItem>
        </Select>
      </FormControl>
    </React.Fragment>
  )
}
