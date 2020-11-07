import React, {useContext } from 'react';

export const ThemeContext = React.createContext();

export const useThemeContext = () => {
    return useContext(ThemeContext);
  };