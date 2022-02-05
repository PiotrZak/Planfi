import { TextField } from '@mui/material'

interface ListSearch {
  label: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ListSearch = ({ label, onChange }: ListSearch) => (
  <TextField
    id={label.split(' ').join('-')}
    label={label}
    variant="outlined"
    size="small"
    fullWidth
    onChange={onChange}
  />
)

export default ListSearch
