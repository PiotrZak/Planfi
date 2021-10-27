import React, { useContext } from 'react';

export const ScrollContext = React.createContext();

export const useScrollContext = () => useContext(ScrollContext);
