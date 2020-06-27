import React from 'react';

export interface User {
  id: string
  realID: number
  firstname: string
  lastname: string
}

export interface UserInContext {
  isAuthenticated: boolean
  user: User | null

  Consumer?: any
  Provider?: any
}

export default React.createContext<UserInContext>({
  isAuthenticated: false,
  user: null,
});

