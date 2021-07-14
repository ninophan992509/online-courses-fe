import React, { useContext } from "react";
import HomePage from "../components/guest/HomePage";

import { authContext } from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoutes";
const routes = [
  {
    path: "/profile?ref=student",
    exact: true,
    main: () => <HomePage />,
  },
];

const StudentRoute = () => {
  const { auth } = useContext(authContext);
  const { user } = auth;
  let studentRoute = null;
  studentRoute = routes.map((route, index) => {
    return (
      <PrivateRoute
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.main}
        user={user}
        role="student"
      />
    );
  });
  return studentRoute;
};
export default StudentRoute;
