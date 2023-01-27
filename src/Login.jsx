import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import './index.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { UserContext } from './context/UserContext';

const Login = () => {
  const { isAuth } = useContext(UserContext);

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-signup-container">
      <LoginForm />
      <RegisterForm />
    </div>
  );
};

export default Login;
