import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import jwtDecode from 'jwt-decode';

export const useDecodeToken = () => {
  const { user } = useContext(UserContext);
  let userData = {
    userId: '',
    isAdmin: false,
    email: '',
  };

  if (!user.token) {
    return { isAdmin: false };
  }

  try {
    userData = jwtDecode(user.token, process.env.REACT_APP_TOKEN_KEY);
  } catch (error) {
    console.error('Virhe tokenin purkamisessa', error.message);
  }

  return userData;
};
