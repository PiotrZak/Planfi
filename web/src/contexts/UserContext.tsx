import { createContext, useContext } from 'react'

export const UserContext = createContext(null as any);

export const useUserContext = () => useContext(UserContext)
