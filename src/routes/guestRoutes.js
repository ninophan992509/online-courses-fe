import React from "react";
import HomePage from "../components/guest/HomePage/homePage";
import { Route, withRouter } from "react-router-dom";
const routes = [
  {
    path: "/home",
    exact: true,
    component: <HomePage />,
  },
];

const GuestRoute = () => {
  let guestRoute = null;
  guestRoute = routes.map((route, index) => {
    return (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        render={() => route.component}
      />
    );
  });
  return guestRoute;
};
export default withRouter(GuestRoute);
