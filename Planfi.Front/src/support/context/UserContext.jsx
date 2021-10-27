import React, { useContext } from 'react';

export const userContext = React.createContext();

export const useUserContext = () => useContext(userContext);
