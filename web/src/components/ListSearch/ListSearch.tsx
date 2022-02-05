import { TextField } from '@mui/material'

interface ListSearch {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ListSearch = ({ label, value, onChange }: ListSearch) => (
  <TextField
    id={label.split(' ').join('-')}
    label={label}
    value={value}
    variant="outlined"
    size="small"
    fullWidth
    onChange={onChange}
  />
)

export default ListSearch
