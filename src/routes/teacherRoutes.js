import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import DashBoard from "../components/teacher/DashBoard/dashBoard";
import { authContext } from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoutes";
const routes = [
  {
    path: "/dashboard",
    exact: true,
    main: <DashBoard />,
  },
];

const TeacherRoute = () => {
  const { auth } = useContext(authContext);
  const { user } = auth;
  let teacherRoute = null;
  teacherRoute = routes.map((route, index) => {
    return (
      <PrivateRoute
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.main}
        user={user}
        role="teacher"
      />
    );
  });
  return teacherRoute;
};
export default withRouter(TeacherRoute);
