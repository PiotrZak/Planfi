import React, {useContext } from 'react';

export const userContext = React.createContext();

export const useUserContext = () => {
    return useContext(userContext);
  };