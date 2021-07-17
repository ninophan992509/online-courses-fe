import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import Profile from "../components/student/Profile/profile";

import { authContext } from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoutes";
const routes = [
  {
    path: "/profile",
    exact: true,
    main:  <Profile />,
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
export default withRouter(StudentRoute);
