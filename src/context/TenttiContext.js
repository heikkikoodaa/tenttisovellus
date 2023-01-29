import { createContext, useReducer } from 'react';
import tenttiReducer from '../tenttiReducer';

export const TenttiContext = createContext({});

export const TenttiContextProvider = ({ children }) => {
  const [tentti, dispatch] = useReducer(tenttiReducer, {
    tenttilista: [],
    haettuTentti: {},
  });

  const value = {
    tentti,
    dispatch,
  };

  return (
    <TenttiContext.Provider value={value}>{children}</TenttiContext.Provider>
  );
};
