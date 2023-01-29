import { createContext, useState } from 'react';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    token: localStorage.getItem('tenttisovellus_token'),
  });
  const [isAuth, setIsAuth] = useState(user.token ? true : false);

  const value = {
    user,
    setUser,
    isAuth,
    setIsAuth,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
