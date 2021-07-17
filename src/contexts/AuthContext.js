import { useState, useEffect, createContext } from "react";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    loading: false,
    user: null,
    role: "student",
  });

  axios.defaults.withCredentials = true;

  useEffect(() => {
    setAuth({
      ...auth,
      loading: true,
    });

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    let userInfo = localStorage.getItem("userInfo");

    if (accessToken && refreshToken && userInfo) {
      userInfo = JSON.parse(userInfo);
      const decode = jwt_decode(accessToken);
      if (
        decode &&
        decode.userId === userInfo.id &&
        decode.type === userInfo.type
      ) {
        setAuth({
          ...auth,
          user: userInfo,
          role: decode.type,
        });
        return true;
      }
    }
    setAuth({
      ...auth,
      loading: false,
    });
  }, []);

  useEffect(() => {
    if (!auth.user) {
      <Redirect to={`/auth?ref=${auth.role}`} />;
    }
  }, [auth.role, auth.user]);

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
