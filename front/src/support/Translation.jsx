import React from 'react';
import { useSelector } from 'react-redux';
import { translate } from 'app/myshare/utilities';

export const translate = (translationKey) => {

    const currentLocale = useContext(LanguageContext)

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

		return translation ? translation : translationKey;
	}

	return translation;
};