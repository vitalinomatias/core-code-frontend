import React from 'react';

const AuthContext = React.createContext({
  currentUser: {},
  register: (first_name, email, password) => {},
  login: (email, password) => {},
  logout: () => {},
});
export default AuthContext;
