import { MenuItem, Select } from '@mui/material'
import useLang from 'hooks/useLang'
import React from 'react'

const LanguageSelect = () => {
  const { lang, changeLang, langs } = useLang()

  React.useEffect(() => {
    if (!langs.includes(lang)) changeLang('en')
  }, [lang, langs, changeLang])

  return (
    <Select
      label="Language"
      value={lang}
      onChange={(lang) => changeLang(lang.target.value)}
    >
      {langs.map((lang) => (
        <MenuItem key={lang} value={lang}>
          {lang}
        </MenuItem>
      ))}
    </Select>
  )
}

export default LanguageSelect
