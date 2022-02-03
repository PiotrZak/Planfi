import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { CategoryViewModel } from 'generated/graphql'
import React from 'react'

interface Props {
  categories: CategoryViewModel[]
  selectedCategories: string[]
  setCategories: (value: any) => void
}

const ListButton: React.FC<Props> = ({
  categories,
  selectedCategories,
  setCategories,
}) => {
  const handleChange = (
    event: SelectChangeEvent<typeof selectedCategories>
  ) => {
    const {
      target: { value },
    } = event
    setCategories(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <React.Fragment>
      <FormControl fullWidth variant="outlined">
        <InputLabel>Kategoria</InputLabel>
        <Select
          value={selectedCategories}
          multiple
          input={<OutlinedInput label="Kategoria" />}
          onChange={handleChange}
        >
          {categories?.map(({ categoryId, title }) => {
            return (
              <MenuItem key={categoryId} value={title}>
                {title}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </React.Fragment>
  )
}

export default ListButton
