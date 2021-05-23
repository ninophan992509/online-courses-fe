import React from "react";
import HomePage from "../components/guest/HomePage/homePage";
import SearchPage from "../components/guest/SearchPage/searchPage";
import { Route, withRouter } from "react-router-dom";
import Course  from "../components/guest/Course/course";
const routes = [
  {
    path: "/home",
    exact: true,
    component: <HomePage />,
  },
  {
    path: "/courses/:id",
    exact: false,
    component: <SearchPage />,
  },
  {
    path: "/course/:id",
    exact: false,
    component: <Course />,
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
