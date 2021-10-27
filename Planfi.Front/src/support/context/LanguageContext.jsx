import React, {useContext } from 'react';

export const LanguageContext = React.createContext();

export const useLangContext = () => useContext(LanguageContext);