import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContex = React.createContext({
  token: '',
  isLogged: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpiratipnTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpiratipnTime - currentTime;
  return remainingDuration;
};

const retrievStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContexProvider = (props) => {
  const tokenData = retrievStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
  }, []);

  if (logoutTimer) {
    clearTimeout(logoutTimer);
  }

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContex.Provider value={contextValue}>
      {props.children}
    </AuthContex.Provider>
  );
};

export default AuthContex;
