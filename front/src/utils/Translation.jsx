import React, { useContext } from 'react';
import { pl as polish } from 'lang/pl';
import { en as english } from 'lang/en';
import { useLangContext } from '../support/context/LanguageContext';


const Locales = {
  English: 'en-GB',
  Polish: 'pl-PL',
  Nowergian: 'nb-NO',
};

const FALLBACK_TRANSLATION_LANGUAGE = 'en-GB';

export const translate = (translationKey) => {

  const currentLocale = localStorage.getItem('language');

  const supportedLocales = {
    [Locales.Polish]: polish,
    [Locales.English]: english,
  };

  let translations = Object(supportedLocales)[currentLocale];

  if (!translations) {
    translations = Object(supportedLocales)[FALLBACK_TRANSLATION_LANGUAGE];
  }

  let translation = Object(translations)[translationKey];

  if (!translation) {
    translations = Object(supportedLocales)[FALLBACK_TRANSLATION_LANGUAGE];
    translation = Object(translations)[translationKey];

    return translation || translationKey;
  }

  return translation;
};
