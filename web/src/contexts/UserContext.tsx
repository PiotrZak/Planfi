import React, { useContext } from 'react'

export const UserContext = React.createContext({})

export const useUserContext = () => useContext(UserContext)
