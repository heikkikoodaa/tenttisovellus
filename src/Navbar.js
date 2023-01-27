import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import { useDecodeToken } from './hooks/useDecodeToken';

import SignOut from './SignOut';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Navbar = () => {
  const { user } = useContext(UserContext);
  const { isAdmin } = useDecodeToken();

  return (
    <>
      <AppBar
        position="static"
        style={{ backgroundColor: isAdmin ? '#F34213' : '#F9DC5C' }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className="nav-header" to="/">
              Tenttisovellus
            </Link>
          </Typography>
          {user.token && (
            <Link to="tentit" color="inherit">
              <Button color="inherit">Tentit</Button>
            </Link>
          )}
          {user.token && (
            <Link to="kayttaja/tentit" color="inherit">
              <Button color="inherit">Keskeneräiset tentit</Button>
            </Link>
          )}
          {user.token && isAdmin && (
            <Link to="admin/lisaatentti">
              <Button color="inherit">Uusi tentti</Button>
            </Link>
          )}
          {user.token && isAdmin && (
            <Link to="admin/poistatentti" color="inherit">
              <Button color="inherit">Poista tentteja</Button>
            </Link>
          )}
          {user.token ? (
            <SignOut />
          ) : (
            <Link to="login" color="inherit">
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Navbar;
