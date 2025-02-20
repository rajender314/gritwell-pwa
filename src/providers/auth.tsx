import React, {useState} from 'react';
import {getLocalStorage} from '../core/localStorageService';

type AuthContextType = {
    userInfo: any;
    setUserInfo?: any;
};

type Props = {
    children:any;
};

export const AuthContext = React.createContext<AuthContextType>({
  userInfo: null,
});

/**
 * Renders Component.
 * @param {Props} from the componnet.
 * @return {AuthProvider} The global Component.
 */
export function AuthProvider({children}: Props) {
  let user = getLocalStorage('userData');
  user = user ? JSON.parse(user) : null;
  const [userInfo, setUserInfo] = useState(user);
  const value = {userInfo, setUserInfo};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
