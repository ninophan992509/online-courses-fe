import React from "react";
import HomePage from "../components/guest/HomePage";
import { Route } from "react-router-dom";
const routes = [
  {
    path: "/profile?ref=student",
    exact: true,
    main: () => <HomePage />,
  },
];

const StudentRoute = () => {
  let guestRoute = null;
  guestRoute = routes.map((route, index) => {
    return (
      <Route path={route.path} exact={route.exact} component={route.main} />
    );
  });
  return guestRoute;
};
export default StudentRoute;
