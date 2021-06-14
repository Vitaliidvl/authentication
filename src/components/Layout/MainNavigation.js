import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContex from '../../store/auth-contex';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authContext = useContext(AuthContex);

  const isLoggedIn = authContext.isLoggedIn;
  const logoutHandler = () => {
    authContext.logout();
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
