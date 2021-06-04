import { useState, useEffect, createContext } from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";
export const authContext = createContext({});

const _user = {
  id: 1,
  name: "Ngan Phan",
  gmail: "ptkngan7@gmail.com",
  role: "student",
};

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    loading: true,
    user: null,
    role: "student",
    accessToken: null,
    refreshToken: null,
    cart: null,
  });

  axios.defaults.withCredentials = true;

  /*
    useEffect(() => {
       setAuth({
         loading: true,
       });

       axios.get(``).then((res) => {
         
       });
    }, []);
    */


    useEffect(() => {
      if (!auth.user) {
        <Redirect to={`/auth?ref=${auth.role}`}/>;
      }
    }, [auth.user]);

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
