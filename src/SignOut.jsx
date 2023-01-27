import { Button } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

const SignOut = () => {
  const { setUser, setIsAuth } = useContext(UserContext);
  const handleSignOut = () => {
    try {
      localStorage.removeItem('tenttisovellus_token');
      setUser({ token: null });
      setIsAuth(false);
    } catch (error) {
      console.error('Virhe uloskirjautuessa:', error);
    }
  };

  return (
    <Button style={{ color: 'black' }} onClick={handleSignOut}>
      Sign out
    </Button>
  );
};

export default SignOut;
