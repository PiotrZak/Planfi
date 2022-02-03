import { useTranslation } from 'react-i18next'
import i18n, { locales } from 'utils/i18n'

const useLang = () => {
  const {
    i18n: { language: lang },
  } = useTranslation()

  const langs = Object.keys(locales)

  const changeLang = (newLang: string) => {
    i18n.changeLanguage(newLang)
  }

  return { lang, langs, changeLang }
}

export default useLang
