import { format, isDate, Locale } from 'date-fns'
import { enGB, pl } from 'date-fns/locale'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

const locales: Record<string, Locale> = {
  en: enGB,
  pl,
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
      format: (value, dateFormat = 'MM/dd/yyyy', lng = 'en') => {
        const locale = locales[lng]
        const date = isDate(value) ? value : new Date()

        return format(date, dateFormat, { locale })
      },
    },
  })

export default i18n

export { locales }
