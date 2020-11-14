import React, { useContext } from 'react';

export const ThemeContext = React.createContext();

export const useThemeContext = () => useContext(ThemeContext);
